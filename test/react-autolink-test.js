import React from "react/addons";
let { TestUtils } = React.addons;

import ReactAutolinkMixin from "../src/react-autolink";

let SampleComponent = React.createClass({
  getDefaultProps: function () {
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
        <span>{ this.autolink(this.props.text, { target: "_blank", rel: "nofollow" }) }</span>;
      </div>
    );
  }
});

describe("ReactAutolinkMixin", function() {
  it("should render with data props", function() {
    let sampleComponent = TestUtils.renderIntoDocument(<SampleComponent />);

    let spans = TestUtils.scryRenderedDOMComponentsWithTag(sampleComponent, "span");

    expect(spans[0].getDOMNode().innerHTML).to.eq('<span data-reactid=".0.0.0">foo bar baz </span><a href="http://yahoo.co.jp" data-reactid=".0.0.1">http://yahoo.co.jp</a><span data-reactid=".0.0.2">  bar</span>');
    expect(spans[1].getDOMNode().innerHTML).to.eq('<span data-reactid=".0.1.0">foo bar baz </span><a href="http://yahoo.co.jp" target="_blank" rel="nofollow" data-reactid=".0.1.1">http://yahoo.co.jp</a><span data-reactid=".0.1.2">  bar</span>');
  });
});
