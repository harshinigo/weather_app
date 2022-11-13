let weather = {
  apiKey: "20957daa73739ee04a5f325baf22699d",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://source.unsplash.com/1600x900/?" +
      name +
      "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

//fetching news data from a website providing api
let news = {
  newsApiKey: "54e6adeffe214d468d4772603a7eea6a",
  fetchNews: function (city) {
    fetch(
      "https://newsapi.org/v2/everything?q=" +
        city +
        "&apiKey=" +
        this.newsApiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No News found.");
          throw new Error("No News found.");
        }
        return response.json();
      })
      .then((data) => this.displayNews(data));
  },

  displayNews: function (data) {
    console.log(data.articles[2]);

    for (let i = 0; i <= 2; i++) {
      // "title = " + data.articles[i].title,
      // "urlToImage = " + data.articles[i].urlToImage,
      // "description = " + data.articles[i].description,
      // "url = " + data.articles[i].url + "</br>"
      let li = document.createElement("li");
      let a = document.createElement("a");
      let h1 = document.createElement("h1");
      (document.querySelector(".title").innerText = data.articles[0].title),
        (document.querySelector(".image").src = data.articles[0].urlToImage),
        (document.querySelector(".information").innerText =
          data.articles[0].description),
        (document.querySelector(".url").href = data.articles[0].url);

      // text += cars[i] + "<br>";
    }

    // document.querySelector(".title").innerText = data.articles[0].title;
    // document.querySelector(".image").src = data.articles[0].urlToImage;
    // document.querySelector(".information").innerText =
    //   data.articles[0].description;
    // document.querySelector(".url").href = data.articles[0].url;
  },
  search: function () {
    this.fetchNews(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("brisbane");
news.fetchNews("brisbane");
