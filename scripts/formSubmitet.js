//select items
const productContainer = document.getElementById("product-container");
const cartSubtotal = document.getElementById("cart-subtotal");
const orderTotal = document.getElementById("total-amount");
const shiping = document.getElementById("shiping");
//items used for form validation
const inputFname = document.getElementById("fname");
const inputLname = document.getElementById("lname");
const inputAddress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputZipcode = document.getElementById("zipcode");
const inputPhone = document.getElementById("phone");
const inputEmailAddress = document.getElementById("email-address");

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
                  <span name='inner-title' class="inner-title">${
                    search.formSubmitetDetail
                  }</span>
                  <span name='inner-quantity' class="inner-quantity">Količina: ${item}</span>
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
    orderTotal.innerHTML = `<strong>${
      350 + amount
    }.00 din / Na poklon: Orasnica</strong>`;
  } else {
    orderTotal.innerHTML = `<strong>${350 + amount}.00 din</strong>`;
  }
};
totalAmountWithOrWithoutShipping();

//form submitet
var form = document.getElementById("form-submitet");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.classList.add("success");
        status.innerHTML = "Porudžbina uspešno poslata!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.classList.add("error");
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML =
              "Oops! Postoji problem sa unetim prodacima, probajte opet!";
          }
        });
      }
    })
    .catch((error) => {
      status.classList.add("error");
      status.innerHTML =
        "Oops! Postoji problem sa unetim prodacima, probajte opet!";
    });
}
form.addEventListener("submit", handleSubmit);
