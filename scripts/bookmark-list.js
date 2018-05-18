'use strict';
/* global api store */

const bookmarkList = (function() {

  function getIdFromElement(element) {
    return element.data('item-id');
  }

  //these functions render the data in store to the DOM
  function handleShowMoreCheckbox() {
    $('.js-bookmark-list').on('click', '.js-show-more-checkbox', (event) => {
      const id = getIdFromElement(event.currentTarget);
      console.log('did this work?');
      console.log(id);

    });
  }

  
  //translate api error message to be more user friendly
  const generateBookmarkElement = function(bookmark) {
    return ` <li class="bookmark">
    <p class="title data-item-id="${bookmark.id}">${bookmark.title}</p>
    <span class="rating-info">${bookmark.rating}</span><br>
    <form class="item-edit-form">
      <div class="bookmark-controls">
        <label for="show-more-checkbox">Show More</label>
        <input type="checkbox" name="show-more-checkbox" data-item-id="${bookmark.id} class="js-show-more-checkbox show-more-check-box"><br>
        <button class="js-bookmark-delete" "bookmark-delete">
          <span class="button-label">Delete</span>
        </button>
      </div>
  </li>`;
  };


  function generateBookmarkString(array) {
    return array.map(bookmark => generateBookmarkElement(bookmark)).join('');
  };

  function render() {
    let bookmarkArray = store.bookmarks;
    const bookmarkString = generateBookmarkString(bookmarkArray);
    $('.js-bookmark-list').html(bookmarkString);
    console.log('render ran');
  };

//these functions takes new bookmark entries, validates them and sends them to the database
  function formValidation() {
    return ($('.js-title-entry').val() && $('.js-url-entry').val());
  };


  function handleNewBookmarkSubmit() {
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

  function bindEventListeners() {
    //calls all event listeners on the page when it loads
    handleNewBookmarkSubmit();
    // handleDeleteButton();
    handleShowMoreCheckbox();
    // handleFilterSelector();

  }

  return{
    render,
    bindEventListeners,
  };

}());