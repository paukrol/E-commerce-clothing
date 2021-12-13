data = localStorage.getItem("data");
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

const searchSpanElement = document.querySelector("#search-tag");

if (dataBase.searchValue) {
  const searchValue = dataBase.searchValue;

  searchSpanElement.innerHTML = dataBase.searchValue;
  const searchProducts = dataBase.allProducts.filter((product) => {
    return product.tags.some((tag) => tag === searchValue.toLowerCase());
  });

  console.log(searchProducts);

  createProductCards(searchProducts, ".card-container", searchValue);
}

document.querySelector(".card-container").addEventListener("click", (e) => {
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
