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

const checkStatusName = document.querySelector(".check-status span");
// checkStatusName.innerHTML = `${dataBase.userAcc.}`

const findUser = dataBase.users.find((user) => {
  return user.email === dataBase.userAcc.email;
});
console.log(findUser);

checkStatusName.innerHTML = `${findUser.name}`;
