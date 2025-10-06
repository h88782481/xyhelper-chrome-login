// 兼容 Firefox 与 Chrome 的 API 命名
if (typeof chrome === 'undefined' && typeof browser !== 'undefined') {
    var chrome = browser;
}

// 在响应阶段检查重定向的 Location，并在支持的环境中阻断到 app scheme 的跳转
(function registerInterceptor() {
    const manifest = (chrome && chrome.runtime && chrome.runtime.getManifest) ? chrome.runtime.getManifest() : { manifest_version: 3 };
    const supportBlocking = Number(manifest.manifest_version) === 2; // MV2 可阻断；MV3 Chrome 不支持阻断 webRequest

    function handler(details) {
        try {
            const headers = details.responseHeaders || [];
            const locationHeader = headers.find(h => h.name && h.name.toLowerCase() === 'location');
            const redirect = locationHeader && locationHeader.value ? locationHeader.value : '';
            if (redirect.startsWith('com.openai.chat://auth0.openai.com/ios/com.openai.chat/callback?')) {
                const code = new URL(redirect).searchParams.get('code');
                console.log('Intercept redirect -> app scheme, code:', code);
                chrome.storage.local.set({ location: redirect }, function () {
                    if (details.tabId >= 0) {
                        chrome.tabs.update(details.tabId, { url: 'popup.html' });
                    }
                });
                if (supportBlocking) {
                    return { cancel: true };
                }
            }
        } catch (e) {
            console.warn('onHeadersReceived handler error:', e);
        }
    }

    const urls = [
        "https://auth0.openai.com/*",
        "https://auth.openai.com/*"
    ];
    const extra = ["responseHeaders"];
    if (supportBlocking) extra.push("blocking");
    try {
        chrome.webRequest.onHeadersReceived.addListener(handler, { urls }, extra);
    } catch (e) {
        console.warn('Failed to register webRequest listener:', e);
    }
})();
