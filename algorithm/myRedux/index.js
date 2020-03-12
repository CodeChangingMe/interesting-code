// 最简单发布订阅模式的实现
let state = {
  count: 1
};

let listeners = []; // 订阅
function subscribe(fn) {
  listeners.push(fn);
}

function dispatch(count) {
  state.count = count;
  listeners.forEach(fn => {
    //发布
    fn(state.count);
  });
}

// 封装
const createStore = function(reducer, initState = {}) {
  let state = initState;
  let listeners = [];

  function subscribe(params) {
    this.listeners.push(params);
  }

  function dispatch(action) {
    state = reducer(state, action); // 根据action生成新的state
    listeners.forEach(fn => {
      fn(state);
    });
  }

  function getState() {
    return state;
  }

  return {
    getState,
    subscribe,
    dispatch
  };
};

function reducer(state, action) {
  switch (action.type) {
    case 'xxx':
      return {
        ...state,
        count: state.count + 1
      };
    default:
      break;
  }
}

// combinReducers 原理
function combinReducers(reducers) {
  return function combination(state, action) {
    const nextState = {};

    Object.entries(reducers).forEach(([key, reducer]) => {
      const prevState = state[key];
      nextState[key] = reducer(prevState, action);
    });

    return nextState;
  };
}
// combinReducers使用方式
let state = {
  counter: {
    count: 0
  },
  info: {
    name: '前端九部',
    description: '我们都是前端爱好者！'
  }
};
const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});

// 中间件middleWare实现。核心原理，增强dispatch
const store = createStore(reducer);
const next = store.dispatch;
store.dispatch = action => {
  console.log('中间件业务逻辑');
  next(action);
  console.log('中间件业务逻辑');
};
