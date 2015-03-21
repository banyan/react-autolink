import React  from 'react';
import assign from 'object-assign';

function ReactAutolinkMixin() {
  let delimiter = /((?:https?:\/\/)?(?:[a-z0-9][a-z0-9\-]{1,61}[a-z0-9]\.)+[a-z\.]*[a-z]+[a-z0-9.,_\/~#&=;%+?-]*)/ig;

  return {
    autolink(text, options = {}, bufs = []) {
      if (!text) return null;

      return text.split(delimiter).map(word => {
        let match = word.match(delimiter);
        if (match) {
          let url = match[0];
          return React.createElement('a', assign({href: url.startsWith('http') ? url : `http://${url}`}, options), url);
        } else {
          return word;
        }
      });
    }
  };
}

export default ReactAutolinkMixin();
