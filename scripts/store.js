'use strict';
const store = (function() {

  const addItems = function (newBookmark) {
    this.store.push(newBookmark);
  };



  return {
    store: [],
    addItems,

  };

}());