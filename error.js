// 兼容 Firefox 与 Chrome 的 API 命名
if (typeof chrome === 'undefined' && typeof browser !== 'undefined') {
    var chrome = browser;
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get('error', function (result) {
        console.log(result);
        let errorMessage = result.error || '未知错误';
        if (typeof errorMessage === 'object') {
            errorMessage = JSON.stringify(errorMessage, null, 2); // 格式化对象
        }
        document.getElementById('error-message').textContent = errorMessage;
    });
});
