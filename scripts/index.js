'use strict';
/* global api store bookmarkList*/ 



$(document).ready(function() {

  bookmarkList.bindEventListeners();
  
  api.getBookmarks(console.log('hi sunny!'));
}
  
);