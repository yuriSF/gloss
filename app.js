
https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170124T063730Z.ba0af33eb008c674.9b6e2bff891ea669f192cb9237e80c1b13386c5c&text=get&lang=en-ru

  var wordPairs = [];
  function getDataFromApi(searchTerm, pair) {
    var results = '';
    __url =  "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170124T063730Z.ba0af33eb008c674.9b6e2bff891ea669f192cb9237e80c1b13386c5c&text=" + searchTerm + "&lang=" + pair
    console.log(__url)
    var settings = {
      url: __url,
      // data: {
      //    key: 'trnsl.1.1.20170124T063730Z.ba0af33eb008c674.9b6e2bff891ea669f192cb9237e80c1b13386c5c',
      //    text: searchTerm,
      //    lang: pair
      //  },
      // text: searchTerm,
      dataType: 'json',
      type: 'POST',
      async: false,
      success: function displayData(data) {
        console.log(data)
        var temp = [];
        temp.push(searchTerm);
        temp.push(data.text[0]);
        wordPairs.push(temp);
      },
      error: function badData(err) {
        $(".glossed-output").append("Server Error");
      }
    };
    superWord = searchTerm;
    $.ajax(settings);
  }

  function tokenize(userInput) {
    var words = userInput.split(" ")
    return words;
  }
  $(document).on('submit','form', (e)=>{
      e.preventDefault();
      wordPairs = [];
      $('.glossed-output').html('');
      $(".error").hide();
      $(".language-selectors").removeClass("language-box");
      const userInput = $('#text-input').val();
      let fromLang = $('#from').val();
      let toLang = $('#to').val();

      if (fromLang === 'from' || toLang === 'to') {
        $(".error").show();
        $(".language-selectors").addClass("language-box");
      }
      else {
        $('.glossed-output').html('<p class="blink">Processing...</p>');
        var words = tokenize(userInput);
        var languagePair = fromLang+'-'+toLang;
        for (i=0; i<words.length; i++) {
          searchTerm = words[i];
          superWord = searchTerm;
          getDataFromApi(words[i], languagePair)
        }
        $(".glossed-output").html("<p class='instructions'>Processing complete.<br>Hover over a word to see the gloss.</p>");
        for (i=0; i<wordPairs.length; i++) {
          $(".glossed-output").append(`<div class="tooltip">` + wordPairs[i][0] +
                                      `<span class="tooltiptext">` +  wordPairs[i][1] + `</span></div>`);
          $(".glossed-output").append("\u00A0");
        }
      }
    })
