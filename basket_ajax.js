$(document).ready(function() {


//---chiamata ajax al click del bottone------
$('.my_button').click(function() {
  $.ajax({
    url: 'https://www.boolean.careers/api/random/int',
    type: 'GET',
    // data: {
    //   n: userInput,
    // },
    success: function(data) {
      console.log("success");
      //handlebars-----
      var template_base = $('#my-template').html();
      var template = Handlebars.compile(template_base);

      var context = {
        codice: gioc.codice,
      };

      var html = template(context);

      $('.sidebar').append(html)
      //-------------
      //al clicl sui codici nella lista, faccio saltare fuori i valori del giocatore sulla destra.
      $('.entry h1').click(function(event) {
        var code = $(this).text()
        $('.title h1').text('Player code: '  + code)

        for (var i = 0; i < giocatori.length; i++) {
          var gioc = giocatori[i];
          if (code == gioc['codice'] || code == gioc['codice'].toLowerCase()) {
            // scelto.push(gioc)
            var mioGioc = gioc;
            console.log(mioGioc);

            //handlebars------
            var template_base = $('#my-template-2').html();
            var template = Handlebars.compile(template_base);

            var html_2 = template(mioGioc);
            console.log(html_2);

            $('.contMail .entry').hide();
            $('.contMail').append(html_2)

            //-------------
          }
        }
      });
    },
    error: function() {
      console.log("error");
    }
  })
});

});