'use strict';
/* global api store */

const bookmarkList = (function() {
  //translate api error message to be more user friendly
  const generateBookmarkElement = function() {
    //html template code will be returned
  };

  const formValidation = function() {
    return ($('.js-title-entry').val() && $('.js-url-entry').val());
  };

  const handleNewBookmarkSubmit = function() {
   
    $('#js-add-item-form').submit(function(event) {
      event.preventDefault();
      
      if (!formValidation(this)) {
        $('.error-container').html('Please enter a valid Title and a valid Web Address');
      } else {
        $('.error-container').html('');
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
            ('.error-container').html('There seems to be a problem with the server.  Please try again.');
            console.log(err);
            store.setError(err);
          //render();
          }
        );
      }
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