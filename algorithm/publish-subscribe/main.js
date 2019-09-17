class EventTarget {
  constructor() {
    this.listener = {};
  }

  on(type, callback) {
    if (!this.listener[type]) {
      this.listener[type] = [];
    }
    this.listener[type].push(callback);
  }

  trigger(event) {
    const { type } = event;
    if (this.listener[type]) {
      this.listener[type].forEach(fun => {
        fun(event);
        if (fun._once) this.off(type, fun);
      });
    }
  }

  off(type, callback) {
    let listenerOfType = this.listener[type];
    if (!listenerOfType) return;
    const index = listenerOfType.indexOf(callback);
    if (index < 0) return;
    listenerOfType.splice(index, 1); //移除这一个callback
  }

  once(type, callback) {
    callback._once = true;
    this.on(type, callback);
  }
}

function click1(ev) {
  console.log(ev.message + ' click1');
}

function click2(ev) {
  console.log(ev.message + ' click2');
}

const target = new EventTarget();
target.once('click', click1);
target.on('click', click2);
target.off('click', click2);
target.trigger({ type: 'click', message: 'hello' });
target.trigger({ type: 'click', message: 'hello' });
