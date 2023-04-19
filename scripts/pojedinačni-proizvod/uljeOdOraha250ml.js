//select items
let singleProduct = document.getElementById("single-product");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let { id, imageSrc, alt, price } = shopItemsData[6];

let generateProductItem = () => {
  return (singleProduct.innerHTML = `<div class="image-product">
                <img
                    src="${imageSrc}"
                    alt="${alt}"
                />
            </div>
            <div class="summary">
                <h2 class="title">Ulje od oraha 250 ml</h2>
                <p class="details">Izvor vitamina i omega 3 masnih kiselina</p>
                <span class="price">${price},00 din</span>
                <div class="addToCart">
                    <button id="${id}" onclick="addToCart(id)" class="btn-add">
                        Dodaj u korpu
                    </button>
                </div>
          </div>`);
};
generateProductItem();

//add item to basket
let addToCart = (id) => {
  let selectedItem = id;
  let search = basket.find((item) => item.id === selectedItem);

  console.log(search);

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  console.log(basket);

  localStorage.setItem("data", JSON.stringify(basket));

  calculation();

  alert("PROIZVOD DODAT U KORPU!");
};

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
