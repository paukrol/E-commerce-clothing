if (!dataBase.userAcc) {
  location.replace("/login.html");
}

const placeOrderBtn = document.querySelector(".place-order-btn");

placeOrderBtn.addEventListener("click", () => {
  // console.log("click");
  let address = getAddress();
  // console.log(address);

  const orderNum = Math.floor(Math.random() * 1000000);
  if (address) {
    const order = {
      orderId: `${dataBase.userAcc.email}-${orderNum}`,
      email: dataBase.userAcc.email,
      orderCart: dataBase.baskets.cart,
      add: address,
    };

    console.log(order);
  }

  showAlert("your order is placed", "success");
  setTimeout(() => {
    location.replace("/mail.html");
  }, 4000);
});

const getAddress = () => {
  // validation
  const address = document.querySelector("#address").value;
  const street = document.querySelector("#street").value;
  const city = document.querySelector("#city").value;
  const state = document.querySelector("#state").value;
  const pincode = document.querySelector("#pincode").value;
  const landmark = document.querySelector("#landmark").value;

  if (
    !address.length ||
    !street.length ||
    !city.length ||
    !state.length ||
    !pincode.length ||
    !landmark.length
  ) {
    return showAlert("fill all the inputs first");
  } else {
    return {
      address,
      street,
      city,
      state,
      pincode,
      landmark,
    };
  }
};

const showAlert = (msg, type) => {
  const alertBox = document.querySelector(".alert-box");
  const alertMsg = document.querySelector(".alert-msg");
  const alertImg = document.querySelector(".alert-img");

  if (type === "success") {
    alertImg.src = "img/success.png";
    alertMsg.style.color = "#0ab50a";
  } else {
    // means it is an err
    alertImg.src = "img/error.png";
    alertMsg.style.color = null;
  }

  alertMsg.innerHTML = msg;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
};
