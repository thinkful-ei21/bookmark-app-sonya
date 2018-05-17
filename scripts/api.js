'use strict';


const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sonya/bookmarks';
  
  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  const createBookmark = function(newData, onSuccess, onError) {
    const dataJSON = JSON.stringify(newData);
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: dataJSON,
      success: onSuccess,
      error: onError,
    });
  };

  return {
    getBookmarks,
    createBookmark,
  };

}());