if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}
function ready(){
    var  removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for(var i = 0; i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}
var quantityInputs = document.getElementsByClassName("cart-quantity-input")
for(var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener("change", quantityChange)
}
var addToCartButton = document.getElementsByClassName('shop-item-button')
for(var i = 0; i < addToCartButton.length; i++){
    var buttons = addToCartButton[i]
    buttons.addEventListener('click', addItemToCart)
}
var purchase = document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseItems)

}

function purchaseItems(e){
   alert('Thankyou for your purchase')
   var cartItems = document.getElementsByClassName('cart-items')[0]
   while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
   }
   updateCartTotal()
}
function addItemToCart(e){
var cart = e.target
var shopItem = cart.parentElement.parentElement
var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
var imagesrc = shopItem.getElementsByClassName('shop-item-image')[0].src
addItemsToCart(title, price, imagesrc)
updateCartTotal()

}
function addItemsToCart(title, price, imagesrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemName = document.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemName.length; i++){
        if(cartItemName[i].innerText == title){
            alert('This item is already in the cart')
            return
        }
    }
    var cartRowContent = `
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>`
     cartRow.innerHTML = cartRowContent
     cartItems.append(cartRow)
     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
}
function removeCartItem(e){
    var buttonClicked = e.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChange(e){
    var input = e.target
    if(isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    updateCartTotal()
}


function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceQuantity = cartRow.getElementsByClassName("cart-price")[0]
        var valueQuantity = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceQuantity.innerText.replace("$", ''))
        var quantity = valueQuantity.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total
}