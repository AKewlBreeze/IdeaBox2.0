var storedIdeasTank = localStorage.getItem("storedIdeasArray");
var storedIdeas = localStorage.getItem("storedIdeasArray") || [];
testLoadIdeas();

function testLoadIdeas(){
  if(storedIdeasTank === null ){
  } else {
    loadIdeas();
  }
}


function loadIdeas(){

  var parsedObject = JSON.parse(storedIdeasTank);
  for(var ideasCount = 0; ideasCount < parsedObject.length; ideasCount++){

    var cardObject = (parsedObject[ideasCount]);
    displayIdea(cardObject.title, cardObject.content, cardObject.id);
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
  displayIdea($ideaTitle, $ideaBody, id);
  clearIdeaInputs();
  });

// <div id="an-ID" class="some-descriptor"></div>
// <div id="an-ID2" class="some-descriptor"></div>
// $(".some-descriptor") // all elements with this class
// $("#an-ID") // element with the id="an-ID"

// const myName = () => 'Tae';
// const introduction = `Hello World, ${myName()} am here.`
function displayIdea ($ideaTitle, $ideaBody, id) {

  $('.idea-section').prepend(`<div class ="idea-render" id="${id}" >
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
  var id = $(this).parents('.idea-render').attr('id');
  deleteFromStorage(id);
  $(this).closest('.idea-render').remove();
});

// find a path to pass in the id or perhaps set as a global variable

function deleteFromStorage(id){
  // console.log("storedIdeasArray");
  // localStorage.removeItem('storedIdeasArray');
  console.log(storedIdeas);
  // storedIdeas.forEach(function(idea){
  //   console.log(idea);
  // });
   for (var ideasCount = 0; ideasCount < storedIdeas.length;  ideasCount++){
     console.log("help");
     storedIdeas.splice(ideasCount, 1);
    }
  }
// if (id == storedIdeas[ideasCount].id)

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
