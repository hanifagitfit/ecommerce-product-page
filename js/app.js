const menuItem = document.querySelector('.menu_item');
const btnBurger = document.querySelector('.btnBurger');
const btnMenueClose = document.querySelector('#btnClose');

btnBurger.addEventListener('click', showMenue);
function showMenue() {
    menuItem.classList.remove('hidden_menu');
}

btnMenueClose.addEventListener('click', hideMenue);
function hideMenue() {
    menuItem.classList.add('hidden_menu');

}

const cart = document.querySelector('.cart')
const cartDetail = document.querySelector('.cart_detail')

cart.addEventListener('click', showCart);
function showCart() {
    cartDetail.classList.toggle('hide')
}

const btnPlus = document.querySelector('#plus');
const btnMinus = document.querySelector('#minus');
const counter = document.querySelector('#counter');

btnPlus.addEventListener('click', counterPlus);
btnMinus.addEventListener('click', counterMinus);
let productCounterValue = 0;
let productInCart = 0;


function counterPlus() {
    setProductValue(1);
}
function counterMinus() {
    setProductValue(-1);
}

function setProductValue(value) {
    if ((productCounterValue + value) > 0) {
        productCounterValue += value;
        counter.innerHTML = productCounterValue;
    }
}

const thumbnail = document.querySelectorAll('.pro');
const hero = document.querySelector('#product')
thumbnail.forEach(img => {
    img.addEventListener('click', onThumbChange);
});


function onThumbChange(event) {
    thumbnail.forEach(img => {
        img.classList.remove('active');
    });

    event.target.parentElement.classList.add('active');
    //Update thumbnail
    hero.src = event.target.src.replace('-thumbnail', '')
}

//----- mobile slider -----

const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.previous');

btnNext.addEventListener('click', handleBtnClickNext);
btnPrev.addEventListener('click', handleBtnPrevClick);

function handleBtnClickNext() {
    let imageIndex = getImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setrHeroIndex(imageIndex);
}

function handleBtnPrevClick() {
    let imageIndex = getImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setrHeroIndex(imageIndex);
}

function getImageIndex() {
    const imageIndex = parseInt(hero.src.split('\\').pop().split('/').pop().replace('jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setrHeroIndex(imageIndex) {
    hero.src = `./images/image-product-${imageIndex}.jpg`;
    //images are not sync
    thumbnail.forEach(img => {
        img.classList.remove('active');
    })

    thumbnail[imageIndex - 1].classList.add('active');
}

//-------Add to cart--------
let price = 250.0;
let discount = 0.5;

const shoppingCart = document.querySelector(".product_detail");
const cartCount = document.querySelector('.cart_content');
const btnAddToCart = document.querySelector('.add_to_cart');

btnAddToCart.addEventListener('click', addToCart);

function addToCart() {
    productInCart += productCounterValue;


    const productHTMLElement = `<div class="item">
    <img id='cart_pro' src="images/image-product-1-thumbnail.jpg" alt="product" >
    <div class="details">
        <div class="name">Fall Limited Edition Sneakers</div>
        <div class="price_group">
            <div class="orignal">$${price * discount} </div>X
            <div class="count">${productInCart} </div>
            <div class="total_amount">$${(price * discount * productInCart).toFixed(2)} </div>
        </div>
    </div>
    <img id='deletee' src="images/icon-delete.svg" alt="delete" >
</div>`;

    shoppingCart.innerHTML = productHTMLElement;
    updateCart();

    const btnDelete = document.querySelector('#deletee');

    btnDelete.addEventListener('click', deleteProduct);
}

function updateCart() {
    updateProductInCart();
    updateEmptyCart();
    updateCheckout();
}

function updateProductInCart() {
    cartCount.textContent = productInCart;
    if (productInCart == 0) {
        if (!cartCount.classList.contains('hiddenC')) {
            cartCount.classList.add('hiddenC')
        }
    }
    else {
        cartCount.classList.remove('hiddenC');
    }

}

function updateEmptyCart() {
    const msgEmpty = document.querySelector('.empty_msg');

    if (productInCart == 0) {
        if (msgEmpty.classList.contains('hidden_two')) {
            msgEmpty.classList.remove('hidden_two')
        }
    } else {
        msgEmpty.classList.add('hidden_two');
    }
}
function updateCheckout() {
    const btnCheckou = document.querySelector('.checkout');
    if (productInCart == 0) {
        if (!btnCheckou.classList.contains('hidden_two')) {
            btnCheckou.classList.add('hidden_two')
        }
    } else {
        btnCheckou.classList.remove('hidden_two');
    }
}

//--------Delete product-------
function deleteProduct() {
    productInCart--;
    updateCart();

    const count = document.querySelector(".count");
    const totalAmount = document.querySelector(".total_amount");

    count.innerHTML = productInCart;
    totalAmount.innerHTML = `$${(price * discount * productInCart).toFixed(2)}`

    if (productInCart == 0) {
        shoppingCart.innerHTML = '';
    }
}


