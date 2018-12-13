$(document).ready(function() {


//---chiamata ajax al click del bottone------
$('.my_button').click(function() {
  var valore = $('.dx-x input').val();
    $.ajax({
    url: 'https://www.boolean.careers/api/array/basket',
    type: 'GET',
    //ho 2 alternative: o scrivere n=valore dopo basket nell url, oppure aggiungere a data qui sotto il n: valore.
    data: {
      n: valore,
    },
    success: function(data) {
      console.log("success");
      //---1---dopo aver generato gli n giocatori, per n volte li appendo nella sidebar
      //handlebars-----
      for (var i = 0; i < valore ; i++) {
      var template_base = $('#my-template').html();
      var template = Handlebars.compile(template_base);

      var context = {
        codice: data.response[i]['playerCode'],
      };
      console.log(data.response[i]['playerCode']);
      //questo qui sopra e' esattamente la posizione del codice giocatore nel DB generato nella API

      var html = template(context);

      $('.sidebar').append(html)
    }
      //-------------
      //---2---al click sui codici nella lista, faccio saltare fuori i valori del giocatore sulla destra.

      $('.entry h1').click(function(event) {
        var code = $(this).text()
        $('.title h1').text('Player code: '  + code)

        for (var i = 0; i < valore; i++) {
          var gioc = data.response[i];
          if (code == data.response[i]['playerCode'] || code == data.response[i]['playerCode'].toLowerCase()) {
            // scelto.push(gioc)
            var mioGioc = gioc;
            console.log(mioGioc);

            //handlebars------
            var template_base = $('#my-template-2').html();
            var template = Handlebars.compile(template_base);

            var html_2 = template(mioGioc);//mioGioc e' un oggetto proprio come 'context' nell altro handlebars qua sopra

            //mioGioc sono i valori delle statistiche (ovvero le proprieta dell oggetto, cioe points, fouls...ecc), proprio
            //per quel particlare giocatore (ovvero quel particolare data.response[i]), che ha proprio
            //il codice che ho cliccato nella sidebar.
            //li vado a richiamare nell html dandogli proprio l esatto nome della singola proprieta( in questo caso appunto
            //points, fouls...ecc)
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
