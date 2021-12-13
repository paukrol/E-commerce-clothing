// redirect to home page if user logged in
let data;

window.onload = () => {
  data = localStorage.getItem("data");
  // console.log(data);

  if (data) {
    dataBase = JSON.parse(data);
    console.log(dataBase);

    if (dataBase.userAcc) {
      const user = dataBase.userAcc;
      // console.log(user);

      // dataBase.userAcc = user; --- to jest nie potrzebne!
      console.log(dataBase);
      location.replace("/");
    }
  }
};

const loader = document.querySelector(".loader");

const submitBtn = document.querySelector(".submit-btn");
const nameUser = document.querySelector("#name") || null;
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const number = document.querySelector("#number") || null;
const tac = document.querySelector("#terms-and-cond") || null;
const notification = document.querySelector("#notification") || null;

let dataBase = {
  users: [],
  sellers: [],
  allProducts: [],
  baskets: {},
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (nameUser !== null) {
    //signUp page
    if (nameUser.value.length < 3) {
      showAlert("name must be 3 letters long");
    } else if (!email.value.length) {
      showAlert("enter your email");
    } else if (password.value.length < 8) {
      showAlert("password should be 8 letters long");
    } else if (!number.value.length) {
      showAlert("enter your phone number");
    } else if (!Number(number.value) || number.value.length < 10) {
      showAlert("invalid number, please enter valid one");
    } else if (!tac.checked) {
      showAlert("you must agree to our terms and conditions");
    } else {
      // submit form
      loader.style.display = "block";

      const emailExist = (user) => user.email === email.value;

      if (dataBase.users.some(emailExist)) {
        showAlert('"Email already exist!"');
        // console.log("juz jest");

        setTimeout(() => {
          loader.style.display = "none";
        }, 1000);
        return;
      }

      // dataBase.userAcc = {
      //   name: nameUser.value,
      //   email: email.value,
      //   password: password.value,
      //   number: number.value,
      //   tac: tac.checked,
      //   notification: notification.checked,
      //   seller: false,
      //   signUp: true,
      // };

      // Zalogowany użytkownik
      dataBase.userAcc = {
        email: email.value,
        password: password.value,
        seller: false,
      };

      // Dane dodane do bazy
      dataBase.users.push({
        name: nameUser.value,
        email: email.value,
        password: password.value,
        number: number.value,
        tac: tac.checked,
        notification: notification.checked,
        seller: false,
        signUp: true,
        products: [],
      });

      console.log(dataBase);

      setTimeout(() => {
        loader.style.display = "none";
        location.replace("/"); // tutaj, po pomyslnym signUp --> przeskakujemy na strne główną -> na root file, czyli index.html
      }, 1000);

      localStorage.setItem("data", JSON.stringify(dataBase));
    }
  } else {
    // Login page
    if (!email.value.length || !password.value.length) {
      showAlert("Fill all the inputs!");
    } else {
      loader.style.display = "block";

      dataBase.userAcc = {
        email: email.value,
        password: password.value,
        // seller: false,
      };

      // if (dataBase.userAcc.seller) {
      //   const findSellerAccInDatabase = dataBase.sellers.find((el) => {
      //     return el.email === dataBase.userAcc.email;
      //   });
      //   dataBase.sellerAcc = findSellerAccInDatabase;
      // }

      const emailExist = (user) => user.email === dataBase.userAcc.email;
      const checkPassword = (user) =>
        user.password === dataBase.userAcc.password;

      if (!dataBase.users.some(emailExist)) {
        // if email does not exist
        setTimeout(() => {
          showAlert("Log in email does not exisit!");
          loader.style.display = "none";
        }, 2000);
        return;
      } else if (!dataBase.users.some(checkPassword)) {
        // if password in incorrect
        setTimeout(() => {
          showAlert("Password in incorrect!");
          loader.style.display = "none";
        }, 2000);
        return;
      } else {
        let findUserInDatabase = dataBase.users.find(
          (el) =>
            el.email === dataBase.userAcc.email &&
            el.password === dataBase.userAcc.password
        );

        if (findUserInDatabase.seller) {
          const findSellerAccInDatabase = dataBase.sellers.find((el) => {
            return el.email === dataBase.userAcc.email;
          });
          dataBase.sellerAcc = findSellerAccInDatabase;
        }

        dataBase.userAcc = {
          email: email.value,
          password: password.value,
          // seller: false,
          // seller:
        };

        // if email exist and password is correct
        setTimeout(() => {
          // showAlert("Super! Zostałeś zalogowany");
          loader.style.display = "none";

          location.replace("/"); // tutaj, po pomyslnym signUp --> przeskakujemy na strone główną -> na root file, czyli index.html
        }, 2000);
      }

      console.log(dataBase);

      localStorage.setItem("data", JSON.stringify(dataBase));
    }
  }
});

//alert function
const showAlert = (msg) => {
  const alertBox = document.querySelector(".alert-box");
  const alertMsg = document.querySelector(".alert-msg");

  alertMsg.innerHTML = msg;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
};
