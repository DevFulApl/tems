
function toReal(value, str_cifrao) {
    return str_cifrao + ' ' + value.formatMoney(2, ',', '.');
}
var cart = {
    customerId: null,
    loadCustomerId: function(){
        if(!cart.customerId){
            const customerInfo = dataLayer.find(element => ('customerId' in element));
            cart.customerId = customerInfo ? customerInfo.customerId : null;
            console.log('cart.customerId',cart.customerId);
        }
    },
    session: function () {
        return jQuery("html").attr("data-session");
    },
    filterVariant: function(variants, selects){
        var i = 0;
        var select = selects.eq(0).val();

        if(!!select){
            var select2 = selects.eq(1).val();
            while(i < variants.length){
                if(variants[i].option == select && variants[i].option2 == select2){
                    return variants[i];
                }
                i++;
            }
        }
        return 500;
    },
    stockAlert: function(e){
        var variant = cart.filterVariant(jQuery(e).data('variants'), jQuery(e).find('select'));
        var quant = Number(e.find('input[type="number"]').val());

        e.find('input[type="number"]').attr('max', variant.stock).attr('data-variant', variant.id);

        var numberFormat = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
        var price = numberFormat.format(variant.price.price);
        var payment = variant.price.payment;

        e.closest('.product').find('.product-price').html('<div class="price-off new-price">'+ price +'</div><div class="product-payment">'+ payment +'</div>');

        if(Number(variant.stock) >= quant) {
            jQuery(e).removeClass('dont-stock');
        } else{
            jQuery(e).addClass('dont-stock');
        }

    },
    initAdd: function () {

        jQuery('body').on('change', '.add-cart input', function(){
            var total = Number(jQuery(this).val());
            jQuery(this).val(total > 0 ? total : 1);
        });

        jQuery('body').on('change', '.list-variants select', function() {

            if(jQuery(this).hasClass('first')){
                if(jQuery(this).parents('.list-variants').find('.second').val() || !jQuery(this).parents('.list-variants').find('.second').length){
                    cart.stockAlert(jQuery(this).parents('.list-variants'));
                }
            } else{
                if(jQuery(this).parents('.list-variants').find('.first').val()){
                    cart.stockAlert(jQuery(this).parents('.list-variants'));
                }
            }

        });

        jQuery('body').on('submit', '.list-variants', function(e){
            e.preventDefault();

            if(jQuery(this).hasClass('dont-stock')) return false;
            var id = jQuery(this).data('id');
            var quant = jQuery(this).find('input').val();
            var href = jQuery(this).parents('.product').find('> a').attr('href');
            var variant = jQuery(this).data('variants').length ? jQuery(this).find('input').attr('data-variant') : 0;
            var validaApi = jQuery(this).data('api-cart');

            cart.addToCart(id, quant, variant, href, validaApi);
        });
    },
    addToCart: function(productId, quantity, variant, href){

        cart.loadCustomerId();

        const data = {
            Cart: {
                session_id : cart.session(),
                product_id : productId,
                variant_id : variant ? variant : 0,
                quantity   : quantity
            }
        };

        if(cart.customerId){
            data.Cart.customer_id = cart.customerId;
        }

        jQuery.ajax({
            method: 'post',
            url: '/web_api/cart/',
            dataType: 'json',
            data: data,
            success: function(response) {
                // exibe o carrinho lateral ou faz a ação desejada pelo parceiro
                Exemplo: cart.showCart();
            },
            error: function( ){
                window.location.href = href;
            }
        });

    },


    removeProduct: function (element){

        var id = parseInt(jQuery(element).attr('data-id'));
        var variant = '/' + jQuery(element).attr('data-variant');
        var together = jQuery(element).attr('data-together') !== '' ? '/' + jQuery(element).attr('data-together') : '';
        var addText = jQuery(element).attr('data-add') == "" ? '' : jQuery(element).attr('data-add');

        jQuery.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + cart.session() + "/" + id + variant + together + "?" + jQuery.param({ "additional_information": addText })
        }).done(function(response) {
            cart.listProduct();
        }).fail(function(error) {
            cart.listProduct();
        })
    },

    listProduct: function () {
        jQuery.ajax({
            method: "GET",
            url: "/web_api/cart/" + cart.session(),
            success: function (response) {
                cart.forProduct(response);
            },
            error: function (error) {
                cart.forProduct([]);
            }
        });
    },

    total: function(price){
        jQuery('.cart-sidebar .total .value').text(toReal(parseFloat(price), 'R$'));
    },

    forProduct: function (listProducts) {

        var listDom = jQuery('.cart-sidebar .content-cart .list');
        listDom.find('*').remove();
        listDom.parent().removeClass('empty');

        var qnt = 0;
        var total = 0.0;
        var listId = [];

        if (listProducts.length) {

            listProducts.forEach(function (product) {

                product = product.Cart;
                var addMsg = product.additional_information;
                prices = product;
                var productImage = product.product_image.thumbs[90].https.length ? product.product_image.thumbs[90].https : '';
                listDom.append(cart.templateProduct(product.product_id, product.variant_id, product.product_name, productImage, product.quantity, product.price, product.product_url.https,addMsg,product.bought_together_id));
                qnt += parseInt(product.quantity);
                total += (parseFloat(product.price) * parseInt(product.quantity));
                listId.push(parseInt(product.product_id));

            });

            cart.total(total);

        } else {

            listDom.append('<div class="error"><div clas="text">Carrinho Vazio</div></div>');
            listDom.parent().addClass('empty');

        }
    },

    startCart: function () {

        jQuery('.cart-toggle').on('click', function(e){
            e.preventDefault();
            cart.showCart();
        });

        jQuery('.shadow-cart, .cart-sidebar .box-prev').on('click', function(e){
            jQuery('.cart-sidebar').removeClass('active');
        });

    },

    showCart: function(){
        cart.listProduct();
        jQuery('.cart-sidebar').addClass('active');
    },

    templateProduct: function (id, variant, name, image, qnt, price, url, addMsg, together) {

        var template = '\
            <div class="item">\
                <div class="box-cart flex align-center">\
                    <div class="box-image">\
                        <a href="{url}" class="image">\
                            <img src="{image}" alt="{name}" loading="lazy">\
                        </a>\
                    </div>\
                    <div class="info-product">\
                        <div class="line-top flex justify-between">\
                            <a href="{url}" class="name t-color">{name}</a>\
                            <div class="remove" data-id="{id}" data-together="{together}" data-variant="{variant}" data-add="{addMsg}" onclick="cart.removeProduct(this)">\
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 438.529 438.529">\
                                    <path d="M417.689,75.654c-1.711-1.709-3.901-2.568-6.563-2.568h-88.224L302.917,25.41c-2.854-7.044-7.994-13.04-15.413-17.989C280.078,2.473,272.556,0,264.945,0h-91.363c-7.611,0-15.131,2.473-22.554,7.421c-7.424,4.949-12.563,10.944-15.419,17.989l-19.985,47.676h-88.22c-2.667,0-4.853,0.859-6.567,2.568c-1.709,1.713-2.568,3.903-2.568,6.567v18.274c0,2.664,0.855,4.854,2.568,6.564c1.714,1.712,3.904,2.568,6.567,2.568h27.406v271.8c0,15.803,4.473,29.266,13.418,40.398c8.947,11.139,19.701,16.703,32.264,16.703h237.542c12.566,0,23.319-5.756,32.265-17.268c8.945-11.52,13.415-25.174,13.415-40.971V109.627h27.411c2.662,0,4.853-0.856,6.563-2.568c1.708-1.709,2.57-3.9,2.57-6.564V82.221C420.26,79.557,419.397,77.367,417.689,75.654z M169.301,39.678c1.331-1.712,2.95-2.762,4.853-3.14h90.504c1.903,0.381,3.525,1.43,4.854,3.14l13.709,33.404H155.311L169.301,39.678z M347.173,380.291c0,4.186-0.664,8.042-1.999,11.561c-1.334,3.518-2.717,6.088-4.141,7.706c-1.431,1.622-2.423,2.427-2.998,2.427H100.493c-0.571,0-1.565-0.805-2.996-2.427c-1.429-1.618-2.81-4.188-4.143-7.706c-1.331-3.519-1.997-7.379-1.997-11.561V109.627h255.815V380.291z"/>\
                                    <path d="M137.04,347.172h18.271c2.667,0,4.858-0.855,6.567-2.567c1.709-1.718,2.568-3.901,2.568-6.57V173.581c0-2.663-0.859-4.853-2.568-6.567c-1.714-1.709-3.899-2.565-6.567-2.565H137.04c-2.667,0-4.854,0.855-6.567,2.565c-1.711,1.714-2.568,3.904-2.568,6.567v164.454c0,2.669,0.854,4.853,2.568,6.57C132.186,346.316,134.373,347.172,137.04,347.172z"/>\
                                    <path d="M210.129,347.172h18.271c2.666,0,4.856-0.855,6.564-2.567c1.718-1.718,2.569-3.901,2.569-6.57V173.581c0-2.663-0.852-4.853-2.569-6.567c-1.708-1.709-3.898-2.565-6.564-2.565h-18.271c-2.664,0-4.854,0.855-6.567,2.565c-1.714,1.714-2.568,3.904-2.568,6.567v164.454c0,2.669,0.854,4.853,2.568,6.57C205.274,346.316,207.465,347.172,210.129,347.172z"/>\
                                    <path d="M283.22,347.172h18.268c2.669,0,4.859-0.855,6.57-2.567c1.711-1.718,2.562-3.901,2.562-6.57V173.581c0-2.663-0.852-4.853-2.562-6.567c-1.711-1.709-3.901-2.565-6.57-2.565H283.22c-2.67,0-4.853,0.855-6.571,2.565c-1.711,1.714-2.566,3.904-2.566,6.567v164.454c0,2.669,0.855,4.853,2.566,6.57C278.367,346.316,280.55,347.172,283.22,347.172z" />\
                                </svg>\
                            </div>\
                        </div>\
                        <div class="line-down">\
                            <div class="qnt">Quantidade: {length}</div>\
                            <div class="price">{price}</div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';

        price = toReal(parseFloat(price), 'R$');

        template = template.replace(/{url}/g,url);
        template = template.replace(/{image}/g,image);
        template = template.replace(/{name}/g,name);
        template = template.replace(/{id}/g,id);
        template = template.replace(/{variant}/g,variant);
        template = template.replace(/{length}/g,qnt);
        template = template.replace(/{addMsg}/g,addMsg);
        template = template.replace(/{price}/g,price);
        template = template.replace(/{together}/g,together);

        return template;

    }

}

jQuery(function(){
    cart.initAdd();
    cart.startCart();

});