# react-autolink

[![Circle CI](https://img.shields.io/circleci/project/banyan/react-autolink.svg?style=flat-square)](https://circleci.com/gh/banyan/react-autolink)
[![NPM](https://img.shields.io/npm/v/react-autolink.svg?style=flat-square)](https://www.npmjs.com/package/react-autolink)

>Autolink mixin for React

## Install

```shell
npm i react-autolink
# or
bower i react-autolink # `window.ReactAutolink` is available
```

## Usage

```jsx
let App = React.createClass({
  getDefaultProps() {
    return {
      text: "foo bar baz http://example.org bar",
    };
  },

  mixins: [
    ReactAutolink
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

## Development

### Dependency

```
$ npm i
```


### Run

```
$ npm start # => http://0.0.0.0:8080
```

### Test

```
$ npm run test
```

## License

MIT
