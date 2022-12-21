const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

/////////////////////////////////////
function renderData(data) {
  const HTML = ` <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000000
      ).toFixed(1)}B people</p>
      <p class="country__row"><span>🗣️</span>${data.languages["hin"]}</p>
      <p class="country__row"><span>💰</span>${data.currencies.INR.symbol} ${
    data.currencies.INR.name
  }</p>
    </div>
  </article>
    `;
  countriesContainer.insertAdjacentHTML("beforeend", HTML);
  countriesContainer.style.opacity = 1;
}
getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  // request.open("GET", "https://restcountries.com/v3.1/name/india");

  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderData(data);
  });
};

getCountryData("india");

//callback hell
// setTimeout(function () {
//   let c = 0;
//   c++;
//   console.log(c);
//   setTimeout(function () {
//     c++;
//     console.log(c);
//     setTimeout(function () {
//       c++;
//       console.log(c);
//       setTimeout(function () {
//         c++;
//         console.log(c);
//         setTimeout(function () {
//           c++;
//           console.log(c);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
