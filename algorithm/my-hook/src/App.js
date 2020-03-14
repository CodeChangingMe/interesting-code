import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

let state;
function useState(initialValue) {
  state = state || initialValue;
  function setState(newState) {
    state = newState;
    render();
  }
  return [state, setState];
}

let deps;
function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const hashChangeDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;
  // 有依赖改变或者没有依赖时
  if (hashChangeDeps || hasNoDeps) {
    callback();
    deps = depArray;
  }
}

// 还可以通过一个全局的数组来存储多个state和deps。
// 实际实现是，使用单链表实现的。组件树种的每一个组件都有各自的hooks的数据，存储在节点上，伴随着节点的出生和死亡。

function App() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log(count);
  }, [count]);
  return (
    <div className="App">
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        点击
      </button>
    </div>
  );
}

export default App;
