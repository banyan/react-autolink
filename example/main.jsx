import "babel-core/polyfill";
import React from "react";
import ReactAutolinkMixin from "../src/react-autolink";

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
        <div>{ this.autolink(this.props.text) }</div>
        <div>{ this.autolink(this.props.text, { target: "_blank", rel: "nofollow" }) }</div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
