'use strict';
/* global api store bookmarkList*/ 



$(document).ready(function() {

  bookmarkList.bindEventListeners();
  api.getBookmarks((bookmarkData) => {
    bookmarkData.forEach((bookmark) => store.addBookmarks(bookmark));
    bookmarkList.render();
  });
  
});