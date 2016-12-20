// function checkLocalStorage goes here

$('.save-button').click(function(event) {
  event.preventDefault();
  var $ideaTitle = $('.idea-title').val();
  var $ideaBody = $('.idea-body').val();
  displayIdea($ideaTitle, $ideaBody);
  clearIdeaInputs();
  var
  });


function displayIdea ($ideaTitle, $ideaBody) {
  $('.idea-section').prepend(`  <div class ="idea-render">
  <div class = "title-content">
  <h2 class ="title-render" contenteditable="true">${$ideaTitle}</h2>
  <button class="button delete">delete</button>
  <p class = "editable-body" contenteditable="true" >${$ideaBody}</p>
  <p>
  <button class = "button upvote"></button>
  <button class = "button downvote"></button>
  <span class="quality-text">quality:</span>
  </p>
  <hr>
  </div>
  </div>`);
}

function clearIdeaInputs() {
  $('.idea-title').val('');
  $('.idea-body').val('');
}
