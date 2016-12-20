var storedIdeas = []

$(document).ready(loadIdeas());

function loadIdeas(){
  var storedIdeas = localStorage.getItem("storedIdeasArray");
  var parsedObject = JSON.parse(storedIdeas);
  for(var ideasCount = 0; ideasCount < parsedObject.length; ideasCount++){
    var cardObject = (parsedObject[ideasCount]);
    console.log(cardObject);
    displayIdea(cardObject.title, cardObject.content);
  }
}

// 1. get title, body and quality from storage
    // - grab content associated with desired key
    // - parse string
    // - loop through array
    // - append results
// 2. set retrieved content in card section

$('.save-button').click(function(event) {
  event.preventDefault();
  var $ideaTitle = $('.idea-title').val();
  var $ideaBody = $('.idea-body').val();
  var userIdeas = {title: $ideaTitle, content: $ideaBody};
  localStorage.setItem("storedIdeasArray",storedIdeas);
  localStorage.getItem("storedIdeasArray");
  storedIdeas.push(userIdeas);
  var stringifiedIdeas= JSON.stringify(storedIdeas);
  localStorage.setItem("storedIdeasArray", stringifiedIdeas);
  displayIdea($ideaTitle, $ideaBody);
  clearIdeaInputs();
  });

function displayIdea ($ideaTitle, $ideaBody) {
  $('.idea-section').prepend(`<div class ="idea-render">
    <h2 class ="title-render" contenteditable="true">${$ideaTitle}</h2>
    <button class="button delete">delete</button>
    <p class = "editable-body" contenteditable="true" >${$ideaBody}</p>
    <button class = "button upvote"></button>
    <button class = "button downvote"></button>
    <span class="quality-text">quality: swill</span>
  </div>`);
}

function clearIdeaInputs() {
  $('.idea-title').val('');
  $('.idea-body').val('');
}

$('.idea-section').on('click', '.delete', function() {
  $(this).closest('.idea-render').remove();
});

$('.idea-section').on('click', '.upvote', function() {
  if ($('.quality-text').html() === 'quality: swill') {
    $('.quality-text').html('quality: plausible');
  } else if ($('.quality-text').html() === 'quality: plausible') {
    $('.quality-text').html('quality: genius');
  }
});

$('.idea-section').on('click', '.downvote', function() {
  if ($('.quality-text').html() === 'quality: genius') {
    $('.quality-text').html('quality: plausible');
  } else if ($('.quality-text').html() === 'quality: plausible') {
    $('.quality-text').html('quality: swill');
  }
});
