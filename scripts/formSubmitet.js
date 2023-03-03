//select items
const productContainer = document.getElementById("product-container");
const cartSubtotal = document.getElementById("cart-subtotal");
const orderTotal = document.getElementById("total-amount");
const shiping = document.getElementById("shiping");
const submitFormBtn = document.getElementById("submit-form-btn");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let amount = basket
  .map((obj) => {
    let { item, id } = obj;
    let search = shopItemsData.find((item) => item.id === id) || [];
    return item * search.price;
  })
  .reduce((prevPrice, nextPrice) => prevPrice + nextPrice, 0);

const inputTotalPlac = (document.forms["myForm"][
  "Ukupan iznos uključujući poštarinu 350 din"
].value = `${amount + 350}.00 din`);

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
            status.classList.add("error");
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

//form validation
let formValidationHanlde = () => {
  const inputFname = document.forms["myForm"]["Ime kupca"].value;
  const inputLname = document.forms["myForm"]["Prezime kupca"].value;
  const inputAddress = document.forms["myForm"]["Ulica i kućni broj"].value;
  const inputCity = document.forms["myForm"]["Grad"].value;
  const inputZipcode = document.forms["myForm"]["Poštanski broj"].value;
  const inputPhone = document.forms["myForm"]["Telefon"].value;
  const inputEmailAddress = document.forms["myForm"]["Adresa e-pošte"].value;

  const requiredFname = document.getElementById("requiredFname");
  const requiredLname = document.getElementById("requiredLname");
  const requiredAddress = document.getElementById("requiredAddress");
  const requiredCity = document.getElementById("requiredCity");
  const requiredZipcode = document.getElementById("requiredZipcode");
  const requiredPhone = document.getElementById("requiredPhone");
  const requiredEmailAddress = document.getElementById("requiredEmailAddress");

  if (inputFname == "") {
    requiredFname.style.display = "block";
    requiredFname.innerHTML = "Ime je obavezno polje.";
    document.forms["myForm"]["Ime kupca"].style.border = "1px solid red";
  } else {
    requiredFname.style.display = "none";
    document.forms["myForm"]["Ime kupca"].style.border = "1px solid #aaa";
  }

  if (inputLname == "") {
    requiredLname.style.display = "block";
    requiredLname.innerHTML = "Prezime je obavezno polje.";
    document.forms["myForm"]["Prezime kupca"].style.border = "1px solid red";
  } else {
    requiredLname.style.display = "none";
    document.forms["myForm"]["Prezime kupca"].style.border = "1px solid #aaa";
  }

  if (inputAddress == "") {
    requiredAddress.style.display = "block";
    requiredAddress.innerHTML = "Ulica i kućni broj je obavezno polje.";
    document.forms["myForm"]["Ulica i kućni broj"].style.border =
      "1px solid red";
  } else {
    requiredAddress.style.display = "none";
    document.forms["myForm"]["Ulica i kućni broj"].style.border =
      "1px solid #aaa";
  }

  if (inputCity == "") {
    requiredCity.style.display = "block";
    requiredCity.innerHTML = "Grad je obavezno polje.";
    document.forms["myForm"]["Grad"].style.border = "1px solid red";
  } else {
    requiredCity.style.display = "none";
    document.forms["myForm"]["Grad"].style.border = "1px solid #aaa";
  }

  if (inputZipcode == "") {
    requiredZipcode.style.display = "block";
    requiredZipcode.innerHTML = "Poštanski broj je obavezno polje.";
    document.forms["myForm"]["Poštanski broj"].style.border = "1px solid red";
  } else {
    requiredZipcode.style.display = "none";
    document.forms["myForm"]["Poštanski broj"].style.border = "1px solid #aaa";
  }

  if (inputPhone == "") {
    requiredPhone.style.display = "block";
    requiredPhone.innerHTML = "Telefon je obavezno polje.";
    document.forms["myForm"]["Telefon"].style.border = "1px solid red";
  } else {
    requiredPhone.style.display = "none";
    document.forms["myForm"]["Telefon"].style.border = "1px solid #aaa";
  }

  if (inputEmailAddress == "") {
    requiredEmailAddress.style.display = "block";
    requiredEmailAddress.innerHTML = "Adresa e-pošte je obavezno polje.";
    document.forms["myForm"]["Adresa e-pošte"].style.border = "1px solid red";
  } else {
    requiredEmailAddress.style.display = "none";
    document.forms["myForm"]["Adresa e-pošte"].style.border = "1px solid #aaa";
  }
};
submitFormBtn.addEventListener("click", formValidationHanlde);

const generateOrderInputValue = () => {
  document.forms["myForm"]["Narudžbina"].value = basket
    .map((obj) => {
      let { id, item } = obj;
      let search = shopItemsData.find((item) => item.id === id) || [];
      return `${search.formSubmitetDetail} - Količina: ${item}
`;
    })
    .join("");
};
generateOrderInputValue();
