import React from "react";

function ReactAutolinkMixin() {
  let regex = /https?:\/\/[^\s]+/;

  return {
    autolink(str, options = {}, bufs = []) {
      var result = regex.exec(str);
      if (result) {
        bufs.push(str.substr(0, result.index));
        bufs.push(<a href={result[0]} {...options}>{result[0]}</a>);
        return this.autolink(str.substr(result.index + result[0].length), options, bufs);
      } else {
        bufs.push(str);
        return bufs;
      }
    },
  };
}

export default ReactAutolinkMixin();
