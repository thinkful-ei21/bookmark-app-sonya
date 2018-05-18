'use strict';
/* global api store bookmarkList*/ 



$(document).ready(function() {

  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getBookmarks(console.log('hi sunny!'));
}
  
);