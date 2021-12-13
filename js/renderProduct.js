const data = localStorage.getItem("data");
let dataBase;

if (data) {
  dataBase = JSON.parse(data);
  console.log(dataBase);
}

let findUserInDatabase = dataBase.users.find(
  (el) =>
    el.email === dataBase.userAcc.email &&
    el.password === dataBase.userAcc.password
);

const renderProduct = () => {
  const allProducts = findUserInDatabase.products;

  console.log(allProducts);
  const allProductsStr = allProducts
    .map((el) => {
      console.log(el);
      return `
        <div class="product-card" data-id="${el.productId}">
          <div class="product-image">
          ${el.draft ? `<span class="tag">Draft</span>` : ""}
            
            <img src="${
              el.images.length ? el.images[0] : "img/no image.png"
            }" alt="" class="product-thumb" />
            <button class="card-action-btn edit-btn">
              <img src="img/edit.png" alt="" />
            </button>
            <button class="card-action-btn open-btn">
              <img src="img/open.png" alt="" />
            </button>
            <button class="card-action-btn delete-popup-btn" onclick="openDeletePopup('${
              el.productId
            }')">
              <img src="img/delete.png" alt="" />
            </button>
          </div>
          <div class="product-info">
            <h2 class="product-brand">${el.productName}</h2>
            <p class="product-short-des">${el.shortDes}</p>
            <span class="price">$${
              el.sellPrice
            }</span><span class="actual-price">$${el.actualPrice}</span>
          </div>
        </div>
  `;
    })
    .join("");
  // console.log(allProductsStr);

  const productContainer = document.querySelector(".product-container");

  productContainer.innerHTML = allProductsStr;
};

const openDeletePopup = (id) => {
  const deleteAlert = document.querySelector(".delete-alert");
  deleteAlert.style.display = "flex";
  console.log(id);

  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    deleteAlert.style.display = "none";
  });

  const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => deleteItem(id));
};

const deleteItem = (id) => {
  const allUserProducts = findUserInDatabase.products;
  const allProducts = dataBase.allProducts;
  // console.log(allProducts);

  const indexUserProduct = allUserProducts.findIndex(
    (el) => el.productId === id
  );
  console.log(indexUserProduct);

  const indexProduct = allProducts.findIndex((el) => el.productId === id);

  allUserProducts.splice(indexUserProduct, 1);
  allProducts.splice(indexProduct, 1);

  localStorage.setItem("data", JSON.stringify(dataBase));

  location.reload();
};

const productContainer = document.querySelector(".product-container");

////////////////////////////////
////////////////////////////////
// btn edit
productContainer.addEventListener("click", (e) => {
  const allProducts = document.querySelectorAll(".product-card");
  // console.log(allProducts);
  const product = e.target.closest(".product-card");
  if (!product) return;

  const btnEdit = e.target.closest(".product-card .edit-btn");

  if (btnEdit) {
    console.log(product);
    const findProduct = findUserInDatabase.products.find(
      (el) => el.productId === product.dataset.id
    );

    console.log(findProduct);
    dataBase.userAcc.productToEdit = findProduct;

    localStorage.setItem("data", JSON.stringify(dataBase));
    location.href = `/addProduct.html`;
  }
});

////////////////////////////////
////////////////////////////////
// btn open

productContainer.addEventListener("click", (e) => {
  const allProducts = document.querySelectorAll(".product-card");
  // console.log(allProducts);
  const product = e.target.closest(".product-card");
  if (!product) return;

  const btnOpen = e.target.closest(".product-card .open-btn");

  if (btnOpen) {
    console.log(product);
    const findProduct = findUserInDatabase.products.find(
      (el) => el.productId === product.dataset.id
    );

    console.log(findProduct);
    dataBase.userAcc.productToOpen = findProduct;

    localStorage.setItem("data", JSON.stringify(dataBase));
    location.href = `/product.html`;
  }
});
