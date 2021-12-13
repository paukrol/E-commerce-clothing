const loader = document.querySelector(".loader");

const data = localStorage.getItem("data");
let dataBase;

if (data) {
  dataBase = JSON.parse(data);
  console.log(dataBase);
}

// jezeli uzytk. nie jest zalogowany przerzuć na stronę logowania
window.onload = () => {
  if (!dataBase || !dataBase.userAcc || !dataBase.sellerAcc) {
    location.href = "/login.html";
  }
};

// price inputs
const actualPrice = document.querySelector("#actual-price");
const discountPercentage = document.querySelector("#discount");
const sellingPrice = document.querySelector("#sell-price");

discountPercentage.addEventListener("input", () => {
  if (discountPercentage.value > 100) {
    discountPercentage.value = 90;
  } else {
    const discount = (discountPercentage.value / 100) * actualPrice.value;

    sellingPrice.value = actualPrice.value - discount;
  }
});

sellingPrice.addEventListener("input", () => {
  if (+sellingPrice.value > +actualPrice.value) {
    sellingPrice.value = actualPrice.value;
  }
  const discount =
    ((actualPrice.value - sellingPrice.value) * 100) / actualPrice.value;

  discountPercentage.value = discount;
});

// upload image handle

const uploadImages = document.querySelectorAll(".fileupload");
let imagePaths = []; // will store all uploaded images paths

uploadImages.forEach((fileUpload, index) => {
  fileUpload.addEventListener("change", (event) => {
    if (fileUpload.files[0].type.includes("image")) {
      const reader = new FileReader();
      reader.onload = function () {
        const imageURL = reader.result;
        imagePaths[index] = imageURL;
        // console.log(imageURL);

        let label = document.querySelector(`label[for=${fileUpload.id}]`);
        // console.log(label);
        // console.log(fileUpload.id);

        label.style.backgroundImage = `url("${imageURL}")`;

        const productImage = document.querySelector(".product-image");
        productImage.style.backgroundImage = `url("${imageURL}")`;
      };

      reader.readAsDataURL(fileUpload.files[0]); // to jest nodeList dlatego mozemy traktowac jak tablice
    } else {
      showAlert("upload image only");
    }
  });
});

//form submission

const productName = document.querySelector("#product-name");
const shortLine = document.querySelector("#short-des");
const des = document.querySelector("#des");

let sizes = []; // will store all the sizes

const stock = document.querySelector("#stock");
const tags = document.querySelector("#tags");
const tac = document.querySelector("#tac");

// buttons
const addProductBtn = document.querySelector("#add-btn");
const saveDraft = document.querySelector("#save-btn");

// store size function
const storeSizes = () => {
  sizes = [];
  const sizeCheckBox = document.querySelectorAll(".size-checkbox");
  sizeCheckBox.forEach((item) => {
    if (item.checked) {
      sizes.push(item.value);
    }
  });

  // console.log(sizes);
};

// validation function
const validateForm = () => {
  if (!productName.value.length) {
    return showAlert("enter product name");
  } else if (shortLine.value.length > 100 || shortLine.value.length < 10) {
    return showAlert(
      "short description must be between 10 to 100 letters long"
    );
  } else if (!des.value.length) {
    return showAlert("enter detail description about the product");
  } else if (!imagePaths.length) {
    return showAlert("upload at least one product image");
  } else if (!sizes.length) {
    return showAlert("select at least one size");
  } else if (
    !actualPrice.value.length ||
    !discountPercentage.value.length ||
    !sellingPrice.value.length
  ) {
    return showAlert("you must add pricings");
  } else if (stock.value < 20) {
    return showAlert("you should have at least 20 items in stock");
  } else if (!tags.value.length) {
    return showAlert("enter few tags to help ranking your product in search");
  } else if (!tac.checked) {
    return showAlert("you must agree to our terms and conditions");
  }
  return true;
};

let findUserInDatabase;
if (dataBase) {
  findUserInDatabase = dataBase.users.find(
    (el) =>
      el.email === dataBase.userAcc.email &&
      el.password === dataBase.userAcc.password
  );
}

