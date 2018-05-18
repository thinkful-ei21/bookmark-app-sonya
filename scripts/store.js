'use strict';
const store = (function() {

  const addBookmarks = function (newBookmark) {
    this.bookmarks.push(newBookmark);
  };

  const setError = function (err) {
    this.error = err;
  };

  const deleteBookmark = function(bookmark) {
    const bookmarkIndex = store.bookmarks.indexOf(bookmark);
    store.bookmarks.splice(bookmarkIndex, 1);
  };


  return {
    bookmarks: [],
    error: null,
    showMore: [''],
    addBookmarks,
    setError,
    deleteBookmark,
    filterRating: 1,
    

  };

}());