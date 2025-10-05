document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------------
    // 導航菜單切換邏輯 (保持不變)
    // ------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    });
    
    // ------------------------------------
    // 滾動觸發動畫的核心邏輯
    // ------------------------------------
    // 現在 targets 包含所有需要動畫的元素 (包括 stat-card)
    const targets = document.querySelectorAll('.subsystem-card, .feature-item, .pricing-card, .stat-card'); 

    /**
     * 檢查元素是否在可見視窗內
     */
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        // 觸發高度設為視窗的 85%
        const triggerHeight = (window.innerHeight || document.documentElement.clientHeight) * 0.85; 

        // 檢查元素頂部是否進入觸發範圍
        return rect.top <= triggerHeight;
    }

    /**
     * 處理所有滾動動畫
     */
    function handleScrollAnimation() {
        targets.forEach(element => {
            // 檢查是否已經激活過
            const isSubsystemVisible = element.classList.contains('visible');
            const isGeneralAnimated = element.classList.contains('fade-in');

            // 只有未激活的元素才檢查是否在視窗內
            if (!isSubsystemVisible && !isGeneralAnimated) {
                if (isElementInViewport(element)) {
                    
                    // 1. Subsystems (滑入動畫)
                    if (element.classList.contains('subsystem-card')) {
                        element.classList.add('visible');
                    } 
                    
                    // 2. Features, Pricing, & Stats (淡入動畫)
                    else if (element.classList.contains('feature-item') || element.classList.contains('pricing-card') || element.classList.contains('stat-card')) {
                        element.classList.add('fade-in'); // 使用新的 .fade-in 類別
                    }
                }
            }
        });
    }

    // 監聽滾動事件
    window.addEventListener('scroll', handleScrollAnimation);

    // 頁面加載時先檢查一次 (處理首屏內容)
    handleScrollAnimation();
});
