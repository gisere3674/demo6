chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.runtime.openOptionsPage();
  }
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "askGeminiContext",
      title: "What IS THAT?",
      contexts: ["selection"]
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "askGeminiContext" && info.selectionText) {
    processAIRequest(info.selectionText, tab);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ask_gemini_quick" && request.text && sender.tab) {
    processAIRequest(request.text, sender.tab);
  } else if (request.action === "open_options") {
    chrome.runtime.openOptionsPage();
  }
});

async function processAIRequest(text, tab) {
  // Open a loading window in the bottom right corner
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showFloatingLoading,
    args: [chrome.runtime.getURL("kurukuru.gif")]
  });
  
  // Get the API Keys, language, provider, and models
  chrome.storage.local.get([
      "geminiApiKey", "openaiApiKey", "anthropicApiKey", "groqApiKey", "mistralApiKey", "deepseekApiKey", "togetherApiKey", "openrouterApiKey", "perplexityApiKey", "cohereApiKey", "xaiApiKey", "huggingfaceApiKey", "ollamaApiKey", "ai21ApiKey", "anyscaleApiKey", "deepinfraApiKey", "fireworksApiKey", "novitaApiKey", "sambanovaApiKey", "upstageApiKey", "alibabaApiKey", "cerebrasApiKey", "hyperbolicApiKey", "moonshotApiKey", "nvidiaApiKey", "octoaiApiKey",
      "geminiModel", "openaiModel", "anthropicModel", "groqModel", "mistralModel", "deepseekModel", "togetherModel", "openrouterModel", "perplexityModel", "cohereModel", "xaiModel", "huggingfaceModel", "ollamaModel", "ai21Model", "anyscaleModel", "deepinfraModel", "fireworksModel", "novitaModel", "sambanovaModel", "upstageModel", "alibabaModel", "cerebrasModel", "hyperbolicModel", "moonshotModel", "nvidiaModel", "octoaiModel",
      "language", "provider"
    ], async (result) => {
      const language = result.language || "English";
      const provider = result.provider || "gemini";
      
      let apiKey = result[`${provider}ApiKey`];
      let modelId = result[`${provider}Model`];
      
      if (!modelId) {
        const defaultModels = {
          gemini: "gemini-1.5-flash",
          openai: "gpt-4o",
          anthropic: "claude-3-5-sonnet-20241022",
          groq: "llama3-8b-8192",
          mistral: "mistral-large-latest",
          deepseek: "deepseek-chat",
          together: "meta-llama/Llama-3-8b-chat-hf",
          openrouter: "anthropic/claude-3.5-sonnet",
          perplexity: "llama-3.1-sonar-large-128k-chat",
          cohere: "command-r-plus",
          xai: "grok-beta",
          huggingface: "meta-llama/Meta-Llama-3-8B-Instruct",
          ollama: "llama3",
          ai21: "jamba-1.5-large",
          anyscale: "meta-llama/Meta-Llama-3-8B-Instruct",
          deepinfra: "meta-llama/Meta-Llama-3-70B-Instruct",
          fireworks: "accounts/fireworks/models/llama-v3-70b-instruct",
          novita: "meta-llama/llama-3-8b-instruct",
          sambanova: "Meta-Llama-3-8B-Instruct",
          upstage: "solar-1-mini-chat",
          alibaba: "qwen-max",
          cerebras: "llama3.1-8b",
          hyperbolic: "meta-llama/Meta-Llama-3.1-70B-Instruct",
          moonshot: "moonshot-v1-8k",
          nvidia: "meta/llama3-70b-instruct",
          octoai: "meta-llama-3-8b-instruct"
        };
        modelId = defaultModels[provider];
      }
      
      if (!apiKey && provider !== "ollama") {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: showFloatingResult,
          args: [`Please enter your ${provider} API Key from the Extension Settings first!`]
        });
        return;
      }
    
    try {
      const result = await askAIBg(text, apiKey, language, provider, modelId);
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: showFloatingResult,
        args: [result.text, result.model]
      });
    } catch (error) {
       chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: showFloatingResult,
        args: ["Error: " + error.message]
      });
    }
  });
}

