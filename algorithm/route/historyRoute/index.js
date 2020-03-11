// 因为replaceState api不支持file类型的域，所以无法在本地运行，需要运行在服务器中。
class Routers {
  constructor() {
    this.routes = {};
    this._bindPopState();
  }

  // 初始化路由
  init(path) {
    history.replaceState({ path: path }, null, path);
    this.routes[path] && this.routes[path](); // 执行回调
  }

  // 存储paht和回调函数的映射
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  // 触发路由对应回调
  go(path) {
    history.pushState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  _bindPopState() {
    // 在浏览器前进、后退时，或者history.backd等方法时才会调用
    window.addEventListener('popstate', e => {
      //
      const path = e.state && e.state.path;
      this.route[path] && this.route[path]();
    });
  }
}

window.Router = new Routers();
Router.init(location.pathname); //获取子路径
const conent = document.querySelector('body');
const ul = document.querySelector('ul');

function changeBgColor(color) {
  content.style.backgroundColor = color;
}

Router.route('/', function() {
  changeBgColor('yellow');
});
Router.route('/blue', function() {
  changeBgColor('blue');
});
Router.route('/green', function() {
  changeBgColor('green');
});

ul.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault(); //阻止浏览器的默认跳转事件
    Router.go(e.target.getAttribute('href'));
    // history.replaceState({ path: path }, null, e.target.getAttribute('href'));
  }
});
