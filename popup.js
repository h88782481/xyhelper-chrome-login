document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['location', 'codeVerifier', 'mode'], function (data) {
        const accessTokenDiv = document.getElementById('accessToken');
        const refreshTokenDiv = document.getElementById('refreshToken');
        const sessionDiv = document.getElementById('session');
        const modeInfoDiv = document.getElementById('mode-info');
        
        // 显示使用的登录模式
        if (data.mode) {
            modeInfoDiv.textContent = `使用${data.mode === 'auth0' ? 'Auth0' : 'Auth'}模式获取的令牌`;
        }
        
        if (data.location && data.codeVerifier) {
            fetch('https://public.xyhelper.cn/api/getsession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    location: data.location,
                    codeVerifier: data.codeVerifier
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