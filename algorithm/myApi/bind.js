// 实现自己的call函数
Function.prototype.myCall = function (context) {
  context = context || window;
  // this指向当前函数对象
  // ! 如果context对象本身也有fn属性，那就可能存在冲突，可以用Symbol对象，见myCall2
  context.fn = this;
  let args = [...arguments].slice(1);
  // 调用当前函数时，函数中的this指向context。
  // 本质: 对象.方法()中，this的指向为该对象
  let result = context.fn(...args);
  return result;
};

Function.prototype.myCall2 = function (context) {
  context = context || window;
  const fn = Symbol("fn");
  context[fn] = this;

  let args = [...arguments].slice(1);
  let result = context[fn](...args);
  return result;
};

Function.prototype.myApply = function (context) {
  context = context || window;
  const fn = Symbol("fn");
  context[fn] = this;

  let result;
  if (arguments[1]) {
    if (Array.isArray(arguments[1])) {
      result = context[fn](...arguments[1]);
    } else {
      throw new TypeError("first parameter is not array");
    }
  } else {
    result = context[fn]();
  }

  return result;
};

Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("not is function");
  }
  // 预先设置一些参数
  let args = [...arguments].slice(1);
  let _this = this;
  return function () {
    _this.apply(context, args.concat([...arguments]));
  };
};

// 用于这个构造函数的prototype是否出现在原型链的中的其中一个位置
function myInstanceof(left, right) {
  let left = left.__prototype__;
  let p = right.prototype;
  while (left) {
    if (left === p) {
      return true;
    }
    left = left.__prototype__;
  }
  return false;
}

// 创建一个对象，并且把传入得对象作为原型
// 思路：用new得方式创建得对象，那我们把这个函数得prototype属性设置为入参即可
function myCreate(obj) {
  function f1() {}
  f1.prototype = obj;
  return new f1();
}

// 模拟new关键字创建对象，使用方式： myNew(fun)(arg1, arg2)
function myNew(fn) {
  return function () {
    let obj = {
      __prototype__: fn.prototype,
    };
    ofn.call(obj, ...arguments);
    return obj;
  };
}
function fn(name, age) {
  this.name = name;
  this.age = age;
}
myNew(fn)("wulei", 24); // 使用示例

// 浅拷贝,如果属性值是一个引用，拷贝后的属性值将指向那个应用
let copy1 = { ...{ x: 1 } };
let copy1 = Object.assign({}, { x: 1 });

// 深拷贝
let copy = JSON.parse(JSON.stringify({ x: { y: 1 } }));
// 递归实现深拷贝
function myDeepCopy(obj) {
  let copyObj;
  if (typeof obj === "object") {
    copyObj = obj instanceof Array ? [] : {};
  } else {
    return obj;
  }

  for (const key in obj) {
    const element = obj[key];
    copyObj[i] = typeof element === "object" ? myDeepCopy(element) : element;
  }

  return copyObj;
}
// 广度优先遍历实现深拷贝 用队列实现广度优先，用栈实现深度优先
function cloneDeepOfLoop(obj) {
  let copyObj = {};
  let queue = [];
  let copyQueue = [];
  queue.push(obj);
  copyQueue.push(copyObj);
  // 增加一个标记数组，保存遍历过程中所有的对象,如果发现重复的引用，则用之前的值，一次解决循环引用的问题
  let visitedQueue = [];
  let visitedCopyQueue = [];
  while (queue.length) {
    let element = queue.shift();
    let copyElement = copyQueue.shift();
    visitedQueue.push(element);
    visitedCopyQueue.push(copyElement);
    for (const key in element) {
      const eleValue = element[key];
      if (typeof eleValue === "object") {
        let index = visitedQueue.indexOf(eleValue);
        if (index >= 0) {
          copyElement[key] = visitedCopyQueue[index];
        } else {
          copyElement[key] = {};
          copyQueue.push(copyElement[key]);
          queue.push(eleValue);
        }
      } else {
        copyElement[key] = eleValue;
      }
    }
  }

  return copyObj;
}

// 防抖函数: 在事件被触发n秒后，再执行，且如果n秒内被重复触发，则重新计时
const myDebounceOfSetTimeout = (fn, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    const lastThis = this;
    timer = setTimeout(() => {
      fn.apply(lastThis, args);
    }, delay);
  };
};

const myDebounceOfRequestAnimationFrams = (fn, delay) => {
  let timer = null;
  return (...args) => {
    const time = Date.now();
    cancelAnimationFrame(timer);
    const callback = (timestamp) => {
      if (timestamp - time >= delay) {
        fn.apply(this, args);
      } else {
        timer = requestAnimationFrame(callback);
      }
    };
    timer = requestAnimationFrame(callback);
  };
};

// 节流函数。在n秒内，最多执行一次，后面会被忽略
const throttle = (fn, delay) => {
  let last = 0;
  return function (...args) {
    const lastThis = this;
    let cur = Date.now();
    if (cur - last >= delay) {
      fn.apply(lastThis, args);
      last = cur;
    }
  };
};