const productData = () => {
  let tagArr = tags.value.toLowerCase().set(",");
  tagArr.forEach((el, i) => {
    tagArr[i] = tagArr[i].trim();
  });

  return (productObj = {
    productId: `${productName.value.toLowerCase()}-${Math.floor(
      Math.random() * 5000
    )}`,
    productName: productName.value,
    shortDes: shortLine.value,
    des: des.value,
    images: imagePaths,
    sizes: sizes,
    actualPrice: actualPrice.value,
    discount: discountPercentage.value,
    sellPrice: sellingPrice.value,
    stock: stock.value,
    tags: tagArr,
    tac: tac.checked,
    email: findUserInDatabase.email,
  });
};

addProductBtn.addEventListener("click", (e) => {
  e.preventDefault();

  storeSizes();
  // console.log(sizes);

  // validate form
  if (validateForm()) {
    // validateForm return true or false while doing validation
    loader.style.display = "block";

    const data = productData();
    dataBase.users
      .find(
        (el) =>
          el.email === dataBase.userAcc.email &&
          el.password === dataBase.userAcc.password
      )
      .products.push(data);

    dataBase.allProducts.push(data);
    console.log(dataBase);

    deleteEditProduct();

    setTimeout(() => {
      loader.style.display = "none";
      location.replace("/seller.html");
    }, 1000);

    localStorage.setItem("data", JSON.stringify(dataBase));
  }
});

// save draft btn

saveDraft.addEventListener("click", (e) => {
  e.preventDefault();

  // store sizes
  storeSizes();

  // check for product name
  if (!productName.value.length) {
    showAlert("enter product name");
  } else {
    // don't validate the data
    // loader.style.display = "block";

    const data = productData();
    data.draft = true;

    dataBase.users
      .find(
        (el) =>
          el.email === dataBase.userAcc.email &&
          el.password === dataBase.userAcc.password
      )
      .products.push(data);

    deleteEditProduct();

    setTimeout(() => {
      loader.style.display = "none";
      location.replace("/seller.html");
    }, 1000);

    localStorage.setItem("data", JSON.stringify(dataBase));

    console.log("działa");
  }
});

/////////////////////////////////////////////////////
////////////////////////////////////////////////////
// Custom function
const showAlert = (msg) => {
  const alertBox = document.querySelector(".alert-box");
  const alertMsg = document.querySelector(".alert-msg");

  alertMsg.innerHTML = msg;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
  return false;
};

const setFormsData = (product) => {
  productName.value = product.productName;
  shortLine.value = product.shortDes;
  des.value = product.des;
  actualPrice.value = product.actualPrice;
  discountPercentage.value = product.discount;
  sellingPrice.value = product.sellPrice;
  stock.value = product.stock;
  tags.value = product.tags;

  // set up images
  imagePaths = product.images;

  imagePaths.forEach((url, i) => {
    let label = document.querySelector(
      `label[for=${uploadImages[i] ? uploadImages[i].id : ""}]`
    );

    label.style.backgroundImage = `url("${url ? url : ""}")`;

    const productImage = document.querySelector(".product-image");
    productImage.style.backgroundImage = `url("${url ? url : ""}")`;
  });

  // set up sizes
  sizes = product.sizes;
  // console.log(sizes);

  const sizeCheckBox = document.querySelectorAll(".size-checkbox");

  // sizes.forEach((size, i) => {
  //   sizeCheckBox.forEach((item) => {
  //     if (item.value === size) {
  //       item.checked = true;
  //     }
  //   });
  // });
  //OR:

  sizeCheckBox.forEach((item) => {
    if (sizes.includes(item.value)) item.setAttribute("checked", "");
  });
};

const deleteEditProduct = () => {
  if (dataBase.userAcc.productToEdit) {
    console.log(dataBase.userAcc.productToEdit);

    const productEdit = dataBase.userAcc.productToEdit;
    const i = findUserInDatabase.products.findIndex(
      (el) => el.productId === productEdit.productId
    );

    findUserInDatabase.products.splice(i, 1);

    dataBase.userAcc.productToEdit = "";

    localStorage.setItem("data", JSON.stringify(dataBase));
  }
};

if (dataBase.userAcc.productToEdit) {
  console.log(dataBase.userAcc.productToEdit);

  const productEdit = dataBase.userAcc.productToEdit;
  setFormsData(productEdit);

  localStorage.setItem("data", JSON.stringify(dataBase));
}
