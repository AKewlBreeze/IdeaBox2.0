//Will this break at some point? vs document.ready
$(document).ready(function() {
  retrieveIdea();
})


function createIdea (title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality || "swill";
}

$('.save-button').on('click', function(event) {
  event.preventDefault();
  var $ideaTitle = $('.idea-title').val();
  var $ideaBody = $('.idea-body').val();
   var ideaToStore = new createIdea($ideaTitle, $ideaBody);
   storeIdea(ideaToStore);
   retrieveIdea();
})


function storeIdea(ideaToStore) {
  var ideaID = ideaToStore.id;
  var stringIdea = JSON.stringify(ideaToStore);
  localStorage.setItem(ideaID, stringIdea);
}

function retrieveIdea() {
  $('.idea-render').remove();
  for(var key in localStorage) {
    var parsedIdea =JSON.parse(localStorage[key]);
    console.log(parsedIdea);
    renderCard(parsedIdea);
  }
}

function renderCard(parsed) {
  $('.idea-section').prepend(`
    <div id=${parsed.id} class ="idea-render">
    <h2 class ="title-render" contenteditable="true">${parsed.title}</h2>
    <button class="button delete">delete</button>
    <p class = "editable-body" contenteditable="true" >${parsed.body}</p>
    <button class = "button upvote"></button>
    <button class = "button downvote"></button>
    <span class="quality-text">quality: ${parsed.quality}</span>
  </div>`
  )
}

$('.idea-section').on('click', '.delete', function() {
  var targetID = $(this).closest('.idea-render').attr('id');
  
  console.log(targetIdea);
})

//this.parent.attr(id)  // send the ideaToStore to local storage
  // set the ideaToStore.id as the key in localStorage
  // {ideaToStore.id: {title: ideaToStore.title, body: ideaToStore.body, quality: ideaToStore.quality}}
  //array of ids to pull from local storage???










// $(submitButton).click(function() {
//   -stringify createIdea;
//   -send createIdea to storage;
//   -run renderCard function(createIdea);
// })
//
// function renderCard(){
//   add object properties to html stuff and prepend to DOM element;
// }
