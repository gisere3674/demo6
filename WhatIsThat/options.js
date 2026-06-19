let savedKeys = { gemini: "", openai: "", anthropic: "", groq: "", mistral: "", deepseek: "", together: "", openrouter: "", perplexity: "", cohere: "", xai: "", huggingface: "", ollama: "", ai21: "", anyscale: "", deepinfra: "", fireworks: "", novita: "", sambanova: "", upstage: "", alibaba: "", cerebras: "", hyperbolic: "", moonshot: "", nvidia: "", octoai: "" };
let savedModels = { gemini: "", openai: "", anthropic: "", groq: "", mistral: "", deepseek: "", together: "", openrouter: "", perplexity: "", cohere: "", xai: "", huggingface: "", ollama: "", ai21: "", anyscale: "", deepinfra: "", fireworks: "", novita: "", sambanova: "", upstage: "", alibaba: "", cerebras: "", hyperbolic: "", moonshot: "", nvidia: "", octoai: "" };

// Function to update placeholder and label based on provider
function updateProviderUI() {
  const provider = document.getElementById("provider").value;
  const label = document.getElementById("apiKeyLabel");
  const input = document.getElementById("apiKey");
  const helpBtn = document.getElementById("apiKeyHelpBtn");
  
  let providerName = "Gemini";
  if (provider === "openai") {
    label.innerText = "OpenAI API Key:";
    input.placeholder = "Starts with sk-...";
    providerName = "OpenAI";
  } else if (provider === "anthropic") {
    label.innerText = "Anthropic API Key:";
    input.placeholder = "Starts with sk-ant-...";
    providerName = "Anthropic";
  } else if (provider === "groq") {
    label.innerText = "Groq API Key:";
    input.placeholder = "Starts with gsk_...";
    providerName = "Groq";
  } else if (provider === "mistral") {
    label.innerText = "Mistral API Key:";
    input.placeholder = "Your Mistral API Key...";
    providerName = "Mistral";
  } else if (provider === "deepseek") {
    label.innerText = "DeepSeek API Key:";
    input.placeholder = "Starts with sk-...";
    providerName = "DeepSeek";
  } else if (provider === "together") {
    label.innerText = "Together AI API Key:";
    input.placeholder = "Your Together API Key...";
    providerName = "Together";
  } else if (provider === "openrouter") {
    label.innerText = "OpenRouter API Key:";
    input.placeholder = "Starts with sk-or-...";
    providerName = "OpenRouter";
  } else if (provider === "perplexity") {
    label.innerText = "Perplexity API Key:";
    input.placeholder = "Starts with pplx-...";
    providerName = "Perplexity";
  } else if (provider === "cohere") {
    label.innerText = "Cohere API Key:";
    input.placeholder = "Your Cohere API Key...";
    providerName = "Cohere";
  } else if (provider === "xai") {
    label.innerText = "xAI (Grok) API Key:";
    input.placeholder = "Starts with xai-...";
    providerName = "xAI";
  } else if (provider === "huggingface") {
    label.innerText = "Hugging Face Access Token:";
    input.placeholder = "Starts with hf_...";
    providerName = "HuggingFace";
  } else if (provider === "ai21") {
    label.innerText = "AI21 Labs API Key:";
    input.placeholder = "Starts with ...";
    providerName = "AI21 Labs";
  } else if (provider === "anyscale") {
    label.innerText = "AnyScale API Key:";
    input.placeholder = "Starts with esecret_...";
    providerName = "AnyScale";
  } else if (provider === "deepinfra") {
    label.innerText = "DeepInfra API Key:";
    input.placeholder = "Your DeepInfra API Key...";
    providerName = "DeepInfra";
  } else if (provider === "fireworks") {
    label.innerText = "Fireworks AI API Key:";
    input.placeholder = "Starts with fw_...";
    providerName = "Fireworks AI";
  } else if (provider === "novita") {
    label.innerText = "Novita AI API Key:";
    input.placeholder = "Your Novita API Key...";
    providerName = "Novita AI";
  } else if (provider === "sambanova") {
    label.innerText = "SambaNova API Key:";
    input.placeholder = "Your SambaNova API Key...";
    providerName = "SambaNova";
  } else if (provider === "upstage") {
    label.innerText = "Upstage API Key:";
    input.placeholder = "Starts with up_...";
    providerName = "Upstage";
  } else if (provider === "alibaba") {
    label.innerText = "Alibaba Cloud API Key:";
    input.placeholder = "Starts with sk-...";
    providerName = "Alibaba Cloud";
  } else if (provider === "cerebras") {
    label.innerText = "Cerebras API Key:";
    input.placeholder = "Your Cerebras API Key...";
    providerName = "Cerebras";
  } else if (provider === "hyperbolic") {
    label.innerText = "Hyperbolic API Key:";
    input.placeholder = "Your Hyperbolic API Key...";
    providerName = "Hyperbolic";
  } else if (provider === "moonshot") {
    label.innerText = "Moonshot AI API Key:";
    input.placeholder = "Starts with sk-...";
    providerName = "Moonshot AI";
  } else if (provider === "nvidia") {
    label.innerText = "NVIDIA NIM API Key:";
    input.placeholder = "Starts with nvapi-...";
    providerName = "NVIDIA NIM";
  } else if (provider === "octoai") {
    label.innerText = "OctoAI API Key:";
    input.placeholder = "Your OctoAI API Key...";
    providerName = "OctoAI";
  } else if (provider === "ollama") {
    label.innerText = "Ollama requires no API Key:";
    input.placeholder = "Ensure Ollama is running on localhost:11434";
    providerName = "Ollama";
  } else {
    label.innerText = "Gemini API Key:";
    input.placeholder = "Starts with AIzaSy...";
    providerName = "Gemini";
  }
  
  input.value = savedKeys[provider] || "";
  input.disabled = (provider === "ollama");
  
  helpBtn.innerText = `How can I get an ${providerName} API key?`;
  if (providerName === "Gemini" || providerName === "Groq" || providerName === "Mistral" || providerName === "Together" || providerName === "DeepSeek" || providerName === "Perplexity" || providerName === "Cohere" || providerName === "HuggingFace" || providerName === "DeepInfra" || providerName === "Novita AI" || providerName === "SambaNova" || providerName === "Hyperbolic" || providerName === "NVIDIA NIM" || providerName === "Cerebras" || providerName === "Alibaba Cloud" || providerName === "Moonshot AI" || providerName === "OctoAI") {
    helpBtn.innerText = `How can I get a ${providerName} API key?`;
  }
  
  if (providerName === "Ollama") {
    helpBtn.innerText = "Download Ollama";
    helpBtn.onclick = () => window.open("https://ollama.com", "_blank");
  } else {
    helpBtn.onclick = () => {
      window.open(`https://www.google.com/search?q=How+can+I+get+a+${providerName}+API+key`, "_blank");
    };
  }
  
  // Reset model dropdown
  currentFetchedModels = [];
  document.getElementById("modelInput").value = savedModels[provider] || "";
}

