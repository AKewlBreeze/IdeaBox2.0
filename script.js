function createIdea (title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality;
}

$(submitButton).click(function() {
  -stringify createIdea;
  -send createIdea to storage;
  -run renderCard function(createIdea);
})

function renderCard(){
  add object properties to html stuff and prepend to DOM element;
}
