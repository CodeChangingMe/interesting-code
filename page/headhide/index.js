var flag = false;

const appDiv = document.getElementsByTagName('div')[0];

document.addEventListener('scroll', function() {
  window.requestAnimationFrame(function() {
    if (!flag) {
      // 业务逻辑
      appDiv.style.opacity = '0';

      flag = true;
    }
  });
});

appDiv.addEventListener('mouseenter', function() {
  appDiv.style.opacity = '0.3';

  flag = false;
});
