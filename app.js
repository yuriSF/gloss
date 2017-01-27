var wordPairs = [];
function getDataFromApi(searchTerm, pair) {
  var results = '';
  var settings = {
    url: `https://translate.yandex.net/api/v1.5/tr.json/translate`,
     data: {
       key: 'trnsl.1.1.20170124T063730Z.ba0af33eb008c674.9b6e2bff891ea669f192cb9237e80c1b13386c5c',
       text: searchTerm,
       lang: pair
     },
    text: searchTerm,
    dataType: 'json',
    type: 'GET',
    async: false,
    success: function displayData(data) {
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
    $(".glossed-output").html('<img id="loader" src="http://www.ppimusic.ie/images/loading_anim.gif" ');
    const userInput = $('#text-input').val();
    let fromLang = $('#from').val();
    let toLang = $('#to').val();

    if (fromLang === 'from' || toLang === 'to') {
      console.log('error')
      $("form").append("Did you select a language pair?");
    }

    var words = tokenize(userInput);
    var languagePair = fromLang+'-'+toLang
    console.log(languagePair)
    for (i=0; i<words.length; i++) {
      searchTerm = words[i];
      superWord = searchTerm;
      getDataFromApi(words[i], languagePair)
    }

    $(".glossed-output").html("<p class='instructions'>Here's your glossed text.<br>Hover over a word to see the gloss.</p>");
    for (i=0; i<wordPairs.length; i++) {
      $(".glossed-output").append(`<div class="tooltip">` + wordPairs[i][0] +
                                  `<span class="tooltiptext">` +  wordPairs[i][1] + `</span></div>`);
      $(".glossed-output").append("\u00A0");
    }
  })
