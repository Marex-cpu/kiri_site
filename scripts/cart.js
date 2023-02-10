//select items
const cartEmptyLabel = document.getElementById("cart-empty-label");
const shopingCart = document.getElementById("shoping-cart");
const shopTable = document.getElementById("shop-table");

let basket = JSON.parse(localStorage.getItem("data")) || [];

//calculation
let calculation = () => {
  let cartIcon = document.getElementById("cart-amount");
  reduceAllItems = basket
    .map((obj) => obj.item)
    .reduce((prev, next) => prev + next, 0);
  cartIcon.innerHTML = reduceAllItems;

  if (reduceAllItems <= 0) {
    cartIcon.style.display = "none";
  } else {
    cartIcon.style.display = "block";
  }
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    // shopingCart.innerHTML = basket.map((item) => {
    //   return ``;
    // });

    cartEmptyLabel.style.display = "none";
  } else {
    cartEmptyLabel.style.display = "block";
    shopTable.style.display = "none";
  }
};
generateCartItems();
