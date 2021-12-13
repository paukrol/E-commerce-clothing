data = localStorage.getItem("data");
// let dataBase;  // juz istnieje w product.js
// let findUserInDatabase; // juz istnieje w product.js

if (data) {
  dataBase = JSON.parse(data);
  console.log(dataBase);

  if (dataBase.userAcc) {
    findUserInDatabase = dataBase.users.find(
      (el) =>
        el.email === dataBase.userAcc.email &&
        el.password === dataBase.userAcc.password
    );
  }

  // dataBase.allProducts.forEach((el) => {
  //   el.tags.forEach((tag, i) => (el.tags[i] = tag.toLowerCase()));
  //   localStorage.setItem("data", JSON.stringify(dataBase));
  // });
}

const setupSlidingEffect = () => {
  const productContainers = [
    ...document.querySelectorAll(".product-container"),
  ];

  const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
  const preBtn = [...document.querySelectorAll(".pre-btn")];

  // console.log(productContainers);
  // console.log(nxtBtn);
  // console.log(preBtn);

  productContainers.forEach((item, i) => {
    const containerDimenstions = item.getBoundingClientRect();
    const containerWidth = containerDimenstions.width;
    // console.log(containerWidth);

    nxtBtn[i].addEventListener("click", () => {
      item.scrollLeft += containerWidth;
      // console.log(item);
    });

    preBtn[i].addEventListener("click", () => {
      item.scrollLeft -= containerWidth;
      // console.log(item);
    });
  });
};

/*
// Gdyby był tylko jeden slajder:
const productContainers = document.querySelector(".product-container");
const nxtBtn = document.querySelector(".nxt-btn");
const preBtn = document.querySelector(".pre-btn");

// console.log(productContainers);
// console.log(nxtBtn);
// console.log(preBtn);
// console.log(productContainers.scrollLeft);

const containerDimenstions = productContainers.getBoundingClientRect();
const containerWidth = containerDimenstions.width;
// console.log(containerWidth);

nxtBtn.addEventListener("click", () => {
  productContainers.scrollLeft += containerWidth;
  // console.log(productContainers.scrollLeft);
});

preBtn.addEventListener("click", () => {
  productContainers.scrollLeft -= containerWidth;
  // console.log(productContainers.scrollLeft);
});
*/

// fetch product cards

// const getProducts = (tag) => {
//   console.log(dataBase);
//   console.log(tag);
//   localStorage.setItem("data", JSON.stringify(dataBase));
// };

// getProducts("white");
const createProductCards = (data, parent) => {
  // here parent is for search product
  let start = '<div class="product-container">';

  let middle;
  // dla product.html
  const productDetails = document.querySelector(".product-details");
  if (productDetails) {
    middle = data
      .filter((product) => {
        return product.productId !== dataBase.userAcc.productToOpen.productId;
      })
      .map((product) => {
        return `<div class="product-card" data-id="${product.productId}">
          <div class="product-image">
            <span class="discount-tag">${product.discount}% off</span>
            <img src="${product.images[0]}" alt="" class="product-thumb" />
          </div>
          <div class="product-info">
            <h2 class="product-brand">${product.des.split(" ")[0]}</h2>
            <p class="product-short-des">${product.shortDes}</p>
            <span class="price">$${
              product.sellPrice
            }</span><span class="actual-price">$${product.actualPrice}</span>
          </div>
        </div>`;
      })
      .join("");
  } else {
    middle = data
      .map((product) => {
        return `
        <div class="product-card" data-id="${product.productId}">
          <div class="product-image">
            <span class="discount-tag">${product.discount}% off</span>
            <img src="${product.images[0]}" alt="" class="product-thumb" />
          </div>
          <div class="product-info">
            <h2 class="product-brand">${product.des.split(" ")[0]}</h2>
            <p class="product-short-des">${product.shortDes}</p>
            <span class="price">$${
              product.sellPrice
            }</span><span class="actual-price">$${product.actualPrice}</span>
          </div>
        </div>
    `;
      })
      .join("");
  }

  let end = "</div>";

  if (parent) {
    const cardContainer = document.querySelector(parent);
    cardContainer.innerHTML = start + middle + end;
  } else {
    return start + middle + end;
  }
};

const createProductSlider = (data, parent, title) => {
  const slideContainer = document.querySelector(parent);
  console.log(slideContainer);

  if (slideContainer) {
    slideContainer.innerHTML = `
      <section class="product">
        <h2 class="product-category">${title}</h2>
        <button class="pre-btn"><img src="img/arrow.png" alt="" /></button>
        <button class="nxt-btn"><img src="img/arrow.png" alt="" /></button>
        ${createProductCards(data)}
      </section>
    `;

    setupSlidingEffect();
  }
};

let productOpen = dataBase.userAcc?.productToOpen;
let tags = productOpen?.tags;
// console.log(tags);

const shortsProducts = dataBase.allProducts.filter((product) =>
  product.tags.includes("shorts")
);
// console.log(shortsProducts);
const tShirtsProducts = dataBase.allProducts.filter((product) =>
  product.tags.includes("t-shirts")
);

const allProducts = dataBase.allProducts.filter((product) =>
  product.tags.some((tag) => tags?.includes(tag))
);

if (document.querySelector(".hero-section")) {
  createProductSlider(shortsProducts, "#shorts-products", "shorts");
  createProductSlider(tShirtsProducts, "#shirts-products", "Women t-shirts");
  createProductSlider(allProducts, "#all-products", "All");
}

document.querySelectorAll(".product").forEach((el) => {
  el.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    // console.log("działa");

    // console.log(card);
    const findProduct = dataBase.allProducts.find(
      (el) => el.productId === card.dataset.id
    );

    // console.log(findProduct);
    dataBase.userAcc.productToOpen = findProduct;

    const productOpen = dataBase.userAcc.productToOpen;
    localStorage.setItem("data", JSON.stringify(dataBase));

    location.href = "/product.html";
  });
});
