//select items
const cartEmptyLabel = document.getElementById("cart-empty-label");
const shopingCart = document.getElementById("shoping-cart");
const shopTable = document.getElementById("shop-table");
const totalPrice = document.getElementById("cart-totals");
const totalSection = document.getElementById("total-section");

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
    shopingCart.innerHTML = basket
      .map((obj) => {
        let { id, item } = obj;
        let search = shopItemsData.find((item) => item.id === id) || [];
        return `<tr class="product">
                  <td class="product-remove">
                    <img
                      width="25"
                      src="/assets/indexPage/close-icon.svg"
                      alt="close-icon"
                      onclick="removeItem(${id})"
                    />
                  </td>
                  <td class="product-thumbnail">
                    <img src=${search.imageSrc} alt=${search.alt} />
                  </td>
                  <td class="product-name product-moblie" data-title="Proizvod">
                    ${search.alt}
                  </td>
                  <td class="product-price product-moblie" data-title="Cena">
                    ${search.price}.0 din
                  </td>
                  <td class="product-quantity product-moblie" data-title="Količina">
                    <div class="buttons">
                      <div onclick="decrement(${id})" id="decrement" class="decrement">
                        <img
                          width="20"
                          src="/assets/indexPage/minus-icon.svg"
                          alt="minus-icon"
                        />
                      </div>
                      <div id="${id}" class="quantity">${item}</div>
                      <div onclick="increment(${id})" id="increment" class="increment">
                        <img
                          width="20"
                          src="/assets/indexPage/plus-icon.svg"
                          alt="plus-icon"
                        />
                      </div>
                    </div>
                  </td>
                  <td class="product-subtotal product-moblie" data-title="Ukupno">
                    ${item * search.price}.0 din
                  </td>
                </tr>`;
      })
      .join("");

    cartEmptyLabel.style.display = "none";
  } else {
    cartEmptyLabel.style.display = "block";
    shopTable.style.display = "none";
  }
};
generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  totalAmount();

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;

  basket = basket.filter((obj) => obj.id !== selectedItem.id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));

  alert("PROIZVOD IZBRISAN IZ KORPE!", location.reload());
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((obj) => {
        let { item, id } = obj;
        let search = shopItemsData.find((item) => item.id === id) || [];
        return item * search.price;
      })
      .reduce((prevPrice, nextPrice) => prevPrice + nextPrice, 0);
    totalSection.style.display = "flex";
    totalPrice.innerHTML = `<span class='cart-subtotal'>Ukupno:</span>
                            <span class='price-total'>${amount}.00 din</span>`;
  } else {
    totalSection.style.display = "none";
  }
};
totalAmount();
