//select items
let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((shopItem) => {
      let { id, imageSrc, alt, detailTitle, price } = shopItem;
      return `<div id="product-id-${id}" class="item">
                <a class='image' href='#'>
                    <img
                    src=${imageSrc}
                    alt=${alt}
                    />
                </a>  
                <div class="details">
                    <h2 class="detail-title">${detailTitle}</h2>
                    <h3 class="price">${price},00 din</h3>
                    <button id='${id}' onclick="addToCart(${id})" href="#shop" class="btn-add">Dodaj u korpu</button>
                </div>
            </div>`;
    })
    .join(""));
};

generateShop();

//add items to basket
let addToCart = (id) => {
  let selectedItem = id;
  let search = basket.find((item) => item.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
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
