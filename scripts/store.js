'use strict';
const store = (function() {

  const addBookmarks = function (newBookmark) {
    this.bookmarks.push(newBookmark);
  };

  const setError = function (err) {
    this.error = err;
  };



  return {
    bookmarks: [],
    error: null,
    showMore: [],
    addBookmarks,
    setError,
    

  };

}());