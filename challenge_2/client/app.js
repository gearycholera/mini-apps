var output = '';

$(document).ready(function() {
  $('form').on('submit', function(e) {
    var words = $('#json').val();
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:3000',
      data: {input: words},
      success: function(result) {
        $("#csv").html("");
        output = JSON.parse(result);
        //output = output.replace(/\n/g, "<br />");
        $("#csv").html(output);
      },
      error: function() {
        console.log('error with post')
      }
    })
  })
})

