# react-autolink

[![Circle CI](https://img.shields.io/circleci/project/banyan/react-autolink.svg?style=flat-square)](https://circleci.com/gh/banyan/react-autolink)

>Autolink mixin for React

## Install

```
npm i react-autolink
# or
bower i react-autolink
```

## Usage

```jsx
let App = React.createClass({
  getDefaultProps() {
    return {
      text: "foo bar baz http://yahoo.co.jp  bar",
    };
  },

  mixins: [
    ReactAutolinkMixin
  ],

  render() {
    return (
      <div>
        <span>{ this.autolink(this.props.text) }</span>
        <span>{ this.autolink(this.props.text, { target: "_blank", rel: "nofollow" }) }</span>
      </div>
    );
  }
});
```

## License

MIT
