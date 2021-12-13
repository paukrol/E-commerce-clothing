// console.log(localStorage);

const createNav = () => {
  const nav = document.querySelector(".navbar");

  nav.innerHTML = `
      <div class="nav">
        <img src="img/dark-logo.png" alt="logo" class="brand-logo" />
        <div class="nav-items">
          <form action="" class="search">
            <input
              type="text"
              class="search-box"
              placeholder="Search brand, product"
            />
            <button class="search-btn">Search</button>
          </form>
          <a>
            <img src="img/user.png" alt="" id="user-image" />
            <div class="login-logout-popup hide">
              <p class="account-info">Log in as, name</p>
              <button class="btn" id="user-btn">Log out</button>
            </div>
          </a>
          <a href="/cart.html">
            <img src="img/cart.png" alt="" />
          </a>
        </div>
      </div>
      <ul class="links-container">
        <li class="link-item">
          <a href="#" class="link">Home</a>
        </li>
        <li class="link-item">
          <a href="#" class="link">Women</a>
        </li>
        <li class="link-item">
          <a href="#" class="link">Men</a>
        </li>
        <li class="link-item">
          <a href="#" class="link">Kids</a>
        </li>
        <li class="link-item">
          <a href="#" class="link">Accesories</a>
        </li>
      </ul>
  `;
};

createNav();

// nav popup
const userImageButton = document.querySelector("#user-image");
const userPopUp = document.querySelector(".login-logout-popup");
const popupText = document.querySelector(".account-info");
const actionBtn = document.querySelector("#user-btn");

userImageButton.addEventListener("click", () => {
  userPopUp.classList.toggle("hide");
});

window.onload = () => {
  const data = localStorage.getItem("data");

  const dataBase = JSON.parse(data);
  // console.log(dataBase);

  let userLog;

  if (dataBase) {
    userLog = dataBase.userAcc || null;
    // console.log(userLog);

    if (userLog != null) {
      // means user is logged in
      const findUserInDatabase = dataBase.users.find(
        (el) =>
          el.email === dataBase.userAcc.email &&
          el.password === dataBase.userAcc.password
      );

      const name = findUserInDatabase.name;

      // console.log(name);
      popupText.innerHTML = `
        Log in as, ${name}
    `;

      actionBtn.innerHTML = "Log out";

      actionBtn.addEventListener("click", () => {
        dataBase.userAcc = null;
        dataBase.sellerAcc = null;
        localStorage.setItem("data", JSON.stringify(dataBase));

        location.reload();
        // location.replace("/index.html");
        console.log(dataBase);
      });
      // console.log("👍");
    } else {
      // user is logged out
      console.log(userLog);
      popupText.innerHTML = "Log in to place order";
      actionBtn.innerHTML = "Log in";
      actionBtn.addEventListener("click", () => {
        location.href = "/login.html";
      });
      // location.replace("/login.html");
    }
  } else {
    popupText.innerHTML = "Log in to place order";
    actionBtn.innerHTML = "Log in";
    actionBtn.addEventListener("click", () => {
      location.href = "/login.html";
    });
    // location.replace("/login.html");
  }
};

// search box
const searchBox = document.querySelector(".search-box");
const searchForm = document.querySelector(".search");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("działa");

  console.log(searchBox.value);
  console.log(dataBase);

  if (searchBox.value.length) {
    dataBase.searchValue = searchBox.value;
    localStorage.setItem("data", JSON.stringify(dataBase));

    location.href = "/search.html";
  }
});

// const createProductCards = (data, parent) => {
//   // here parent is for search product
//   let start = '<div class="product-container">';

//   let middle;

//   middle = data
//     .map((product) => {
//       return `
//         <div class="product-card" data-id="${product.productId}">
//           <div class="product-image">
//             <span class="discount-tag">${product.discount}% off</span>
//             <img src="${product.images[0]}" alt="" class="product-thumb" />
//           </div>
//           <div class="product-info">
//             <h2 class="product-brand">${product.des.split(" ")[0]}</h2>
//             <p class="product-short-des">${product.shortDes}</p>
//             <span class="price">$${
//               product.sellPrice
//             }</span><span class="actual-price">$${product.actualPrice}</span>
//           </div>
//         </div>
//     `;
//     })
//     .join("");

//   let end = "</div>";

//   return start + middle + end;
// };

// const createProductSlider = (data, parent, input) => {
//   const slideContainer = document.querySelector(parent);
//   console.log(slideContainer);

//   if (!input) {
//     slideContainer.innerHTML = `
//       <h2 class="heading">Enter in the search and we will find the right product for you 😊</h2>
//     `;
//     return;
//   } else if (
//     !dataBase.allProducts.some((product) => product.tags.includes(input))
//   ) {
//     slideContainer.innerHTML = `
//     <h2 class="heading">Unfortunately, we have not found the product you are looking for 🤔</h2>
//   `;
//     return;
//   }
//   if (slideContainer) {
//     slideContainer.innerHTML = `
//       <h2 class="heading">Search results for <span>${input}</span></h2>
//       ${createProductCards(data)}
//     `;
//   }
// };
