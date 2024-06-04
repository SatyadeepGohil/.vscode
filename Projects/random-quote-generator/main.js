const category = ['love', 'happiness', 'art', 'beauty', 'death', 'dating', 'marriage', 'hope', 'courage', 'anger'];

function randomIndexOfArray() {
    const randomIndex = Math.floor(Math.random() * category.length);
    return category[randomIndex];
}

$(document).ready(function() {
  $('#btn-el').click(function() {
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/quotes?category=' + randomIndexOfArray(),
      headers: { 'X-Api-key': 'hYvhlakb/sNP2K+Sj+hk6Q==S36RxeN1u39dgbm2'},
      contentType: 'application/json',
      success: function(result) {
        $("#quote").text(result[0].quote);
        $("#author").text("by " + result[0].author);
      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });
  });
});
