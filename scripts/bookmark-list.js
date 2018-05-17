'use strict';
/* global api store */

const bookmarkList = (function() {

  const generateBookmarkElement = function() {
    //html template code will be returned
  };

  const handleNewBookmarkSubmit = function() {
   
   
    $('#js-add-item-form').submit(function(event) {
      event.preventDefault();
      const formData = new FormData(this);
      const formDataObject = {};
      formData.forEach(function(value, name) {
        formDataObject[name] = value;
      });
      api.createBookmark(formDataObject, 
        (newBookmark) => {
          store.addItems(newBookmark);
          //render();
        },
        (err) => {
           console.log(err);
           store.setError(err);
          //render();
        }
      );
    });
  };

  const render = function() {
    //take api info and render it to the page
  };

  const bindEventListeners = function() {
    //calls all event listeners on the page when it loads
    handleNewBookmarkSubmit();
    // handleDeleteButton();
    // handleShowMoreCheckbox();
    // handleFilterSelector();

  };

  return{
    render,
    bindEventListeners,
  };

}());