function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return;
  console.log('render app');
  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}

function renderTitle(newTitle, oldTitle) {
  if (newTitle === oldTitle) return; // 避免不必要的渲染
  console.log('render title');
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}

function renderContent(newContent, oldContent) {
  if (newContent === oldContent) return;
  console.log('render content');
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}

// 这就是reducer
// 纯函数，每次有action，都会换回一个新的对象
function reducer(state, action) {
  if (!state) {
    // 初始化state
    return {
      title: {
        text: 'React.js 小书',
        color: 'red'
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    };
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      };
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      };
    default:
      return state;
  }
}

function createStore(reducer) {
  const listeners = [];
  let state = null;
  const getState = () => state;
  // 利用发布订阅模式来达到更新数据时，自动更新
  const subscribe = listener => listeners.push(listener);
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  dispatch(); // 初始化state
  return { getState, dispatch, subscribe };
}

const store = createStore(reducer);
let oldState = store.getState();
store.subscribe(() => {
  let newState = store.getState();
  renderApp(newState, oldState);
  oldState = newState;
});

renderApp(store.getState());
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }); // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }); //
