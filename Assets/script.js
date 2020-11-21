function displayUV(lat, lon) {
  // coordinateURL and API call to get UV index
  var coordinateURL =
    "https://api.openweathermap.org/data/2.5/uvi?&lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=08e3e4884b6270c711b75942bc9a3d03";
  $.ajax({
    url: coordinateURL,
    method: "GET",
  }).then(function (response) {
    // display UV 
    var uv = response.value;
    $("#index").text('UV index: '+ uv);

    if (uv < 3) {
      $("#index").attr("style", "background-color:#00CACD");
    } else if (uv < 5) {
      $("#index").attr("style", "background-color:#008F00");
    } else if (uv < 7) {
      $("#index").attr("style", "background-color:#CD5600");
    } else if (uv < 10) {
      $("#index").attr("style", "background-color:#D01E00");
    } else {
      $("#index").attr("style", "background-color:#E361B4");
    }
  });
}
function displayFiveDay(cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=08e3e4884b6270c711b75942bc9a3d03";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //get dates
    var date1 = response.list[5].dt_txt.slice(0, 10);
    var date2 = response.list[11].dt_txt.slice(0, 10);
    var date3 = response.list[19].dt_txt.slice(0, 10);
    var date4 = response.list[29].dt_txt.slice(0, 10);
    var date5 = response.list[35].dt_txt.slice(0, 10);
    var dates = [date1, date2, date3, date4, date5];
    // //get icons
    var icon1 = response.list[5].weather[0].icon;
    var icon2 = response.list[8].weather[0].icon;
    var icon3 = response.list[20].weather[0].icon;
    var icon4 = response.list[30].weather[0].icon;
    var icon5 = response.list[34].weather[0].icon;
    var icons = [icon1, icon2, icon3, icon4, icon5];
    // //get temps
    var temp1 = ((response.list[5].main.temp - 273.15) * 1.8 + 32).toFixed(2);
    var temp2 = ((response.list[8].main.temp - 273.15) * 1.8 + 32).toFixed(2);
    var temp3 = ((response.list[20].main.temp - 273.15) * 1.8 + 32).toFixed(2);
    var temp4 = ((response.list[30].main.temp - 273.15) * 1.8 + 32).toFixed(2);
    var temp5 = ((response.list[34].main.temp - 273.15) * 1.8 + 32).toFixed(2);
    var temps = [temp1, temp2, temp3, temp4, temp5];

    // //get humib
    var humidity1 = response.list[5].main.humidity;
    var humidit2 = response.list[10].main.humidity;
    var humidity3 = response.list[21].main.humidity;
    var humidity4 = response.list[26].main.humidity;
    var humidity5 = response.list[35].main.humidity;
    var humidities = [humidity1, humidit2, humidity3, humidity4, humidity5];

    //for loop to creat the 5 boxes
    // for(var i = 0; i<5;i++){
    //   var box = $('<div>').addClass('box');
    //   var boxBody = $('<div>').addClass('box_body');
    //   boxBody.attr( 'id', i);
    //   boxBody.append(box);
    //   box.append('.box_container');
    // }
    for (var i = 0; i < 5; i++) {
      $("#" + i).empty();
    }
    //for loop to append to the 5 day box

    for (var i = 0; i < 5; i++) {
      var dispDate = $("<p2>").addClass("item");
      dispDate.text(dates[i]);
      $("#" + i).append(dispDate);

      var dispIcon = $("<img>").addClass("item");
      dispIcon.attr(
        "src",
        "http://openweathermap.org/img/wn/" + icons[i] + ".png"
      );
      $("#" + i).append(dispIcon);

      var dispTemp = $("<p2>").addClass("item");
      dispTemp.text("Temp: " + temps[i]);
      $("#" + i).append(dispTemp);

      var dispHumidity = $("<p2>").addClass("item");
      dispHumidity.text("Humidity: " + humidities[i]);
      $("#" + i).append(dispHumidity);
    }
  });
}
function displayCurrentWeather(cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=08e3e4884b6270c711b75942bc9a3d03";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var cityName = response.name;
    var temp = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    var windSpeed = response.wind.speed;
    var humidity = response.main.humidity;
    $(".place").text(cityName);
    $(".temperature").text("Temperature: " + temp + " F");
    $(".humidity").text("Humidity: " + humidity + "%");
    $(".wind").text("Wind Speed: " + windSpeed + " MPH");
    displayUV(response.coord.lat, response.coord.lon);
    $("#userInput").val("");
  });
}
$("#search").on("click", function (e) {
  e.preventDefault();
  if (!$("#userInput").val()) {
    return alert("you need to search something");
  }
  var userInput = $("#userInput").val();
  displayCurrentWeather(userInput);
  displayFiveDay(userInput);
  displayCurrentWeather()
});
