const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
///Add features button click more neighbor
/////////////////////////////////////
function renderData(data, cl = "") {
  console.log(data);
  const HTML = ` <article class="country ${cl}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000000
      ).toFixed(1)}B people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].symbol} ${
    data.currencies[0].name
  }</p>
    </div>
  </article>
    `;
  countriesContainer.insertAdjacentHTML("beforeend", HTML);
}

let clicked = 0;
////Using Fetch option
const renderErorr = function (msg) {
  countriesContainer.insertAdjacentHTML("beforebegin", msg);
};

const getJSON = function (url) {
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`contry not found ${response.status}`);
    }
    return response.json();
  });
};
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`)
    .then((data) => {
      renderData(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) {
        throw new Error(`Neighbor not found`);
      }

      getJSON(`https://restcountries.com/v2/name/${neighbor}`);
    })

    .then((data) => renderData(data[0], "neighbour"))
    .catch((err) => {
      renderErorr(`Something wrong ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
      ++clicked;
    });
};
btn.addEventListener("click", function (e) {
  getCountryData("bharat");
});

///////////////////
// getCountryData("pakistan");
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

// const getJSON = function (url) {
//     fetch(url).then((response) => {
//       if (!response.ok) {
//         throw new Error(`contry not found ${response.status}`);
//       }
//       return response.json();
//     });
//   };
//   const getCountryData = function (country) {
//     //   const request = fetch(`https://restcountries.com/v2/name/${country}`)
//     //     .then((response) => {
//     //       if (!response.ok) {
//     //         throw new Error(`contry not found ${response.status}`);
//     //       }
//     //       return response.json();
//     //     })
//     getJSON(`https://restcountries.com/v2/name/${country}`)
//       .then((data) => {
//         if (!clicked) renderData(data[0]);
//         const neighbor = data[0].borders[0];
//         if (!neighbor) {
//           throw new Error(`Neighbor not found`);
//         }
//         //   return fetch(`https://restcountries.com/v2/name/${neighbor}`);
//         getJSON(`https://restcountries.com/v2/name/${neighbor}`);
//       })
//       // .then((resp) => resp.json())
//       .then((data) => renderData(data[0], "neighbour"))
//       .catch((err) => {
//         renderErorr(`Something wrong ${err.message}`);
//       })
//       .finally(() => {
//         countriesContainer.style.opacity = 1;
//         ++clicked;
//       });
// getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   // request.open("GET", "https://restcountries.com/v3.1/name/india");

//   request.send();
//   request.addEventListener("load", function () {
//     // console.log(this);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderData(data);
//   });
// };

// getCountryData("india");
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   // request.open("GET", "https://restcountries.com/v3.1/name/india");
