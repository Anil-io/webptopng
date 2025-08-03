chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "convertToJPG",
      title: "Convert WEBP to JPG",
      contexts: ["image"]
    });
    chrome.contextMenus.create({
      id: "convertToPNG",
      title: "Convert WEBP to PNG",
      contexts: ["image"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.mediaType === "image") {
      // First inject convert.js
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["convert.js"]
      }, () => {
        // Then call the global function with args
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (url, format) => {
            window.__convertWebpFromContext && window.__convertWebpFromContext(url, format);
          },
          args: [
            info.srcUrl,
            info.menuItemId === "convertToJPG" ? "image/jpeg" : "image/png"
          ]
        });
      });
    }
  });
  