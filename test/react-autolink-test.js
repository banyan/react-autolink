import React     from "react";
import ReactDOM  from "react-dom";
import assert    from 'power-assert';
import TestUtils from 'react-addons-test-utils';

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
  let div, sampleComponent, component;
  component = <SampleComponent />;
  div = document.createElement('div');
  sampleComponent = ReactDOM.render(component, div);

  let getLink = (text, options) => {
    ReactDOM.render(<SampleComponent text={text} options={options} />, div);
    return ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "a"));
  };

  let assertNoLink = (text, options) => {
    ReactDOM.render(<SampleComponent text={text} options={options} />, div);
    let link = TestUtils.scryRenderedDOMComponentsWithTag(sampleComponent, "a");
    assert.ok(link.length === 0);
  };

  it("render", () => {
    ReactDOM.render(<SampleComponent text='foo http://example.org' />, div);
    let span = ReactDOM.findDOMNode(TestUtils.scryRenderedDOMComponentsWithTag(sampleComponent, "span")[0]);
    assert.equal(
      span.innerHTML,
      '<span data-reactid=\".0.0.$0\">foo </span><a href=\"http://example.org\" data-reactid=\".0.0.$1\">http://example.org</a><span data-reactid=\".0.0.$2\"></span>'
    );
  });

  context('parsing', () => {
    it("does not convert url with no link like string", () => {
      assertNoLink('foo bar');
    });

    it("does not convert url with no string", () => {
      assertNoLink('');
    });

    it("converts url with link proper url", () => {
      let { textContent, href } = getLink('http://example.org');
      assert.ok(textContent === 'http://example.org');
      assert.ok(href === 'http://example.org/');
    });

    it("converts url with query string", () => {
      let { textContent, href } = getLink('http://example.org?foo=1&bar_baz=2');
      assert.ok(textContent === 'http://example.org?foo=1&bar_baz=2');
      assert.ok(href === 'http://example.org/?foo=1&bar_baz=2');
    });

    it("converts url with image", () => {
      let { textContent, href } = getLink('http://example.org/sample.png');
      assert.ok(textContent === 'http://example.org/sample.png');
      assert.ok(href === 'http://example.org/sample.png');
    });

    it("converts very short urls when scheme is given", () => {
      let { textContent, href } = getLink('http://t.co/Y1cYYJlCXR');
      assert.ok(textContent === 'http://t.co/Y1cYYJlCXR');
      assert.ok(href === 'http://t.co/Y1cYYJlCXR');
    });

    it("does not convert very short urls when scheme is not given", () => {
      assertNoLink('t.co/Y1cYYJlCXR');
    });

    it("does not convert if domain is invalid", () => {
      assertNoLink('http://a..foo');
    });

    it("does not convert if domain is invalid without scheme", () => {
      assertNoLink('a..foo');
    });

    it("does not convert if domain is invalid without scheme", () => {
      assertNoLink('a. foo');
    });

    it("converts url if sub-domain is less than 3 charcters", () => {
      let { textContent, href } = getLink('http://en.wikipedia.org/wiki/Foobar');
      assert.ok(textContent === 'http://en.wikipedia.org/wiki/Foobar');
      assert.ok(href === 'http://en.wikipedia.org/wiki/Foobar');
    });

    it("converts url without scheme", () => {
      let { textContent, href } = getLink('example.org');
      assert.ok(textContent === 'example.org');
      assert.ok(href === 'http://example.org/');
    });

    it("converts ip address with scheme", () => {
      let { textContent, href } = getLink('http://192.168.0.1');
      assert.ok(textContent === 'http://192.168.0.1');
      assert.ok(href === 'http://192.168.0.1/');
    });

    it("converts ip address without scheme", () => {
      let { textContent, href } = getLink('192.168.0.1');
      assert.ok(textContent === '192.168.0.1');
      assert.ok(href === 'http://192.168.0.1/');
    });

    it("converts ip address with scheme and port", () => {
      let { textContent, href } = getLink('http://192.168.0.1:8080');
      assert.ok(textContent === 'http://192.168.0.1:8080');
      assert.ok(href === 'http://192.168.0.1:8080/');
    });

    it("converts ip address without scheme but port", () => {
      let { textContent, href } = getLink('192.168.0.1:443');
      assert.ok(textContent === '192.168.0.1:443');
      assert.ok(href === 'http://192.168.0.1:443/');
    });

    it("converts url with parentheses", () => {
      let { textContent, href } = getLink('http://en.wikipedia.org/wiki/Ostrich_(disambiguation)');
      assert.ok(textContent === 'http://en.wikipedia.org/wiki/Ostrich_(disambiguation)');
      assert.ok(href === 'http://en.wikipedia.org/wiki/Ostrich_(disambiguation)');
    });

    it("converts url with dash", () => {
      let { textContent, href } = getLink('http://example.org/foo-bar');
      assert.ok(textContent === 'http://example.org/foo-bar');
      assert.ok(href === 'http://example.org/foo-bar');
    });
  });

  context('other cases', () => {
    it("converts url if 2 urls are given", () => {
      ReactDOM.render(<SampleComponent text='example.org bar example.com baz' />, div);
      let links = TestUtils.scryRenderedDOMComponentsWithTag(sampleComponent, "a");
      assert.ok(links.length === 2);
    });

    it("provides keys to links", () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(<SampleComponent text='example.org bar example.com baz' />);
      component = shallowRenderer.getRenderOutput();

      assert(component.props.children.props.children.every((child) => child.key))
    });

    it("has attributes when options are given", () => {
      ReactDOM.render(<SampleComponent text='example.org' options={{target: "_blank", rel: "nofollow"}} />, div);
      let link = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(sampleComponent, "a"));
      assert.ok(link.target === '_blank');
      assert.ok(link.rel === 'nofollow');
    });
  });
});
