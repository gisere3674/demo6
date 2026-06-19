let quickIcon = null;

document.addEventListener("mouseup", (e) => {
  // Wait a tiny bit for the selection to register properly
  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    // If the click is inside the quickIcon, do nothing (let the click handler fire)
    if (quickIcon && quickIcon.contains(e.target)) return;

    if (text.length > 0) {
      chrome.storage.local.get({ quickIconEnabled: true }, (result) => {
        if (!result.quickIconEnabled) return;
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        showQuickIcon(rect.right + window.scrollX, rect.bottom + window.scrollY, text);
      });
    } else {
      removeQuickIcon();
    }
  }, 10);
});

// Also remove the icon on mousedown to feel responsive, unless clicking the icon
document.addEventListener("mousedown", (e) => {
  if (quickIcon && !quickIcon.contains(e.target)) {
    removeQuickIcon();
  }
});

function showQuickIcon(x, y, text) {
  removeQuickIcon();

  quickIcon = document.createElement("img");
  quickIcon.src = chrome.runtime.getURL("icon.png");
  quickIcon.style.cssText = `
    position: absolute;
    left: ${x + 2}px;
    top: ${y + 2}px;
    width: 18px;
    height: 18px;
    cursor: pointer;
    z-index: 999998;
    background: transparent;
    box-shadow: none;
    border: none;
    transition: transform 0.1s;
  `;

  quickIcon.title = "What IS THAT?";

  quickIcon.onmouseenter = () => { quickIcon.style.transform = "scale(1.1)"; };
  quickIcon.onmouseleave = () => { quickIcon.style.transform = "scale(1)"; };

  quickIcon.onmousedown = (e) => {
    e.preventDefault(); // Prevent clearing selection
    e.stopPropagation();
  };

  quickIcon.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeQuickIcon();

    // Send message to background to trigger AI
    chrome.runtime.sendMessage({ action: "ask_gemini_quick", text: text });
  };

  quickIcon.oncontextmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeQuickIcon();
    chrome.runtime.sendMessage({ action: "open_options" });
  };

  document.body.appendChild(quickIcon);
}

function removeQuickIcon() {
  if (quickIcon) {
    quickIcon.remove();
    quickIcon = null;
  }
}