async function askAIBg(text, apiKey, language, provider, modelId) {
  const prompt = `You are an assistant that provides short and concise answers. The user selected the following text: "${text}". Explain what this selected text means, what it is, or who they are in a maximum of 2-3 sentences, using plain language. Please provide the response in ${language}.`;
  
  let responseText = "";

  if (provider === "gemini") {
    const cleanModelId = modelId.replace("models/", "");
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModelId}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "API Error");
    responseText = data.candidates[0].content.parts[0].text;
    
  } else if (provider === "anthropic") {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerously-allow-browser": "true"
      },
      body: JSON.stringify({
        model: modelId,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Anthropic API Error");
    responseText = data.content[0].text;
    
  } else if (provider === "cohere") {
    const res = await fetch("https://api.cohere.com/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelId || "command-r-plus",
        message: prompt
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Cohere API Error");
    responseText = data.text;
    
  } else if (provider === "openai" || provider === "groq" || provider === "mistral" || provider === "deepseek" || provider === "together" || provider === "openrouter" || provider === "perplexity" || provider === "xai" || provider === "huggingface" || provider === "ai21" || provider === "anyscale" || provider === "deepinfra" || provider === "fireworks" || provider === "novita" || provider === "sambanova" || provider === "upstage" || provider === "alibaba" || provider === "cerebras" || provider === "hyperbolic" || provider === "moonshot" || provider === "nvidia" || provider === "octoai" || provider === "ollama") {
    
    let url = "";
    if (provider === "openai") url = "https://api.openai.com/v1/chat/completions";
    else if (provider === "groq") url = "https://api.groq.com/openai/v1/chat/completions";
    else if (provider === "mistral") url = "https://api.mistral.ai/v1/chat/completions";
    else if (provider === "deepseek") url = "https://api.deepseek.com/chat/completions";
    else if (provider === "together") url = "https://api.together.xyz/v1/chat/completions";
    else if (provider === "openrouter") url = "https://openrouter.ai/api/v1/chat/completions";
    else if (provider === "perplexity") url = "https://api.perplexity.ai/chat/completions";
    else if (provider === "xai") url = "https://api.x.ai/v1/chat/completions";
    else if (provider === "huggingface") url = "https://api-inference.huggingface.co/v1/chat/completions";
    else if (provider === "ai21") url = "https://api.ai21.com/studio/v1/chat/completions";
    else if (provider === "anyscale") url = "https://api.endpoints.anyscale.com/v1/chat/completions";
    else if (provider === "deepinfra") url = "https://api.deepinfra.com/v1/chat/completions";
    else if (provider === "fireworks") url = "https://api.fireworks.ai/inference/v1/chat/completions";
    else if (provider === "novita") url = "https://api.novita.ai/v3/chat/completions";
    else if (provider === "sambanova") url = "https://api.sambanova.ai/v1/chat/completions";
    else if (provider === "upstage") url = "https://api.upstage.ai/v1/chat/completions";
    else if (provider === "alibaba") url = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";
    else if (provider === "cerebras") url = "https://api.cerebras.ai/v1/chat/completions";
    else if (provider === "hyperbolic") url = "https://api.hyperbolic.xyz/v1/chat/completions";
    else if (provider === "moonshot") url = "https://api.moonshot.cn/v1/chat/completions";
    else if (provider === "nvidia") url = "https://integrate.api.nvidia.com/v1/chat/completions";
    else if (provider === "octoai") url = "https://text.octoai.run/v1/chat/completions";
    else if (provider === "ollama") url = "http://localhost:11434/api/chat";

    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    };
    
    if (provider === "ollama") {
      delete headers["Authorization"];
    }
    
    let payload = {
      model: modelId,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    };
    
    if (provider === "ollama") payload.stream = false;

    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || `${provider} API Error`);
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error(data.message || data.detail || "No response generated (possibly blocked by safety filters or rate limits).");
    }
    
    responseText = data.choices[0].message?.content || "";
  }
  
  return { text: responseText, model: modelId };
}

// ---- These functions will be injected into the active page ----
function showFloatingLoading(imgUrl) {
  let container = document.getElementById("gemini-float-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "gemini-float-container";
    container.style.cssText = "position:fixed; bottom:20px; right:20px; width:320px; z-index:999999; display:flex; flex-direction:column; gap:10px; align-items:flex-end;";
    document.body.appendChild(container);
  }

  // Remove any unpinned results
  const unpinned = container.querySelectorAll(".gemini-result-card:not(.pinned)");
  unpinned.forEach(el => el.remove());

  // Create loading card
  let loadingCard = document.createElement("div");
  loadingCard.id = "gemini-loading-card";
  loadingCard.className = "gemini-result-card";
  loadingCard.style.cssText = "width:300px; padding:15px; background:white; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.15); display:flex; justify-content:center; align-items:center; min-height:50px;";
  loadingCard.innerHTML = `<img src="${imgUrl}" style="height:64px; width:auto; border-radius:4px;" />`;
  
  // Add on top
  container.prepend(loadingCard);
}

function showFloatingResult(text) {
  let container = document.getElementById("gemini-float-container");
  if (!container) return;
  
  // Remove loading card
  let loadingCard = document.getElementById("gemini-loading-card");
  if (loadingCard) loadingCard.remove();
  
  let card = document.createElement("div");
  card.className = "gemini-result-card";
  card.style.cssText = "width:300px; padding:15px; background:white; color:#333; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.15); font-family:Arial,sans-serif; font-size:14px; line-height:1.5; position:relative;";
  
  let isPinned = false;
  
  const pinBtn = document.createElement("span");
  pinBtn.innerText = "📌";
  pinBtn.style.cssText = "position:absolute; top:10px; right:10px; cursor:pointer; font-size:16px; opacity: 0.5; transition: all 0.2s; user-select: none;";
  pinBtn.title = "Pin this window";
  pinBtn.onclick = (e) => {
    isPinned = !isPinned;
    if (isPinned) {
      card.classList.add("pinned");
      pinBtn.style.opacity = "1";
      pinBtn.style.transform = "rotate(-45deg)";
    } else {
      card.classList.remove("pinned");
      pinBtn.style.opacity = "0.5";
      pinBtn.style.transform = "rotate(0deg)";
    }
    e.stopPropagation();
  };
  
  let content = document.createElement("p");
  content.style.margin = "0";
  content.style.paddingRight = "20px";
  content.style.paddingBottom = "20px";
  content.innerText = text;
  
  card.appendChild(pinBtn);
  card.appendChild(content);
  
  if (arguments[1]) {
    let modelLabel = document.createElement("div");
    modelLabel.style.cssText = "position: absolute; bottom: 10px; right: 15px; font-size: 10px; color: #999; font-style: italic;";
    modelLabel.innerText = `— ${arguments[1]}`;
    card.appendChild(modelLabel);
  }
  
  container.prepend(card);
  
  if (!container._closeListener) {
    container._closeListener = (e) => {
      if (!container.contains(e.target)) {
        const unpinned = container.querySelectorAll(".gemini-result-card:not(.pinned)");
        unpinned.forEach(el => el.remove());
        if (container.children.length === 0) {
          document.removeEventListener("click", container._closeListener);
          container._closeListener = null;
          container.remove();
        }
      }
    };
    setTimeout(() => {
      document.addEventListener("click", container._closeListener);
    }, 100);
  }
}
