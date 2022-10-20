function favGet(url) {
  let fav = "http://www.google.com/s2/favicons?domain=" + url;
  return fav;
}

function doSearch(engine, term) {
  let result = engine+term;
  window.open(result, 'blank');
}

function searchHandler(field) {
    if (field.value.length > 0) {
      doSearch("https://www.google.com/search?q=", field.value);
    }
}

let searchButton = document.querySelector("#id_search_button");
let searchField = document.querySelector("#id_search_field");

searchButton.addEventListener('click', function() {
  searchHandler(searchField);
});

searchField.addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    searchHandler(searchField);
  }
});

fetch ("./links.json")
    .then((res) => res.json())
    .then((data) => {
      let buttons = document.querySelectorAll(".links-area .links-button .links-img");
      for (i=0; i <buttons.length; i++) {
        buttons[i].src = favGet(data[i].url);
      }
    });

fetch ("./settings.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.showTitle);
    let title = document.getElementById("id_logo_title");
    let logo = document.getElementById("id_logo_img");
    if (data.showTitle == true) {
      title.style.display = "block";
      title.innerHTML = data.titleText;
    } else {
      title.style.display = "none";
    }
    if (data.showLogo == true) {
      logo.style.display = "block";
      logo.src = data.logoUrl;
      if (data.showTitle == false) {
        logo.className += " no-title";
      }
    }
  });
    
