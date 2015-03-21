import React  from "react/addons";
import assert from 'power-assert';
const {TestUtils} = React.addons;

import ReactAutolinkMixin from "../src/react-autolink";

let SampleComponent = React.createClass({
  getDefaultProps() {
    return {
      options: {}
    };
  },

  mixins: [
    ReactAutolinkMixin
  ],

  render() {
    return (
      <div>
        <span>{ this.autolink(this.props.text, this.props.options) }</span>
      </div>
    );
  }
});

describe("ReactAutolinkMixin", () => {
  let sampleComponent = TestUtils.renderIntoDocument(<SampleComponent />);

  it("renders", () => {
    sampleComponent.setProps({text: 'foo http://example.org'});
    let span = TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "span");
    assert.equal(
      span.getDOMNode().innerHTML,
      '<span data-reactid=\".0.0.0\">foo </span><a href=\"http://example.org\" data-reactid=\".0.0.1\">http://example.org</a><span data-reactid=\".0.0.2\"></span>'
    );
  });

  context('parsing', () => {
      it("does not convert url with no link like string", () => {
      sampleComponent.setProps({text: 'foo bar'});
      let link = TestUtils.scryRenderedDOMComponentsWithTag(sampleComponent, "a");
      assert.ok(link.length === 0);
    });

    it("does not convert url with no string", () => {
      sampleComponent.setProps({text: ''});
      let link = TestUtils.scryRenderedDOMComponentsWithTag(sampleComponent, "a");
      assert.ok(link.length === 0);
    });

    it("converts url with link proper url", () => {
      sampleComponent.setProps({text: 'foo http://example.org'});
      let link = TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "a");
      assert.ok(link.getDOMNode().textContent === 'http://example.org');
      assert.ok(link.getDOMNode().href === 'http://example.org/');
    });

    it("converts url with query string", () => {
      sampleComponent.setProps({text: 'foo http://example.org?foo=1&bar_baz=2'});
      let link = TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "a");
      assert.ok(link.getDOMNode().textContent === 'http://example.org?foo=1&bar_baz=2');
      assert.ok(link.getDOMNode().href === 'http://example.org/?foo=1&bar_baz=2');
    });

    it("converts url with image", () => {
      sampleComponent.setProps({text: 'foo http://example.org/sample.png'});
      let link = TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "a");
      assert.ok(link.getDOMNode().textContent === 'http://example.org/sample.png');
      assert.ok(link.getDOMNode().href === 'http://example.org/sample.png');
    });

    it("converts url without scheme", () => {
      sampleComponent.setProps({text: 'example.org bar'});
      let link = TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "a");
      assert.ok(link.getDOMNode().textContent === 'example.org');
      assert.ok(link.getDOMNode().href === 'http://example.org/');
    });

    it("converts url if 2 urls are given", () => {
      sampleComponent.setProps({text: 'example.org bar example.com'});
      let links = TestUtils.scryRenderedDOMComponentsWithTag(sampleComponent, "a");
      assert.ok(links.length === 2);
    });

    it("converts url if url has parentheses", () => {
      sampleComponent.setProps({text: 'example.org bar example.com'});
      let links = TestUtils.scryRenderedDOMComponentsWithTag(sampleComponent, "a");
      assert.ok(links.length === 2);
    });

    it("has attributes when options are given", () => {
      sampleComponent.setProps({text: 'example.org', options: { target: "_blank", rel: "nofollow" }});
      let link = TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "a");
      assert.ok(link.getDOMNode().target === '_blank');
      assert.ok(link.getDOMNode().rel === 'nofollow');
    });
  });
});
