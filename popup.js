// 兼容 Firefox 与 Chrome 的 API 命名
if (typeof chrome === 'undefined' && typeof browser !== 'undefined') {
    var chrome = browser;
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['location', 'codeVerifier', 'type', 'env', 'client_id'], function (data) {
        const accessTokenDiv = document.getElementById('accessToken');
        const refreshTokenDiv = document.getElementById('refreshToken');
        const sessionDiv = document.getElementById('session');
        const modeInfoDiv = document.getElementById('mode-info');
        
        // 显示使用的登录模式
        if (data.type) {
            const envText = data.env === 'dev' ? '开发环境' : '生产环境';
            modeInfoDiv.textContent = `使用${data.type.toUpperCase()}类型（${envText}）获取的令牌`;
        }
        
        if (data.location && data.codeVerifier) {
            const apiBase = (data.env === 'dev') ? 'http://127.0.0.1:8080' : 'https://public.xyhelper.cn';
            fetch(`${apiBase}/api/getsession`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: data.location,
                    codeVerifier: data.codeVerifier,
                    client_id: typeof data.client_id === 'string' ? data.client_id : ''
                })
            })
                .then(response => response.json())
                .then(result => {
                    accessTokenDiv.textContent = result.accessToken || 'No accessToken found';
                    refreshTokenDiv.textContent = result.refresh_token || 'No refresh_token found';
                    sessionDiv.textContent = JSON.stringify(result, null, 2);
                })
                .catch(error => {
                    sessionDiv.textContent = 'Error fetching session: ' + error.message;
                });
        } else {
            sessionDiv.textContent = 'No URL or codeVerifier found';
        }
    });
});
