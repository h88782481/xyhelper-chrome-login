document.addEventListener('DOMContentLoaded', function () {
    const auth0Button = document.getElementById('mode-auth0');
    const authButton = document.getElementById('mode-auth');
    const loading = document.getElementById('loading');

    // 显示加载状态
    function showLoading() {
        loading.style.display = 'flex';
    }

    // 隐藏加载状态
    function hideLoading() {
        loading.style.display = 'none';
    }

    // 处理登录请求
    async function handleLogin(mode) {
        showLoading();
        
        try {
            const response = await fetch(`https://public.xyhelper.cn/gptlogin?mode=${mode}`);
            const data = await response.json();
            const loginurl = data.loginurl;
            const codeVerifier = data.codeVerifier;

            if (loginurl && codeVerifier) {
                // 存储数据到Chrome storage
                chrome.storage.local.set({ 
                    loginurl: loginurl, 
                    codeVerifier: codeVerifier,
                    mode: mode 
                }, function () {
                    // 创建新标签页并导航到登录URL
                    chrome.tabs.create({ url: loginurl }, function() {
                        // 关闭popup
                        window.close();
                    });
                });
            } else {
                throw new Error('未能获取登录链接');
            }
        } catch (error) {
            console.error('登录请求失败:', error);
            hideLoading();
            
            // 存储错误信息
            chrome.storage.local.set({ 
                error: error.message || '登录请求失败' 
            }, function () {
                // 创建错误页面
                chrome.tabs.create({ url: 'error.html' }, function() {
                    window.close();
                });
            });
        }
    }

    // Auth0模式按钮事件
    auth0Button.addEventListener('click', function () {
        handleLogin('auth0');
    });

    // Auth模式按钮事件
    authButton.addEventListener('click', function () {
        handleLogin('auth');
    });

    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(event) {
        if (event.key === '1' || event.key === 'a') {
            auth0Button.click();
        } else if (event.key === '2' || event.key === 's') {
            authButton.click();
        } else if (event.key === 'Escape') {
            window.close();
        }
    });

    // 添加按钮焦点效果
    auth0Button.addEventListener('focus', function() {
        this.style.outline = '2px solid #4a90e2';
        this.style.outlineOffset = '2px';
    });

    auth0Button.addEventListener('blur', function() {
        this.style.outline = 'none';
    });

    authButton.addEventListener('focus', function() {
        this.style.outline = '2px solid #6c63ff';
        this.style.outlineOffset = '2px';
    });

    authButton.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
}); 