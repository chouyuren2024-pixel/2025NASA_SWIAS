document.addEventListener('DOMContentLoaded', function() {
    // 導航菜單切換邏輯 (您現有的)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    /**
     * Toggles the visibility of the navigation menu on mobile devices.
     */
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    /**
     * Closes the mobile menu when a navigation link is clicked.
     */
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // ------------------------------------
    // --- 滾動視差動畫邏輯 (最關鍵的部分) ---
    // ------------------------------------
    const slideCards = document.querySelectorAll('.subsystem-card');

    /**
     * 檢查元素是否在可見視窗內
     * @param {HTMLElement} element 
     */
// script.js (修正後的 isElementInViewport 函式)
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    // 設定一個視窗高度的百分比 (例如 15%) 作為觸發點，讓動畫提前發生
    // 當元素的頂部距離視窗底部 15% 處時，就觸發動畫
    const triggerHeight = (window.innerHeight || document.documentElement.clientHeight) * 0.85; // 視窗高度的 85% 處

    return (
        // 判斷：元素的頂部位置 (rect.top) 是否小於觸發點 (triggerHeight)。
        // 換句話說，當元素向上滾動，它的頂部越過了視窗的 85% 處時，即返回 true。
        rect.top <= triggerHeight
    );
}

    /**
     * 處理滾動事件，顯示可見的卡片
     */
    function handleScrollAnimation() {
        slideCards.forEach(card => {
            // 如果元素可見且尚未有 'visible' 類別，則添加它
            if (isElementInViewport(card) && !card.classList.contains('visible')) {
                card.classList.add('visible');
            }
        });
    }

    // 監聽滾動事件
    window.addEventListener('scroll', handleScrollAnimation);

    // 頁面加載時先檢查一次 (處理首屏內容)
    handleScrollAnimation();
});
