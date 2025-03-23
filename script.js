document.addEventListener('DOMContentLoaded', function() {
  const complimentText = document.getElementById('compliment-text');
  const refreshBtn = document.getElementById('refresh-btn');
  const themeSwitch = document.getElementById('theme-switch');
  const themeIcon = themeSwitch.querySelector('i');
  
  // 主题切换功能
  themeSwitch.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  });
  
  // 初始显示一条赞美语句
  displayRandomCompliment();
  
  // 点击刷新按钮显示新的赞美语句
  refreshBtn.addEventListener('click', function(event) {
    // 触发礼花效果
    triggerConfetti(event);
    
    refreshBtn.classList.add('clicked');
    
    // 添加按钮旋转动画
    const icon = refreshBtn.querySelector('i');
    icon.style.transition = 'transform 0.5s';
    icon.style.transform = 'rotate(360deg)';
    
    // 淡出当前语句
    complimentText.style.opacity = 0;
    
    setTimeout(() => {
      displayRandomCompliment();
      // 淡入新语句
      complimentText.style.opacity = 1;
      
      // 重置旋转动画
      setTimeout(() => {
        icon.style.transition = 'none';
        icon.style.transform = 'rotate(0deg)';
        setTimeout(() => {
          icon.style.transition = 'transform 0.5s';
        }, 50);
      }, 500);
      
    }, 300);
  });
  
  // 显示随机赞美语句的函数
  function displayRandomCompliment() {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    complimentText.textContent = compliments[randomIndex];
  }
  
  // 礼花动画效果函数
  function triggerConfetti(event) {
    // 获取点击的x,y坐标作为礼花的起点
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    
    // 根据当前主题设置礼花颜色
    const isDarkMode = document.body.classList.contains('dark-mode');
    const colors = isDarkMode 
      ? ['#818cf8', '#ff8787', '#60a5fa', '#f472b6'] 
      : ['#5d5fef', '#ff6b6b', '#4f46e5', '#ec4899', '#f59e0b'];
    
    // 礼花效果 - 庆祝风格
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: colors,
      disableForReducedMotion: true // 无障碍支持
    });
    
    // 额外添加一些礼花从中心向上爆发
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 0.5, y: 0.8 },
        colors: colors,
        startVelocity: 30,
        gravity: 0.8,
        shapes: ['circle', 'square'],
        scalar: 1.2
      });
      
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0.5, y: 0.8 },
        colors: colors,
        startVelocity: 30,
        gravity: 0.8,
        shapes: ['circle', 'square'],
        scalar: 1.2
      });
    }, 200);
  }
  
  // 添加淡入淡出效果的CSS
  complimentText.style.transition = 'opacity 0.3s ease';
});

// 检测系统主题偏好并自动设置
function setInitialTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
    const themeIcon = document.querySelector('#theme-switch i');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

// 初始化主题
setInitialTheme(); 