let currentFetchedModels = [];

function renderCustomDropdown(filterText) {
  const dropdown = document.getElementById("modelDropdown");
  const modelInput = document.getElementById("modelInput");
  const provider = document.getElementById("provider").value;
  
  dropdown.innerHTML = '';
  
  let items = currentFetchedModels;
  if (items.length === 0 && savedModels[provider]) {
    items = [savedModels[provider]];
  }

  const filtered = items.filter(m => m.toLowerCase().includes(filterText.toLowerCase()));
  
  if (filtered.length === 0) {
    dropdown.innerHTML = '<div style="padding: 10px; color: #999; font-size: 14px;">No models found. Click Fetch Models.</div>';
    return;
  }
  
  filtered.forEach(m => {
    const div = document.createElement("div");
    div.innerText = m;
    div.style.cssText = "padding: 10px; cursor: pointer; border-bottom: 1px solid #eee; font-size: 14px; color: #333;";
    div.onmouseenter = () => div.style.backgroundColor = "#f0f0f0";
    div.onmouseleave = () => div.style.backgroundColor = "transparent";
    div.onclick = () => {
      modelInput.value = m;
      dropdown.style.display = "none";
      savedModels[provider] = m;
      autoSave();
    };
    dropdown.appendChild(div);
  });
}

