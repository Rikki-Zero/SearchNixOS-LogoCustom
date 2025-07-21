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
// ==/UserScript==

(function () {
    "use strict";

    // 等待页面加载完成
    window.addEventListener("load", function () {
        const logo = document.querySelector(".logo");

        if (!logo) return;

        // 检查是否有存储的自定义logo
        const customLogo = GM_getValue("customLogo");
        if (customLogo) {
            logo.src = customLogo;
        }

        // 添加右键菜单事件
        logo.addEventListener("contextmenu", function (e) {
            e.preventDefault();

            if (confirm("您想要修改当前Logo吗？")) {
                // 创建文件输入元素
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";

                input.onchange = function (e) {
                    const file = e.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const newLogoSrc = event.target.result;
                        // 保存到存储
                        GM_setValue("customLogo", newLogoSrc);
                        // 更新logo
                        logo.src = newLogoSrc;
                    };
                    reader.readAsDataURL(file);
                };

                input.click();
            }
        });
    });
})();
