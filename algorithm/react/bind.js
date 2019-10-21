class Component {
  constructor(props = {}) {
    this.props = props;
  }

  setState(state) {
    const oldEl = this.el;
    this.state = state;
    this.el = this._renderDom();
    if (this.onStateChange) this.onStateChange(oldEl, this.el);
  }

  _renderDom() {
    this.el = createDomFromString(this.render());
    if (this.changeLikeText) {
      this.el.addEventListener('click', this.changeLikeText.bind(this));
    }

    return this.el;
  }
}

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false
    };
  }

  changeLikeText() {
    this.setState({
      isLike: !this.state.isLike
    });
  }

  render() {
    return `
      <button style="background-color: ${this.props.bgColor}">
        <span class="text">${this.state.isLike ? '取消' : '点赞'}</span>
        <span>👍</span>
      </button>
    `;
  }
}

const mount = (component, wrapper) => {
  wrapper.appendChild(component._renderDom());
  component.onStateChange = (oldEl, newEl) => {
    wrapper.replaceChild(newEl, oldEl);
  };
};

function createDomFromString(domString) {
  const div = document.createElement('div');
  div.innerHTML = domString;
  return div;
}

const wrapper = document.querySelector('.wrapper');
mount(new LikeButton({ bgColor: '#9999' }), wrapper);
