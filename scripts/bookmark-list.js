'use strict';
/* global api store */

const bookmarkList = (function() {
  //translate api error message to be more user friendly
  const generateBookmarkElement = function(bookmark) {
    return ` <li class="bookmark">
    <p class="title">${bookmark.title}</p>
    <span class="rating-info">${bookmark.rating}</span><br>
    <form class="item-edit-form">
      <div class="bookmark-controls">
        <label for="show-more-checkbox">Show More</label>
        <input type="checkbox" name="show-more-checkbox" class="js-show-more-checkbox show-more-check-box"><br>
        <button class="js-bookmark-delete" "bookmark-delete">
          <span class="button-label">Delete</span>
        </button>
      </div>
  </li>`;
  };

  const generateBookmarkString = function(array) {
    return array.map(bookmark => generateBookmarkElement(bookmark)).join('');
  };

  const render = function() {
    let bookmarkArray = store.bookmarks;
    const bookmarkString = generateBookmarkString(bookmarkArray);
    $('.js-bookmark-list').html(bookmarkString);
    console.log('render ran');
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