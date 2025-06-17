// 登录请求现在通过popup界面处理，无需在这里处理点击事件
chrome.webRequest.onBeforeRedirect.addListener(
    function (details) {
        console.log(details);
        // code from https://github.com/wozulong/ChatGPTAuthHelper
        if (details.redirectUrl.startsWith('com.openai.chat://auth0.openai.com/ios/com.openai.chat/callback?')) {
            const code = new URL(details.redirectUrl).searchParams.get('code');
            console.log(code);
            chrome.storage.local.set({location: details.redirectUrl}, function () {
                chrome.tabs.update(details.tabId, {url: 'popup.html'});
            });
            return {cancel: true};
        }
    },
    {urls: ["<all_urls>"]},
    ["responseHeaders"]
);