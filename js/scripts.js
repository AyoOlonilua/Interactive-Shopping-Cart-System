$(document).ready(function() {
    // Cart Storage
    let cart= [];
    
    // Add to Cart
    $(".add-to-cart").click(function() {
        const name= $(this).data("name");
        const price= parseFloat($(this).data("price"));
    
    // Find an item
    const checkItem= cart.find(function(item) {
        return item.name === name;
    });
    
    //Checks if the item exist and if it exists collects it
    if (checkItem) {
        checkItem.quantity++;  
    }
    else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        })
    }
    updateCart();
    });
    
    //Updating Cart
    function updateCart() {
        const cartSection= $(".cart");
        cartSection.html("");
    
        let totalItems= 0;
        let totalPrice= 0;
    
        //Loop through cart
        cart.forEach(function(item) {
            totalItems = totalItems + item.quantity;
            totalPrice = totalPrice + (item.price * item.quantity);
        });
    
        cartSection.append(
            '<div class="relative mb-3">' +  

                    '<p class="flex items-center justify-center text-red-500 text-2xl font-bold">' + 'Your Cart' +
                    '</p>' +
                    '<img src="img/cart.jfif" class="w-full" alt="cart image">' +
            '</div>'
        );
        //Looping to Display items
        cart.forEach(function(item) {
            cartSection.append(
                '<div class="flex justify-between items-center mt-3 border-b p-2">' +
                  '<div>' +
                    '<p class="font-bold">' + item.name + '</p>' +
                    '<p>$' + item.price + ' x ' + item.quantity + '</p>' +
                  '</div>' +
        
                  //Buttons to increase, decrease and remove items in the cart
                  '<div class="flex gap-2">' +
                    '<button class="increase px-2 bg-green-500" data-name="' + item.name + '">+</button>' +
                    '<button class="decrease px-2 bg-yellow-400" data-name="' + item.name + '">-</button>' +
                    '<button class="remove px-2 bg-red-500" data-name="' + item.name + '">x</button>' +
                  '</div>' +
                '</div>'
            );
        });
    
        //Show the Total + Actions
        if (cart.length > 0) {
            cartSection.append(
                '<div class="mt-5">' +
                  '<p class="font-bold text-lg">Total: $' + totalPrice.toFixed(2) + '</p>' +
        
                  '<button id="confirmOrder" class="bg-green-500 text-white p-2 mt-3 rounded w-full hover:bg-green-600">' +
                    'Confirm Order' +
                  '</button>' +
        
                  '<button id="resetCart" class="bg-gray-500 text-white p-2 mt-2 rounded w-full hover:bg-gray-600">' +
                    'Start New Order' +
                  '</button>' +
                '</div>'
            );
        }
    }
    
        $(document).on("click", ".increase", function() {
            const name= $(this).data("name");

            //Locates item in cart
            const item= cart.find(function(i) {
                return i.name === name;
            });
    
            if (item) {
                item.quantity++;
            }

            updateCart();
        });
    
        $(document).on("click", ".decrease", function() {
            const name= $(this).data("name");
            const item= cart.find(function(i) {
                return i.name === name;
            });
    
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart= cart.filter(function(i) {
                        return i.name !== name;
                    });
                }
            }

            updateCart();
        });
    
        $(document).on("click", ".remove", function() {
            const name= $(this).data("name");
    
            cart= cart.filter(function(item) {
                return item.name !== name;
            });
            updateCart();
        });
    
    
        $(document).on("click", "#confirmOrder", function() {
            alert("🎉 Order Confirmed!");
            cart= [];
            updateCart();
        });
    
        $(document).on("click", "#resetCart", function() {
            cart= [];
            updateCart();
        });
})
