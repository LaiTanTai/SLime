function Helpers(selector){
    return document.querySelector(selector);
}
let cart = JSON.parse(localStorage.getItem('orderProduct')) || [];
getData()
function getData(){
    APIgetdata()
    .then((res)=>{
        const products = res.data.map((product)=>{
            return new Product(
                product.name,
                product.price,
                product.img,
                product.description,
                product.type
            )
        })
        renderProduct(products)
    })
    .catch((err)=>{
        alert("Can't get infomation");
    })
}
function order(name,img,price){
    let k = true ;
    for(let i = 0 ; i < cart.length ; i++){
        if(cart[i].name == name){
            k = false;
            cart[i].quality++;
            addlocalstorage();
            break;
        }
    }
    if(k==true){
        const orderProduct = new cartItem(name,img,price);
        console.log(orderProduct)
        orderProduct.quality + 1;
        cart.push(orderProduct);
        addlocalstorage();
    }
}
    
function gettype(){
    const type = Helpers(".dropdown-value").value;
    APIgetdata()
    .then((res)=>{
        const products = res.data.filter((product)=>{
            if(product.type == type){
                return product
            }
        })
        console.log(products)
        renderProduct(products) 
    })
    .catch((err)=>{
        alert("can't reach the information");
    })
}
function add(name){
 
    for(let i = 0 ; i < cart.length ;i++){
        if(cart[i].name == name){
            cart[i].quality++ ;
        }
    }
    addlocalstorage()
    renderCart();
}
function subtract(name){
    for(let i = 0 ; i < cart.length ;i++){
        if(cart[i].name == name){
            if(cart[i].quality == 0){
                alert("")
            }else{
                cart[i].quality--;
                addlocalstorage();
                renderCart();
            }
        }
    }
}
function remove(name){
    cart = cart.filter((product)=>{
        if(product.name != name){
            return product;
        }
    })
    addlocalstorage()
    renderCart();
}
function renderCart(){
    let html = "";
    html = cart.reduce((results,product) =>{
        return (
        results +
        `
            <tr>
            <td><img src="${product.img}"></td>
            <td class="name">${product.name}</td>
            <td class="price">${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
            <td>
                
                <button class="subtract" onclick = "subtract('${product.name}')" >-</button>
                <span>${product.quality}</span>
                <button class="add" onclick = "add('${product.name}')">+</button>
                <button class="remove" onclick="remove('${product.name}')">Hủy</button>
            </td>
            </tr>
        `
        );
    },"")
    let sum = cart.reduce((results,product)=>{
        return(
            results + (product.price*product.quality)
        )
    },0)
    Helpers(".cartItem").innerHTML = html
    Helpers(".footer").innerHTML = 
    `
        <tr>
            <td class="sum col-6">Tổng tiền</td>
            <td class="price">${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(sum)}</td>
            <td><button class="pay" onclick = "clearstorage()">Thanh Toán</button></td>
        </tr> 
    `
}
function renderProduct(products){
    let html = ""
    html = products.reduce((results,product)=>{
        return (
            results +
            `
                <div class="size">
                    <img src="${product.img}">
                    <div class="text">
                    <p class="name">${product.name}</p>
                    <P class="type">${product.type}</P>
                    <p class="price">${product.price.toLocaleString('it-IT',{style : 'currency',currency : 'VND'})}</p>
                    <button class="cart" onclick=\"order('${product.name}','${product.img}','${product.price}')\">Đặt hàng</button>
                    </div>
                </div>        
            `
        )
    },"");
    Helpers(".item").innerHTML = html;
}   
function addlocalstorage(){
    const cartProduct = JSON.stringify(cart);
    localStorage.setItem('orderProduct',cartProduct);
}
function clearstorage(){
    localStorage.clear() ;
    cart = []
    renderCart()
}