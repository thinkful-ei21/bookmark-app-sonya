'use strict';
/* global api store */

const bookmarkList = (function() {

  //delete bookmark when delete button is clicked
  function handleDeleteButton() {
    $('.js-bookmark-list').on('click', ('.js-bookmark-delete'), event => {
      const id = getIdFromElement(event.currentTarget);
      const bookmark = getBookmarkInfoFromId(id);
      store.deleteBookmark(bookmark);
      render();
    });
  }
  
  //find an bookmark info by it's id
  function getIdFromElement(element) {
    return $(element)
      .closest('.bookmark')
      .data('item-id');
  }

  function getBookmarkInfoFromId(id) {
    return store.bookmarks.find(bookmark => bookmark.id === id);
  }

  //toggles between showing and hiding description and url of bookmark
  // when show more checkbox is checked
  function addIdToShowMoreArray(id) {
    store.showMore.push(id);
  }

  function removeIdFromShowMoreArray(id) {
    const idIndex = store.showMore.indexOf(id);
    store.showMore.splice(idIndex, 1);
  }

  function handleShowMoreCheckbox() {
    $('.js-bookmark-list').on('click', '.js-show-more-checkbox', (event) => {
      const id = getIdFromElement(event.currentTarget);
      addIdToShowMoreArray(id);
      render();
      
    });
  }

  function handleShowLessCheckbox() {
    $('.js-bookmark-list').on('click', '.js-show-less-checkbox', (event) => {
      const id = getIdFromElement(event.currentTarget);
      getBookmarkInfoFromId(id);
      removeIdFromShowMoreArray(id);
      render();
    });
  }
  
  //renders the page
  const generateBookmarkElement = function(bookmark) {
   
    let htmlElement = '';
    htmlElement += ` <li class="bookmark" data-item-id="${bookmark.id}">
    <p class="title">${bookmark.title}</p>`;
    
    if (store.showMore.includes(bookmark.id)) {
      htmlElement += `<a href="${bookmark.url}">Visit Website</a>
      <p class="bookmark-description">${bookmark.desc}</p>
      <span class="rating-info">${bookmark.rating}</span><br>
    <form class="item-edit-form">
      <div class="bookmark-controls">
        <label for="show-less-checkbox">Show less</label>
        <input type="checkbox" name="show-less-checkbox" class="js-show-less-checkbox show-less-check-box"><br>
        <button class="js-bookmark-delete" "bookmark-delete">
          <span class="button-label">Delete</span>
        </button>
      </div>
  </li>`;
    } else {
      htmlElement += `<span class="rating-info">${bookmark.rating}</span><br>
    <form class="item-edit-form">
      <div class="bookmark-controls">
        <label for="show-more-checkbox">Show More</label>
        <input type="checkbox" name="show-more-checkbox" class="js-show-more-checkbox show-more-check-box"><br>
        <button class="js-bookmark-delete" "bookmark-delete">
          <span class="button-label">Delete</span>
        </button>
      </div>
  </li>`;
    }

    return htmlElement;
  };
  


  function generateBookmarkString(array) {
    return array.map(bookmark => generateBookmarkElement(bookmark)).join('');
  }

  function render() {
    let bookmarkArray = store.bookmarks;
    const bookmarkString = generateBookmarkString(bookmarkArray);
    $('.js-bookmark-list').html(bookmarkString);
    console.log('render ran');
  }

  //validates new bookmark entries and adds them to the database
  function formValidation() {
    return ($('.js-title-entry').val() && $('.js-url-entry').val());
  }


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
            store.addBookmarks(newBookmark);
            render();
          },
          (err) => {
            ('.error-container').html('There seems to be a problem with the server.  Please try again.');
            console.log(err);
            store.setError(err);
            render();
          }
        );
      }
    });
  }

  function bindEventListeners() {
    //calls all event listeners on the page when it loads
    handleNewBookmarkSubmit();
    handleDeleteButton();
    handleShowMoreCheckbox();
    handleShowLessCheckbox();
    // handleFilterSelector();

  }

  return{
    render,
    bindEventListeners,
  };

}());