$(document).ready(function() {
  retrieveIdea();
});


jQuery(document).ready(function($){

$('.idea-section').each(function(){
$(this).attr('data-search-term', $(this).text().toLowerCase());
});

$('.search-input').on('keyup', function(){
console.log("yelp");
var searchTerm = $(this).val().toLowerCase();

    $('.idea-section').each(function(){

        if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });

});

});
  

// $(document).ready(function() {
//     $('.search-input').keyup(function() {
//       console.log("yelp");
//         var filter = $(this).val(),
//             count = 0;
//         $('.idea-section').each(function() {
//             if ($(this).text().search(new RegExp(filter, "i")) < 0) {
//                 $(this).hide();
//             } else {
//                 $(this).show();
//                 count++;
//             }
//         });
//     });
// });






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
  clearInputs();
})

function clearInputs() {
  $('.idea-title').val('');
  $('.idea-body').val('');
}



function storeIdea(ideaToStore) {
  var ideaID = ideaToStore.id;
  var stringIdea = JSON.stringify(ideaToStore);
  localStorage.setItem(ideaID, stringIdea);
}

function retrieveIdea() {
  $('.idea-render').remove();
  for(var key in localStorage) {
    var parsedIdea = JSON.parse(localStorage[key]);
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
  localStorage.removeItem(targetID);
  retrieveIdea();
})


$('.idea-section').on('click', '.upvote', function() {
  var targetID = $(this).closest('.idea-render').attr('id');
  var targetIdea = JSON.parse(localStorage.getItem(targetID));
  if (targetIdea.quality === 'swill'){
    targetIdea.quality = 'plausible';
  } else if (targetIdea.quality === 'plausible'){
    targetIdea.quality = 'genius';
  }
  var upVotedIdea = JSON.stringify(targetIdea);
  localStorage.setItem(targetID, upVotedIdea);
  retrieveIdea();
})

$('.idea-section').on('click', '.downvote', function() {
  var targetID = $(this).closest('.idea-render').attr('id');
  var targetIdea = JSON.parse(localStorage.getItem(targetID));
  if (targetIdea.quality === 'genius'){
    targetIdea.quality = 'plausible';
  } else if (targetIdea.quality === 'plausible'){
    targetIdea.quality = 'swill';
  }
  var upVotedIdea = JSON.stringify(targetIdea);
  localStorage.setItem(targetID, upVotedIdea);
  retrieveIdea();
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
