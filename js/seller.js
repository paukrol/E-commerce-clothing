const loader = document.querySelector(".loader");

const becomeSellerElement = document.querySelector(".become-seller");
const productListingElement = document.querySelector(".product-listing");
const applyForm = document.querySelector(".apply-form");
const showApplyFormBtn = document.querySelector("#apply-btn");

// let dataBase; // bo jest w renderProduct.js
// let findUserInDatabase; // bo jest w renderProduct.js

window.onload = () => {
  // const data = localStorage.getItem("data");  bo jest w renderProduct.js

  // console.log(data);
  if (data) {
    dataBase = JSON.parse(data);
    console.log(dataBase);

    if (dataBase.userAcc) {
      // jezeli uzytkownik jest zalogowany
      findUserInDatabase = dataBase.users.find(
        (el) =>
          el.email === dataBase.userAcc.email &&
          el.password === dataBase.userAcc.password
      );

      if (!dataBase.sellerAcc) {
        // jezeli uzytkownik nie ma firmy to zostaje na stronie z formularzem
        const userLog = dataBase.userAcc;
        becomeSellerElement.classList.remove("hide");
      } else {
        // jezeli uzytkownik posiada firme to ma od razu przeniesc go na liste z produktami
        loader.style.display = "block";
        setupProducts();
      }
    } else {
      // jezeli uzytk. nie jest zalogowany
      location.replace("/login.html");
    }
  } else {
    location.replace("/login.html");
  }
};

showApplyFormBtn.addEventListener("click", (e) => {
  becomeSellerElement.classList.add("hide");
  applyForm.classList.remove("hide");
});

// form submission

const businessName = document.querySelector("#business-name");
const businessAddress = document.querySelector("#business-add");
const businessAbout = document.querySelector("#about");
const businessNumber = document.querySelector("#number");

const tac = document.querySelector("#terms-and-cond");
const legitInfo = document.querySelector("#legitInfo");

const applyFormBtn = document.querySelector("#apply-form-btn");

applyFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !businessName.value ||
    !businessAddress.value ||
    !businessAbout.value ||
    !businessNumber.value
  ) {
    showAlert("Fill all the inputs!");
  } else if (!tac.checked || !legitInfo.checked) {
    showAlert("you must agree to our terms and conditions");
  } else {
    // making server request
    loader.style.display = "block";
    console.log(dataBase);

    // dataBase.userAcc = dataBase.users.find(
    //   (el) =>
    //     el.email === dataBase.userAcc.email &&
    //     el.password === dataBase.userAcc.password
    // );

    // console.log(dataBase.userAcc);
    dataBase.sellerAcc = {
      sellerName: businessName.value,
      address: businessAddress.value,
      about: businessAbout.value,
      number: businessNumber.value,
      tac: tac.checked,
      legit: legitInfo.checked,
      email: dataBase.userAcc.email,
    };

    if (
      !dataBase.sellerAcc.sellerName ||
      !dataBase.sellerAcc.address ||
      !dataBase.sellerAcc.about ||
      dataBase.sellerAcc.number < 10 ||
      !Number(dataBase.sellerAcc.number)
    ) {
      setTimeout(() => {
        loader.style.display = "none";
        showAlert("Some information(s) is/are invalid");
      }, 1000);
    } else if (!dataBase.sellerAcc.tac || !dataBase.sellerAcc.legit) {
      setTimeout(() => {
        loader.style.display = "none";
        showAlert("you must agree to out terms and conditions");
      }, 1000);
    } else {
      // update userAcc seller status here
      dataBase.userAcc.seller = true;

      // update users seller status here
      findUserInDatabase.seller = true;

      //added seller to all sellers in dataBase
      dataBase.sellers.push({
        sellerName: businessName.value,
        address: businessAddress.value,
        about: businessAbout.value,
        number: businessNumber.value,
        tac: tac.checked,
        legit: legitInfo.checked,
        email: dataBase.userAcc.email,
      });
      localStorage.setItem("data", JSON.stringify(dataBase));
      location.reload();

      setTimeout(() => {
        loader.style.display = "none";
      }, 1000);
    }
  }
});

const showAlert = (msg) => {
  const alertBox = document.querySelector(".alert-box");
  const alertMsg = document.querySelector(".alert-msg");

  alertMsg.innerHTML = msg;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
};

const setupProducts = () => {
  setTimeout(() => {
    loader.style.display = "none";
    productListingElement.classList.remove("hide");
    if (!findUserInDatabase.products.length) {
      let emptySvg = document.querySelector(".no-product-image");
      emptySvg.classList.remove("hide");
    } else {
      renderProduct();
    }
  }, 200);
};

// Add Product Btn
document.addEventListener("click", (e) => {
  const btnAddProduct = e.target.closest("#btn-add-product");

  if (!btnAddProduct) return;

  if (btnAddProduct) {
    if (dataBase.userAcc.productToEdit) {
      console.log("działa");
      dataBase.userAcc.productToEdit = "";
    }
    localStorage.setItem("data", JSON.stringify(dataBase));

    location.href = "/addProduct.html";
  }
});