document.getElementById("modelInput").addEventListener("focus", () => {
  const provider = document.getElementById("provider").value;
  const apiKey = document.getElementById("apiKey").value.trim();
  if (currentFetchedModels.length === 0 && (apiKey !== "" || provider === "ollama")) {
    fetchModelsLogic(true);
  }
  document.getElementById("modelDropdown").style.display = "block";
  renderCustomDropdown(document.getElementById("modelInput").value.trim());
});

document.getElementById("modelInput").addEventListener("input", (e) => {
  document.getElementById("modelDropdown").style.display = "block";
  renderCustomDropdown(e.target.value.trim());
  const provider = document.getElementById("provider").value;
  savedModels[provider] = e.target.value.trim();
  autoSave();
});

document.addEventListener("click", (e) => {
  const modelInput = document.getElementById("modelInput");
  const dropdown = document.getElementById("modelDropdown");
  if (e.target !== modelInput && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// Save input immediately to memory when typing
let saveTimeout;
document.getElementById("apiKey").addEventListener("input", (e) => {
  const provider = document.getElementById("provider").value;
  savedKeys[provider] = e.target.value.trim();
  
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    autoSave();
    if (e.target.value.trim() !== "" || provider === "ollama") {
      fetchModelsLogic(true);
    }
  }, 500);
});

// Listen for provider changes
document.getElementById("provider").addEventListener("change", () => {
  updateProviderUI();
  autoSave();
  
  const apiKey = document.getElementById("apiKey").value.trim();
  const providerVal = document.getElementById("provider").value;
  if (apiKey !== "" || providerVal === "ollama") {
    fetchModelsLogic(true);
  }
});

// Fetch Models Logic
async function fetchModelsLogic(silent = false) {
  const provider = document.getElementById("provider").value;
  const apiKey = document.getElementById("apiKey").value.trim();
  const fetchBtn = document.getElementById("fetchModelsBtn");
  
  if (!apiKey && provider !== "ollama") {
    if (!silent) alert("Please enter an API Key first.");
    return;
  }
  
  fetchBtn.innerText = "Loading...";
  
  try {
    let models = [];
    if (provider === "openai" || provider === "groq" || provider === "mistral" || provider === "deepseek" || provider === "together" || provider === "openrouter" || provider === "xai" || provider === "ai21" || provider === "anyscale" || provider === "deepinfra" || provider === "fireworks" || provider === "novita" || provider === "sambanova" || provider === "upstage" || provider === "alibaba" || provider === "cerebras" || provider === "hyperbolic" || provider === "moonshot" || provider === "nvidia" || provider === "octoai" || provider === "ollama") {
      let url = "";
      if (provider === "openai") url = "https://api.openai.com/v1/models";
      else if (provider === "groq") url = "https://api.groq.com/openai/v1/models";
      else if (provider === "mistral") url = "https://api.mistral.ai/v1/models";
      else if (provider === "deepseek") url = "https://api.deepseek.com/models";
      else if (provider === "together") url = "https://api.together.xyz/v1/models";
      else if (provider === "openrouter") url = "https://openrouter.ai/api/v1/models";
      else if (provider === "xai") url = "https://api.x.ai/v1/models";
      else if (provider === "ai21") url = "https://api.ai21.com/studio/v1/models";
      else if (provider === "anyscale") url = "https://api.endpoints.anyscale.com/v1/models";
      else if (provider === "deepinfra") url = "https://api.deepinfra.com/v1/models";
      else if (provider === "fireworks") url = "https://api.fireworks.ai/inference/v1/models";
      else if (provider === "novita") url = "https://api.novita.ai/v3/models";
      else if (provider === "sambanova") url = "https://api.sambanova.ai/v1/models";
      else if (provider === "upstage") url = "https://api.upstage.ai/v1/models";
      else if (provider === "alibaba") url = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models";
      else if (provider === "cerebras") url = "https://api.cerebras.ai/v1/models";
      else if (provider === "hyperbolic") url = "https://api.hyperbolic.xyz/v1/models";
      else if (provider === "moonshot") url = "https://api.moonshot.cn/v1/models";
      else if (provider === "nvidia") url = "https://integrate.api.nvidia.com/v1/models";
      else if (provider === "octoai") url = "https://text.octoai.run/v1/models";
      else if (provider === "ollama") url = "http://localhost:11434/api/tags";
      
      let headers = {};
      if (provider !== "ollama") {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }
      
      const res = await fetch(url, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Failed to fetch");
      
      if (provider === "ollama") {
        models = data.models.map(m => m.name).sort();
      } else {
        models = data.data.map(m => m.id).sort();
      }
    } else if (provider === "gemini") {
      const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Failed to fetch");
      models = data.models.map(m => m.name.replace("models/", "")).sort();
    } else if (provider === "anthropic") {
      models = ["claude-3-5-sonnet-20241022", "claude-3-5-sonnet-20240620", "claude-3-5-haiku-20241022", "claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"];
    } else if (provider === "perplexity") {
      models = ["llama-3.1-sonar-small-128k-chat", "llama-3.1-sonar-large-128k-chat", "llama-3.1-sonar-huge-128k-chat", "llama-3.1-sonar-small-128k-online", "llama-3.1-sonar-large-128k-online", "llama-3.1-sonar-huge-128k-online"];
    } else if (provider === "cohere") {
      const res = await fetch("https://api.cohere.com/v1/models", {
        headers: { "Authorization": `Bearer ${apiKey}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      models = data.models.filter(m => m.endpoints && m.endpoints.includes("chat")).map(m => m.name).sort();
    } else if (provider === "huggingface") {
      models = ["meta-llama/Llama-3.1-8B-Instruct", "meta-llama/Meta-Llama-3-8B-Instruct", "mistralai/Mixtral-8x7B-Instruct-v0.1"];
    }
    
    currentFetchedModels = models;
    renderCustomDropdown(document.getElementById("modelInput").value.trim());
    if (document.activeElement === document.getElementById("modelInput")) {
      document.getElementById("modelDropdown").style.display = "block";
    }
  } catch (error) {
    if (!silent) alert("Error fetching models: " + error.message);
  } finally {
    fetchBtn.innerText = "Fetch Models";
  }
}

document.getElementById("fetchModelsBtn").addEventListener("click", () => fetchModelsLogic(false));

// If a key or language was previously saved, populate the inputs when the page loads
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get([
    "geminiApiKey", "openaiApiKey", "anthropicApiKey", "groqApiKey", "mistralApiKey", "deepseekApiKey", "togetherApiKey", "openrouterApiKey", "perplexityApiKey", "cohereApiKey", "xaiApiKey", "huggingfaceApiKey", "ollamaApiKey", "ai21ApiKey", "anyscaleApiKey", "deepinfraApiKey", "fireworksApiKey", "novitaApiKey", "sambanovaApiKey", "upstageApiKey", "alibabaApiKey", "cerebrasApiKey", "hyperbolicApiKey", "moonshotApiKey", "nvidiaApiKey", "octoaiApiKey",
    "geminiModel", "openaiModel", "anthropicModel", "groqModel", "mistralModel", "deepseekModel", "togetherModel", "openrouterModel", "perplexityModel", "cohereModel", "xaiModel", "huggingfaceModel", "ollamaModel", "ai21Model", "anyscaleModel", "deepinfraModel", "fireworksModel", "novitaModel", "sambanovaModel", "upstageModel", "alibabaModel", "cerebrasModel", "hyperbolicModel", "moonshotModel", "nvidiaModel", "octoaiModel",
    "language", "provider", "quickIconEnabled"
  ], (result) => {
    savedKeys.gemini = result.geminiApiKey || "";
    savedKeys.openai = result.openaiApiKey || "";
    savedKeys.anthropic = result.anthropicApiKey || "";
    savedKeys.groq = result.groqApiKey || "";
    savedKeys.mistral = result.mistralApiKey || "";
    savedKeys.deepseek = result.deepseekApiKey || "";
    savedKeys.together = result.togetherApiKey || "";
    savedKeys.openrouter = result.openrouterApiKey || "";
    savedKeys.perplexity = result.perplexityApiKey || "";
    savedKeys.cohere = result.cohereApiKey || "";
    savedKeys.xai = result.xaiApiKey || "";
    savedKeys.huggingface = result.huggingfaceApiKey || "";
    savedKeys.ollama = result.ollamaApiKey || "";
    savedKeys.ai21 = result.ai21ApiKey || "";
    savedKeys.anyscale = result.anyscaleApiKey || "";
    savedKeys.deepinfra = result.deepinfraApiKey || "";
    savedKeys.fireworks = result.fireworksApiKey || "";
    savedKeys.novita = result.novitaApiKey || "";
    savedKeys.sambanova = result.sambanovaApiKey || "";
    savedKeys.upstage = result.upstageApiKey || "";
    savedKeys.alibaba = result.alibabaApiKey || "";
    savedKeys.cerebras = result.cerebrasApiKey || "";
    savedKeys.hyperbolic = result.hyperbolicApiKey || "";
    savedKeys.moonshot = result.moonshotApiKey || "";
    savedKeys.nvidia = result.nvidiaApiKey || "";
    savedKeys.octoai = result.octoaiApiKey || "";
    
    savedModels.gemini = result.geminiModel || "";
    savedModels.openai = result.openaiModel || "";
    savedModels.anthropic = result.anthropicModel || "";
    savedModels.groq = result.groqModel || "";
    savedModels.mistral = result.mistralModel || "";
    savedModels.deepseek = result.deepseekModel || "";
    savedModels.together = result.togetherModel || "";
    savedModels.openrouter = result.openrouterModel || "";
    savedModels.perplexity = result.perplexityModel || "";
    savedModels.cohere = result.cohereModel || "";
    savedModels.xai = result.xaiModel || "";
    savedModels.huggingface = result.huggingfaceModel || "";
    savedModels.ollama = result.ollamaModel || "";
    savedModels.ai21 = result.ai21Model || "";
    savedModels.anyscale = result.anyscaleModel || "";
    savedModels.deepinfra = result.deepinfraModel || "";
    savedModels.fireworks = result.fireworksModel || "";
    savedModels.novita = result.novitaModel || "";
    savedModels.sambanova = result.sambanovaModel || "";
    savedModels.upstage = result.upstageModel || "";
    savedModels.alibaba = result.alibabaModel || "";
    savedModels.cerebras = result.cerebrasModel || "";
    savedModels.hyperbolic = result.hyperbolicModel || "";
    savedModels.moonshot = result.moonshotModel || "";
    savedModels.nvidia = result.nvidiaModel || "";
    savedModels.octoai = result.octoaiModel || "";
    
    if (result.language) {
      document.getElementById("language").value = result.language;
    }
    if (result.provider) {
      document.getElementById("provider").value = result.provider;
    }
    
    document.getElementById("enableQuickIcon").checked = result.quickIconEnabled !== false;
    
    updateProviderUI();
    
    const apiKey = document.getElementById("apiKey").value.trim();
    const providerVal = document.getElementById("provider").value;
    if (apiKey !== "" || providerVal === "ollama") {
      fetchModelsLogic(true);
    }
  });
});

// Auto save function
let statusTimeout;
let statusInterval;

function autoSave() {
  const provider = document.getElementById("provider").value;
  savedKeys[provider] = document.getElementById("apiKey").value.trim();
  savedModels[provider] = document.getElementById("modelInput").value.trim();
  const language = document.getElementById("language").value;
  const quickIconEnabled = document.getElementById("enableQuickIcon").checked;
  
  chrome.storage.local.set({ 
    geminiApiKey: savedKeys.gemini, 
    openaiApiKey: savedKeys.openai, 
    anthropicApiKey: savedKeys.anthropic,
    groqApiKey: savedKeys.groq,
    mistralApiKey: savedKeys.mistral,
    deepseekApiKey: savedKeys.deepseek,
    togetherApiKey: savedKeys.together,
    openrouterApiKey: savedKeys.openrouter,
    perplexityApiKey: savedKeys.perplexity,
    cohereApiKey: savedKeys.cohere,
    xaiApiKey: savedKeys.xai,
    huggingfaceApiKey: savedKeys.huggingface,
    ollamaApiKey: savedKeys.ollama,
    ai21ApiKey: savedKeys.ai21,
    anyscaleApiKey: savedKeys.anyscale,
    deepinfraApiKey: savedKeys.deepinfra,
    fireworksApiKey: savedKeys.fireworks,
    novitaApiKey: savedKeys.novita,
    sambanovaApiKey: savedKeys.sambanova,
    upstageApiKey: savedKeys.upstage,
    alibabaApiKey: savedKeys.alibaba,
    cerebrasApiKey: savedKeys.cerebras,
    hyperbolicApiKey: savedKeys.hyperbolic,
    moonshotApiKey: savedKeys.moonshot,
    nvidiaApiKey: savedKeys.nvidia,
    octoaiApiKey: savedKeys.octoai,
    geminiModel: savedModels.gemini,
    openaiModel: savedModels.openai,
    anthropicModel: savedModels.anthropic,
    groqModel: savedModels.groq,
    mistralModel: savedModels.mistral,
    deepseekModel: savedModels.deepseek,
    togetherModel: savedModels.together,
    openrouterModel: savedModels.openrouter,
    perplexityModel: savedModels.perplexity,
    cohereModel: savedModels.cohere,
    xaiModel: savedModels.xai,
    huggingfaceModel: savedModels.huggingface,
    ollamaModel: savedModels.ollama,
    ai21Model: savedModels.ai21,
    anyscaleModel: savedModels.anyscale,
    deepinfraModel: savedModels.deepinfra,
    fireworksModel: savedModels.fireworks,
    novitaModel: savedModels.novita,
    sambanovaModel: savedModels.sambanova,
    upstageModel: savedModels.upstage,
    alibabaModel: savedModels.alibaba,
    cerebrasModel: savedModels.cerebras,
    hyperbolicModel: savedModels.hyperbolic,
    moonshotModel: savedModels.moonshot,
    nvidiaModel: savedModels.nvidia,
    octoaiModel: savedModels.octoai,
    language: language, 
    provider: provider,
    quickIconEnabled: quickIconEnabled
  }, () => {
    const status = document.getElementById("status");
    status.innerText = "Saved";
    status.style.opacity = "1";
    
    clearTimeout(statusTimeout);
    clearInterval(statusInterval);
    
    // Fade out effect
    statusTimeout = setTimeout(() => {
      let opacity = 1;
      statusInterval = setInterval(() => {
        if (opacity <= 0.1) {
          clearInterval(statusInterval);
          status.innerHTML = "";
          status.style.opacity = "1";
        }
        status.style.opacity = opacity;
        opacity -= Math.max(opacity * 0.1, 0.05);
      }, 50);
    }, 1500);
  });
}

document.getElementById("language").addEventListener("change", autoSave);
document.getElementById("enableQuickIcon").addEventListener("change", autoSave);
