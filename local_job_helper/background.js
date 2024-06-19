chrome.runtime.onInstalled.addListener(function() {
    chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
        if (details.url.startsWith("resume_RCL_writer://success")) {
          chrome.tabs.create({ url: chrome.runtime.getURL("success.html") });
          chrome.runtime.sendMessage({ action: "success" });
        } else if (details.url.startsWith("resume_RCL_writer://cancel")) {
          chrome.tabs.create({ url: chrome.runtime.getURL("cancel.html") });
          chrome.runtime.sendMessage({ action: "cancel" });
        }
      },
      { urls: ["resume_RCL_writer://*"] },
      ["blocking"]
    );
  });