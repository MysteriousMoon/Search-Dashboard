// 主题切换器
const themeSystem = {
    // 主题模式存储键
    modeStorageKey: 'themeMode',
    colorStorageKey: 'themeColor',
    
    // 主题颜色映射 - 按色轮顺序排列（暖色到冷色）
    themeColors: {
        'sunset': {
            color: 'rgba(236, 143, 106, 1)',// 烟熏橘红 //
            displayName: '日落',
            quote: '落霞与孤鹜齐飞，秋水共长天一色'  // 日落主题引用
        },
        'zimojin': {
            color: 'rgb(188, 131, 107)', // 紫磨金色
            displayName: '紫磨金',
            quote: '碧琉璃色水澄清，紫磨金光身莹明' // 紫磨金主题引用
        },
        'songhua': {
            color: 'rgb(255, 238, 111)', // 松花色
            displayName: '松花',
            quote: '金银气色，若白轻黄' // 松花主题引用
        },
        'taoyao': {
            color: 'rgb(240, 145, 160)', // 桃夭色
            displayName: '桃夭',
            quote: '桃之夭夭，灼灼其华' // 桃夭主题引用
        },
        'forest': {
            color: 'rgb(95, 141, 78)',       // 森林深绿 (theme-deep)
            displayName: '森林',
            quote: '林深时见鹿'             // 森林主题引用
        },
        'polar': {
            color: 'rgb(132, 165, 157)',     // 极夜青灰 (theme-deep)
            displayName: '极夜',
            quote: '极夜寂静，北辰闪烁'     // 极夜主题引用
        },
        'ocean': {
            color: 'rgb(69, 123, 157)',      // 深海蓝 (theme-deep)
            displayName: '海洋',
            quote: '海阔凭鱼跃，天高任鸟飞'  // 海洋主题引用
        },
        'default': {
            color: 'rgb(89, 114, 143)', // 青蓝色
            displayName: '青蓝',
            quote: '青取之于蓝，而青于蓝' // 默认青色主题引用
        }
    },
    
    // 当前设置
    currentMode: 'auto',
    currentColor: 'default',
    
    // 初始化
    init: function() {
        // 亮暗模式切换
        this.initThemeToggle();
        
        // 颜色主题切换
        this.initColorTheme();
    },
    
    // 初始化亮暗模式切换
    initThemeToggle: function() {
        const toggleBtn = document.getElementById('themeToggleBtn');
        const autoIcon = toggleBtn.querySelector('.auto-icon');
        const sunIcon = toggleBtn.querySelector('.sun-icon');
        const moonIcon = toggleBtn.querySelector('.moon-icon');
        
        // 加载保存的亮暗模式
        const savedMode = localStorage.getItem(this.modeStorageKey);
        if (savedMode && ['auto', 'light', 'dark'].includes(savedMode)) {
            this.currentMode = savedMode;
            
            // 更新按钮状态
            autoIcon.classList.remove('active');
            sunIcon.classList.remove('active');
            moonIcon.classList.remove('active');
            
            if (this.currentMode === 'auto') {
                autoIcon.classList.add('active');
                toggleBtn.title = '自动跟随系统(Auto)';
            }
            else if (this.currentMode === 'light') {
                sunIcon.classList.add('active');
                toggleBtn.title = '亮色模式(Light)';
            }
            else {
                moonIcon.classList.add('active');
                toggleBtn.title = '暗色模式(Dark)';
            }
        }
        
        // 绑定事件
        toggleBtn.addEventListener('click', () => {
            // 按顺序切换: auto -> light -> dark -> auto
            if (this.currentMode === 'auto') {
                this.currentMode = 'light';
                toggleBtn.title = '亮色模式(Light)';
            }
            else if (this.currentMode === 'light') {
                this.currentMode = 'dark';
                toggleBtn.title = '暗色模式(Dark)';
            }
            else {
                this.currentMode = 'auto';
                toggleBtn.title = '自动跟随系统(Auto)';
            }
            
            // 保存选择
            localStorage.setItem(this.modeStorageKey, this.currentMode);
            
            // 更新按钮状态
            autoIcon.classList.remove('active');
            sunIcon.classList.remove('active');
            moonIcon.classList.remove('active');
            
            if (this.currentMode === 'auto') autoIcon.classList.add('active');
            else if (this.currentMode === 'light') sunIcon.classList.add('active');
            else moonIcon.classList.add('active');
            
            // 应用主题
            this.applyTheme();
        });
        
        // 监听系统主题变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.currentMode === 'auto') {
                this.applyTheme();
            }
        });
    },
    
    // 初始化颜色主题切换
    initColorTheme: function() {
        const colorOptions = document.querySelectorAll('.color-option');
        const currentTheme = document.getElementById('currentTheme');
        
        // 加载保存的颜色主题
        const savedColor = localStorage.getItem(this.colorStorageKey);
        if (savedColor && this.themeColors[savedColor]) {
            this.currentColor = savedColor;
        }
        
        // 更新选择状态和当前主题显示
        this.updateColorSelection();
        
        // 绑定事件
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                // 设置新的颜色主题
                this.currentColor = option.dataset.color;
                
                // 保存选择
                localStorage.setItem(this.colorStorageKey, this.currentColor);
                
                // 更新选择状态和当前主题显示
                this.updateColorSelection();
                
                // 应用主题
                this.applyTheme();
            });
        });
        
        // 初始应用主题引用
        this.updateThemeQuote();
    },
    
    // 更新颜色选择状态和当前主题显示
    updateColorSelection: function() {
        const colorOptions = document.querySelectorAll('.color-option');
        const currentTheme = document.getElementById('currentTheme');
        
        // 更新选项选中状态
        colorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.color === this.currentColor) {
                option.classList.add('active');
            }
        });
        
        // 更新当前主题显示
        const themeColor = this.themeColors[this.currentColor].color;
        currentTheme.style.backgroundColor = themeColor;
        
        // 设置提示文本
        currentTheme.title = this.themeColors[this.currentColor].displayName + '主题';
    },
    
    // 更新主题引用文本
    updateThemeQuote: function() {
        const quoteElement = document.querySelector('.quote-subtle');
        if (quoteElement) {
            // 获取当前主题的引用文本
            const quote = this.themeColors[this.currentColor].quote;
            quoteElement.textContent = quote;
        }
    },
    
    // 应用主题
    applyTheme: function() {
        // 确定亮暗模式
        let theme;
        if (this.currentMode === 'auto') {
            // 自动模式下跟随系统设置
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDarkMode ? 'dark' : 'light';
        } else {
            // 手动模式使用选定的主题
            theme = this.currentMode;
        }
        
        // 应用亮暗模式到文档
        document.documentElement.setAttribute('data-theme', theme);
        
        // 应用颜色主题到文档
        if (this.currentColor === 'default') {
            document.documentElement.removeAttribute('data-color');
        } else {
            document.documentElement.setAttribute('data-color', this.currentColor);
        }
        
        // 更新主题引用文本
        this.updateThemeQuote();
    }
};

// 文档加载完成后初始化主题系统
document.addEventListener('DOMContentLoaded', () => {
    themeSystem.init();
    themeSystem.applyTheme();
});