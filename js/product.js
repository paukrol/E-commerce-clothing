const loader = document.querySelector(".loader");

const data = localStorage.getItem("data");
let dataBase;
let findUserInDatabase;

if (data) {
  dataBase = JSON.parse(data);
  console.log(dataBase);
  findUserInDatabase = dataBase.users.find(
    (el) =>
      el.email === dataBase.userAcc.email &&
      el.password === dataBase.userAcc.password
  );
}

const productImages = document.querySelectorAll(".product-image");
const productImageSlide = document.querySelector(".image-slider");

// ---------------- I SPOSÓB ------------------------

// let activeImageSlide = 0;

// productImages.forEach((img) => {
//   img.addEventListener("click", () => {
//     productImages[activeImageSlide].classList.remove("active");

//     img.classList.add("active");

//     productImageSlide.style.backgroundImage = `url('${img.src}')`;
//   });
// });

// ---------------- II SPOSÓB mój ------------------------

productImages.forEach((img) => {
  img.addEventListener("click", () => {
    [...img.parentElement.children].forEach((el) => {
      el.classList.remove("active");
    });

    img.classList.add("active");

    productImageSlide.style.backgroundImage = `url('${img.src}')`;
  });
});

// toggle size buttons

// ---------------- I SPOSÓB ------------------------
// const sizeBtns = document.querySelectorAll(".size-radio-btn");
// let checkedBtn = 0;

// sizeBtns.forEach((item, i) => {
//   item.addEventListener("click", () => {
//     sizeBtns[checkedBtn].classList.remove("check");
//     item.classList.add("check");
//     checkedBtn = i;
//   });
// });

// ---------------- II SPOSÓB mój ------------------------
const sizeBtns = document.querySelectorAll(".size-radio-btn");
let size;

sizeBtns.forEach((item) => {
  item.addEventListener("click", () => {
    sizeBtns.forEach((item) => {
      item.classList.remove("check");
    });
    item.classList.add("check");
    size = item.innerHTML;
    // console.log(size);
  });
});

// console.log(findUserInDatabase);

// const deleteOpenProduct = () => {
//   if (dataBase.userAcc.productToOpen) {
//     ff;
//     console.log(dataBase.userAcc.productToOpen);

//     const productOpen = dataBase.userAcc.productToOpen;
//     const i = findUserInDatabase.products.findIndex(
//       (el) => el.productId === productOpen.productId
//     );

//     findUserInDatabase.products.splice(i, 1);

//     dataBase.userAcc.productToOpen = "";

//     localStorage.setItem("data", JSON.stringify(dataBase));
//   }
// };

const setData = (product) => {
  //setup the images
  productImages.forEach((img, i) => {
    if (product.images[i]) {
      img.src = product.images[i];
    } else {
      img.style.display = "none";
    }
  });

  productImages[0].click();

  // setup size buttons
  sizeBtns.forEach((size) => {
    // console.log(product.sizes.includes(size.innerHTML.toLowerCase()));
    if (!product.sizes.includes(size.innerHTML.toLowerCase())) {
      size.style.display = "none";
    }
  });

  // setting up texts
  const productName = document.querySelector(".product-brand");
  const shortDes = document.querySelector(".product-short-des");
  const des = document.querySelector(".des");

  const title = document.querySelector("title");
  title.innerHTML += " " + product.productName;

  productName.innerHTML = product.productName;
  shortDes.innerHTML = product.shortDes;
  des.innerHTML = product.des;

  // pricing
  const sellPrice = document.querySelector(".product-price");
  const actualPrice = document.querySelector(".product-actual-price");
  const discount = document.querySelector(".product-discount");

  sellPrice.innerHTML = `$${product.sellPrice}`;
  actualPrice.innerHTML = `$${product.actualPrice}`;
  discount.innerHTML = `( ${product.discount}% off)`;

  // type: wishlist or cart
  const wishlistBtn = document.querySelector(".wishlist-btn");
  wishlistBtn.addEventListener("click", () => {
    // console.log(product);
    wishlistBtn.innerHTML = add_product_to_cart_or_wishlist(
      "wishlist",
      product
    );
  });

  const cartBtn = document.querySelector(".cart-btn");
  cartBtn.addEventListener("click", () => {
    cartBtn.innerHTML = add_product_to_cart_or_wishlist("cart", product);
  });
};

if (dataBase.userAcc.productToOpen) {
  // console.log(dataBase.userAcc.productToOpen);

  const productOpen = dataBase.userAcc.productToOpen;

  console.log(productOpen);
  setData(productOpen);

  localStorage.setItem("data", JSON.stringify(dataBase));
}

//////// /// /// / / / / / /
// Jak filtrować obiekty --- dobra metoda przy porównywaniu tablicy z danym stringiem, ale ja musze porównac dwie tablice

// const blackProduct = dataBase.allProducts.filter((product) =>
//   product.tags.includes("shorts")
// );
// console.log(blackProduct);

console.log(dataBase.allProducts);

productOpen = dataBase.userAcc.productToOpen;
tags = productOpen.tags;
console.log(tags);

const tagsAllProduct = dataBase.allProducts.filter((product) =>
  product.tags.some((tag) => tags.includes(tag))
);
// console.log(tagsAllProduct);

createProductSlider(
  tagsAllProduct,
  ".container-for-card-slider",
  "similar products"
);

document
  .querySelector(".container-for-card-slider")
  .addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    // console.log("działa");

    console.log(card);
    const findProduct = dataBase.allProducts.find(
      (el) => el.productId === card.dataset.id
    );

    console.log(findProduct);
    dataBase.userAcc.productToOpen = findProduct;

    const productOpen = dataBase.userAcc.productToOpen;
    localStorage.setItem("data", JSON.stringify(dataBase));

    setData(productOpen);
    location.href = "/product.html";
  });

const add_product_to_cart_or_wishlist = (type, product) => {
  if (!dataBase.baskets[type]) {
    dataBase.baskets[type] = [];
    localStorage.setItem("data", JSON.stringify(dataBase));
  }
  // delete dataBase.baskets;

  product = {
    productId: product.productId,
    item: 1,
    name: product.productName,
    sellPrice: product.sellPrice,
    size: size || null,
    shortDes: product.shortDes,
    image: product.images[0],
  };

  console.log(dataBase.baskets[type]);

  dataBase.baskets[type].push(product);
  console.log(dataBase);
  localStorage.setItem("data", JSON.stringify(dataBase));

  return `added`;
};
