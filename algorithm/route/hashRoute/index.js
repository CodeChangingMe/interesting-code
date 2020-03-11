class Routers {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
    this.refresh = this.refresh.bind(this);
    window.addEventListener('load', this.refresh);
    window.addEventListener('hashchange', this.refresh); //在hash url改变时触发回调
  }

  // 存储path路径与回调函数的映射
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  // 刷新
  refresh() {
    // 截取第一个#后的url
    this.currentUrl = location.hash.slice(1) || '/';
    // 执行回调
    this.routes[this.currentUrl]();
  }
}

window.Router = new Routers();
var content = document.querySelector('body');

function changeBackgroundColor(color) {
  content.style.backgroundColor = color; // 这里是改变颜色，真实情况是把这个作为容器，填充子元素内容
}

Router.route('/', function() {
  changeBackgroundColor('yellow');
});
Router.route('/blue', function() {
  changeBackgroundColor('blue');
});
Router.route('/green', function() {
  changeBackgroundColor('green');
});
