document.getElementById("askBtn").addEventListener("click", async () => {
  const resultElement = document.getElementById("result");
  const spinner = document.getElementById("spinner");

  // First, get the saved API keys, language, provider, and models
  chrome.storage.local.get(["geminiApiKey", "openaiApiKey", "groqApiKey", "geminiModel", "openaiModel", "groqModel", "language", "provider"], async (result) => {
    const language = result.language || "English";
    const provider = result.provider || "gemini";
    
    let apiKey = result.geminiApiKey;
    let modelId = result.geminiModel;
    if (provider === "openai") {
      apiKey = result.openaiApiKey;
      modelId = result.openaiModel;
    } else if (provider === "groq") {
      apiKey = result.groqApiKey;
      modelId = result.groqModel;
    }
    
    // If there is no key for this provider, show a warning
    if (!apiKey) {
      resultElement.style.display = "block";
      resultElement.innerText = `Please save your ${provider} API key from the 'Settings' link below first!`;
      return;
    }

    // 1. Find the active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 2. Inject and execute a function to get the selected text from the page
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getSelectedText,
    }, async (results) => {
      const selectedText = results[0]?.result;
      
      if (selectedText) {
        resultElement.style.display = "block";
        resultElement.innerText = "";
        spinner.style.display = "block"; // Show loading animation
        
        try {
          // 4. Send the text to AI and get the response
          const result = await askAI(selectedText, apiKey, language, provider, modelId);
          spinner.style.display = "none"; // Hide loading animation
          
          resultElement.innerText = result.text;
          const modelBadge = document.createElement("div");
          modelBadge.style.cssText = "text-align: right; font-size: 10px; color: #999; margin-top: 8px; font-style: italic;";
          modelBadge.innerText = `— ${result.model}`;
          resultElement.appendChild(modelBadge);
        } catch (error) {
          spinner.style.display = "none";
          resultElement.innerText = "An error occurred: " + error.message;
        }
      } else {
        resultElement.style.display = "block";
        resultElement.innerText = "You must select some text on the page first!";
      }
    });
  });
});

// Open the options page when the settings link is clicked
document.getElementById("optionsLink").addEventListener("click", () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

// This function runs directly inside the user's active page
function getSelectedText() {
  return window.getSelection().toString().trim();
}

// Function to make a request to the AI API
async function askAI(text, apiKey, language, provider, modelId) {
  const prompt = `You are an assistant that provides short and concise answers. The user selected the following text: "${text}". Explain what this selected text means, what it is, or who they are in a maximum of 2-3 sentences, using plain language. Please provide the response in ${language}.`;
  
  if (provider === "openai" || provider === "groq") {
    const url = provider === "openai" 
      ? "https://api.openai.com/v1/chat/completions" 
      : "https://api.groq.com/openai/v1/chat/completions";
    const model = modelId || (provider === "openai" ? "gpt-3.5-turbo" : "llama3-8b-8192");
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: prompt }]
      })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "API request failed.");
    return { text: data.choices[0].message.content, model: model };
    
  } else {
    // Default to Gemini
    const activeModel = modelId || "gemini-3.1-flash-lite";
    const modelPath = activeModel.startsWith("models/") ? activeModel : `models/${activeModel}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "API request failed.");
    return { text: data.candidates[0].content.parts[0].text, model: activeModel.replace("models/", "") };
  }
}
