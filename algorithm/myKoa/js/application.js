const { createServer } = require('http');

module.exports = class Applicaton {
  constructor() {
    // 中间件函数数组
    this.middleware = [];
  }

  // 使用中间件方法
  use(fn) {
    this.middleware.push(fn);
  }

  // 监听端口
  listen(...args) {
    // createServer的回调函数，会在收到请求的时候，执行
    const server = createServer(this.callback());
    server.listen(...args);
  }

  // req、res是原生的node request和response对象
  // 执行所有中间件函数
  callback() {
    const fn = compose(this.middleware);

    const handleRequest = (req, res) => {
      fn(req, res).then(() => {
        respond(req, res); //设置响应数据
      });
    };
    return handleRequest;
  }
};

// 负责执行中间函数的函数
function compose(middleware) {
  return (req, res) => {
    function dispatch(i) {
      let fn = middleware[i];
      if (!fn) return Promise.resolve(); // 若已经不存在了，直接返回一个resolved
      return Promise.resolve(fn(req, res, dispatch.bind(null, i + 1))); //bind(null, xx)传递一个函数，并预设入参
    }
    // 返回一个promise
    return dispatch(0);
  };
}

function respond(req, res) {
  let body = res.body;
  if (typeof body === 'object') {
    body = JSON.stringify(body);
    res.end(body); // 表示响应已完成
  } else {
    res.end(body); // 表示响应已完成
  }
}
