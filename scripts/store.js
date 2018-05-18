'use strict';
const store = (function() {

  const addItems = function (newBookmark) {
    this.store.push(newBookmark);
  };

  const setError = function (err) {
    this.error = err;
  };



  return {
    bookmarks: [{title: 'apples', rating: 'oranges'}],
    error: null,
    addItems,
    setError,

  };

}());