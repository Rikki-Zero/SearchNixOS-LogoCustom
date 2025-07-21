// ==UserScript==
// @name         SearchNixOS-LogoCustom
// @namespace    https://github.com/Rikki-Zero/SearchNixOS-LogoCustom
// @version      2025-07-21
// @description  因为骄傲月太长，Logo设计又不好看，为了真正的平等包容，实现了自定义图标的功能。
// @author       Rikki
// @match        https://search.nixos.org/packages
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nixos.org
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. 在文档加载前就注入CSS隐藏logo
    GM_addStyle(`
        .logo {
            opacity: 0 !important;
            visibility: hidden !important;
        }
    `);

    // 2. 等待页面完全加载
    window.addEventListener('load', function() {
        const logo = document.querySelector('.logo');
        if (!logo) return;

        // 3. 检查是否有存储的自定义logo
        const customLogo = GM_getValue('customLogo');
        if (customLogo) {
            // 先设置src再显示，避免闪烁
            logo.src = customLogo;
            logo.style.opacity = '1';
            logo.style.visibility = 'visible';
        } else {
            // 没有自定义logo时也显示原图
            logo.style.opacity = '1';
            logo.style.visibility = 'visible';
        }

        // 4. 添加右键菜单事件
        logo.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            if (confirm('您想要修改当前Logo吗？')) {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                
                input.onchange = function(e) {
                    const file = e.target.files[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const newLogoSrc = event.target.result;
                        GM_setValue('customLogo', newLogoSrc);
                        logo.src = newLogoSrc;
                    };
                    reader.readAsDataURL(file);
                };
                
                input.click();
            }
        });
    });
})();