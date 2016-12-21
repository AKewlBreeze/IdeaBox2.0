var storedIdeasTank = localStorage.getItem("storedIdeasArray");
var storedIdeas = [];
var localIdeas = [];
testLoadIdeas();

function testLoadIdeas(){
  if(storedIdeasTank === null ){
    return;
  }
  loadIdeas();
}


function loadIdeas(){
  var parsedObject = JSON.parse(storedIdeasTank);
  for(var i = 0; i < parsedObject.length; i++){
    var cardObject = (parsedObject[i]);
    console.log(cardObject);
    displayIdea(cardObject.title, cardObject.content);
  }
}

$('.save-button').click(function(event) {
  event.preventDefault();
  var id = Date.now();
  var $ideaTitle = $('.idea-title').val();
  var $ideaBody = $('.idea-body').val();
  var userIdeas = {title: $ideaTitle, content: $ideaBody, id: id};
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
  var ideaToDelete = $(this).closest('.idea-render');
  ideaToDelete.remove();
  // deleteIdeaFromStorage();
});

// function deleteIdeaFromStorage(id, index) {
//   for (var i = 0; i < userIdeas.length; i++) {
//     if (userIdeas[i].id === parseInt(id)) {
//       userIdeas.splice(i, 1);
//     }
//     localStorage.setItem("storedIdeasArray", stringifiedIdeas);
//   }
// }

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
