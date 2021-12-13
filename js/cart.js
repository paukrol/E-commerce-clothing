if (!dataBase.userAcc) {
  location.replace("/login.html");
}

// create small product cards
const createSmallCards = (data) => {
  // console.log(data.item);
  return `
    <div class="sm-product" data-product-id="${data.productId}">
      <img src="${data.image}" alt="" class="sm-product-img" />
      <div class="sm-text">
        <p class="sm-product-name">${data.name}</p>
        <p class="sm-des">${data.shortDes}</p>
      </div>
      <div class="item-counter">
        <button class="counter-btn decrement">-</button>
        <p class="item-count">${data.item}</p>
        <button class="counter-btn increment">+</button>
      </div>
      <p class="sm-price" data-price=${data.sellPrice}>$${(
    data.sellPrice * data.item
  ).toFixed(2)}</p>
      <button class="sm-delete-btn">
        <img src="img/close.png" alt="" />
      </button>
    </div>
  `;
};

let totalBill = 0;

const setProducts = (name) => {
  const element = document.querySelector(`.${name}`);
  let dataBase = JSON.parse(localStorage.getItem("data"));
  const basket = dataBase.baskets[name];

  if (basket == null || !basket.length) {
    element.innerHTML = `
      <img src="img/empty-cart.png" alt="" class="empty-img" />
    `;
  } else {
    element.innerHTML = basket
      .map((product) => {
        return createSmallCards(product);
      })
      .join("");

    if (name === "cart") {
      totalBill = basket
        .map((product) => {
          return product.sellPrice * product.item;
        })
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        });
      // console.log(totalBill);
      updateBill();
    }
  }
  setupEvents(name);
};

const setupEvents = (name) => {
  // setup counter event
  const counterMinus = document.querySelectorAll(`.${name} .decrement`);
  const counterPlus = document.querySelectorAll(`.${name} .increment`);
  const counts = document.querySelectorAll(`.${name} .item-count`);
  const price = document.querySelectorAll(`.${name} .sm-price`);
  const deleteBtn = document.querySelectorAll(`.${name} .sm-delete-btn`);

  let dataBase = JSON.parse(localStorage.getItem("data"));
  const basket = dataBase.baskets[name];

  counts.forEach((item, i) => {
    const cost = Number(price[i].dataset.price);
    // console.log(cost);

    counterMinus[i].addEventListener("click", (e) => {
      console.log("minus");
      if (item.innerHTML > 1) {
        item.innerHTML--;
        // console.log(item.innerHTML);
        const clickedProduct = e.target.closest(".sm-product");
        console.log(clickedProduct);
        console.log(clickedProduct.dataset.productId);
        const findInBaskets = dataBase.baskets[name].find((product) => {
          return product.productId === clickedProduct.dataset.productId;
        });

        findInBaskets.item = item.innerHTML;
        price[i].innerHTML = `$${item.innerHTML * cost}`;
        console.log(findInBaskets);

        if (name === "cart") {
          totalBill -= cost;
          updateBill();
        }

        localStorage.setItem("data", JSON.stringify(dataBase));
      }
    });

    counterPlus[i].addEventListener("click", (e) => {
      console.log("minus");
      if (item.innerHTML < 9) {
        item.innerHTML++;
        // console.log(item.innerHTML);
        const clickedProduct = e.target.closest(".sm-product");
        console.log(clickedProduct);
        console.log(clickedProduct.dataset.productId);
        const findInBasket = dataBase.baskets[name].find((product) => {
          return product.productId === clickedProduct.dataset.productId;
        });

        findInBasket.item = item.innerHTML;
        price[i].innerHTML = `$${item.innerHTML * cost}`;
        console.log(findInBasket);

        if (name === "cart") {
          totalBill += cost;
          updateBill();
        }

        localStorage.setItem("data", JSON.stringify(dataBase));
      }
    });
  });

  deleteBtn.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      const clickedProduct = e.target.closest(".sm-product");
      console.log(clickedProduct);
      console.log(clickedProduct.dataset.productId);
      const findInBaskets = dataBase.baskets[name].find((product) => {
        return product.productId === clickedProduct.dataset.productId;
      });

      const findIndexInBaskets = dataBase.baskets[name].findIndex((product) => {
        return product.productId === clickedProduct.dataset.productId;
      });
      console.log(findIndexInBaskets);

      dataBase.baskets[name].splice(findIndexInBaskets, 1);
      console.log(dataBase.baskets[name]);

      localStorage.setItem("data", JSON.stringify(dataBase));
      location.reload();
    });
  });
};

const updateBill = () => {
  const billPrice = document.querySelector(".bill");
  billPrice.innerHTML = `$${totalBill}`;
};

if (document.querySelector(".cart")) {
  setProducts("cart");
}

if (document.querySelector(".wishlist")) {
  setProducts("wishlist");
}

// dataBase.baskets.cart = [];
// dataBase.baskets.wishlist = [];
// console.log(dataBase);
// localStorage.setItem("data", JSON.stringify(dataBase));
