//select items
const productContainer = document.getElementById("product-container");
const cartSubtotal = document.getElementById("cart-subtotal");
const orderTotal = document.getElementById("total-amount");
const shiping = document.getElementById("shiping");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let amount = basket
  .map((obj) => {
    let { item, id } = obj;
    let search = shopItemsData.find((item) => item.id === id) || [];
    return item * search.price;
  })
  .reduce((prevPrice, nextPrice) => prevPrice + nextPrice, 0);

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

//generateItems
let generateProductItems = () => {
  productContainer.innerHTML = basket
    .map((obj) => {
      let { id, item } = obj;
      let search = shopItemsData.find((item) => item.id === id) || [];
      return `<div class="cart-item">
              <a href="prodavnica.html" class="product-image">
                <img
                  src=${search.imageSrc}
                  alt=${search.alt}
                />
              </a>
              <div class="product-info">
                <div class="inner">
                  <span class="inner-title">${search.formSubmitetDetail}</span>
                  <span class="inner-quantity">Količina: ${item}</span>
                </div>
                <span class="product-amount">${
                  item * search.price
                }.00 din</span>
              </div>
            </div>`;
    })
    .join("");
};
generateProductItems();

//total amount
let totalAmount = () => {
  cartSubtotal.innerHTML = `${amount}.00 din`;
};
totalAmount();

//total amount wiht or without shipping
totalAmountWithOrWithoutShipping = () => {
  if (amount > 3000) {
    shiping.innerHTML = "Isporuka: Besplatna";
    orderTotal.innerHTML = `<strong>${amount}.00 din</strong>`;
  } else {
    orderTotal.innerHTML = `<strong>${350 + amount}.00 din</strong>`;
  }
};
totalAmountWithOrWithoutShipping();
