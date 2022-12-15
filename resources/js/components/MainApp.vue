<template>

    <!-- START HEADER -->
    <header>
        <div class="container">

            <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
                    <span class="fs-3 logo">EVOS</span>
                </a>
                <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <a v-for="link in page.header.links" class="me-3 py-2 text-dark text-decoration-none" :href="link.link">
                        <p class="links">{{ link.name }}</p>
                    </a>
                </nav>
                <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <button class="btn btn-success cart" @click="showCart">
                        <i class="fa-solid fa-cart-shopping"></i> Cart <span class="cart-circle">{{ cart.length }}</span>
                    </button>
                </nav>
            </div>
        </div>
    </header>
    <!-- END HEADER -->

    <main>
        <div class="container">
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 class="display-5 fw-normal">Menu</h1>
            </div>

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                <div v-for="product in products" class="col">
                    <div class="card shadow-sm">
                        <img :src="'/assets/img' + product.image" class="bd-placeholder-img card-img-top" width="100%" height="225">

                        <div class="card-body product-info">
                            <p class="card-text">
                                <b>{{ product.name }}</b>
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">{{ priceFormat(product.price, " so'm") }}</small>
                                <button @click="addToCart(product.id)" type="button" class="btn btn-warning"><i class="fa fa-plus"></i> Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </main>

    <footer style="background-color: #ebedf8; margin-top: 30px;">
        <div class="container">
            <div class="row">
                <div class="col-12 py-5">
                    <span class="fs-3 logo">EVOS</span>
                </div>
                <div class="col-12 pb-5">
                    <div class="row">
                        <div class="col-md-6">© Evos 2006 - 2022 All rights reserved</div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">

                    <div class="row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="col-12" style="text-align: center;">
                            <h4>Buyurtmani tasdiqlang</h4>
                        </div>
                        <div v-if="cart.length" class="col-12" style="padding: 20px 0;">
                            <div class="row">
                                <div v-for="cProduct in cart" class="col-12" style="padding: 0 40px;">
                                    <div class="row" style="align-items: center;">
                                        <div class="col-3">
                                            <img :src="'/assets/img' + cProduct.image" class="img-fluid">
                                        </div>
                                        <div class="col-9 p-3">
                                            <p class="fs-4 fw-bold">{{ cProduct.name }}</p>
                                            <div class="d-flex" style="justify-content: space-between; align-items: flex-end;">
                                                <p class="fs-5" style="text-align: right;">{{ priceFormat(cProduct.price, " so'm") }}</p>
                                                <button @click="removeFromCart(cProduct.id)" class="btn btn-outline-light text-muted"><i class="fa-solid fa-xmark"></i> Bekor qilish</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <p class="totlaPrice fw-bold fs-4 text-center">
                                    Umumiy: {{ priceFormat(cartDetails.totalPrice, " so'm") }}
                                </p>
                            </div>
                        </div>
                        <div v-else class="p-5">

                            <div class="d-flex" style="flex-direction: column; align-items: center;">
                                <img src="/assets/img/front/empty-cart.png" class="img-fluid">
                                <h3>Sizning savatingiz bo'sh</h3>
                            </div>

                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="form-group p-4">
                                    <div class="mb-3">
                                        <label for="form1" class="form-label">Phone:</label>
                                        <input v-model="customerDetails.name" type="text" class="form-control" id="form1" placeholder="Sardor">
                                    </div>
                                    <div class="mb-3">
                                        <label for="form2" class="form-label">Phone:</label>
                                        <input v-model="customerDetails.phone" type="text" class="form-control" id="form2" placeholder="+998 90 123 45 67">
                                    </div>
                                    <div class="mb-3">
                                        <label for="form3" class="form-label">Address:</label>
                                        <input v-model="customerDetails.address" type="text" class="form-control" id="form3" placeholder="Toshkent shahar">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="text-align: center;">
                            <button type="button" class="btn btn-danger" @click="clearFromCart()">
                                <i class="fa-solid fa-xmark"></i>
                                Bekor qilish
                            </button>
                            <button v-if="cart.length" type="button" class="btn btn-success" @click="orderNow()">
                                <i class="fa-solid fa-check"></i>
                                Buyurtma qilish
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
import apiPos from "../api/apiPos";
export default {
    name: "MainApp",
    data() {
        return  {
            cart: [],
            cartDetails: {
                totalPrice: 0,
            },
            customerDetails: {
                name: "",
                address: "",
                phone: "+998 "
            },
            company: {
                phone: '',
                email: '',
            },
            page: {
                header: {
                    links: [
                        { name: "Asosiy", link: "/index.html" },
                        { name: "Filiallar", link: "/filial.html" },
                        { name: "Vakantlar", link: "#" },
                        { name: "Yangiliklar", link: "#" },
                        { name: "Biz haqimizda", link: "#" },
                        { name: "Kontaktlar", link: "#" },
                    ]
                }
            },
            products: [
                { id: 1, name: "Mol go'shti bilan lavash Mini", price: "19000", image: "/food/lavash.png" },
                { id: 2, name: "Tovuq va pishloqli lavash", price: "26000", image: "/food/lavash.png" },
                { id: 3, name: "Tovuqli achchiq lavash", price: "23000", image: "/food/achchiq_lavash.png" },
                { id: 4, name: "Mol go'shti Shawarma mini", price: "20000", image: "/food/shawrma.png" },
                { id: 5, name: "Shawarma tovuq bilan", price: "22000", image: "/food/shawrma.png" },
                { id: 6, name: "Tovuqli achchiq shawarma ", price: "19000", image: "/food/shawrma.png" },
                { id: 7, name: "Gamburger", price: "20000", image: "/food/gamburger.png" },
                { id: 8, name: " Dublburger", price: "29000", image: "/food/gamburger.png" },
                { id: 9, name: "Chizburger", price: "22000", image: "/food/gamburger.png" },
                { id: 10, name: "Hot dog", price: "12000", image: "/food/hot_dog.png" },
                { id: 11, name: "Double hot dog", price: "18000", image: "/food/hot_dog.png" },
                { id: 12, name: "Mini hot-dog", price: "8000", image: "/food/hot_dog_mini.png" },
                { id:13, name: "Mol go'shti bilan donor", price: "40000", image: "/food/donar.png" },
                { id: 14, name: "Tovuq bilan donor", price: "38000", image: "/food/hot_dog.png" },
                { id: 15, name: "Strips", price: "17000", image: "/food/strips.png" },
                { id: 16, name: "combo plus", price: "16000", image: "/food/kombo_plus.png" },
                { id: 17, name: "Combo plus issiq (kok choy)", price: "16000", image: "/food/combo6.png" },
                { id: 18, name: "FitCOMBO", price: "29000", image: "/food/fit_combo.png" },
                { id: 19, name: "Asal keki", price: "14000", image: "/food/asal_keki.png" },
                { id: 20, name: "Pishloq keki", price: "14000", image: "/food/cheesecake.png" },
                { id: 21, name: "Donut Berry aralashmasi", price: "14000", image: "/food/donat_klubnichniy.png" },
                { id: 21, name: "Donut Berry aralashmasi", price: "14000", image: "/food/donat_klubnichniy.png" },
                { id: 21, name: "Donut Berry aralashmasi", price: "14000", image: "/food/donat_klubnichniy.png" },
                { id: 21, name: "Donut Berry aralashmasi", price: "14000", image: "/food/donat_klubnichniy.png" },

            ]
        }
    },
    created() {
        console.log('Vue Created')
        $(document).ready(function(){
            if (jQuery) {
                console.log('Jquery working')
            } else {
                alert("Jquery not working");
            }
        });
    },
    mounted() {
        console.log('Vue Mounted')
    },
    methods: {
        showCart(){
            console.log('open cart');
            $(document).ready(function() {
                $('#cartModal').modal('show');
            });
        },
        addToCart(id){
            console.log('product added (id: ' + id + ')')
            this.cart.push(
                this.getProductByID(id)
            )
            this.sumCart()

        },
        sumCart(){
            let totalSum = 0;
            this.cart.forEach(function (cartProduct, index) {
                totalSum += parseInt(cartProduct.price)
            })
            this.cartDetails.totalPrice = totalSum
        },
        removeFromCart(id){
            let removeCartIndex;
            this.cart.forEach(function (eid, index){
                console.log(eid)
                if (eid.id === id) {
                    console.log('remove: id ' + id)
                    removeCartIndex = index;
                }
            })
            this.cart.shift(removeCartIndex)
            this.sumCart()
        },
        clearFromCart(){
            this.cart = []
            this.sumCart()
        },
        getProductByID(id){
            console.log('get product (id: ' + id + ')')
            let selected = this.products.filter(d => d.id === id)[0];
            console.log(selected)
            return selected

        },
        orderNow(){
            let order = {
                cart: this.cart,
                customer: this.customerDetails,
                totalPrice: this.cartDetails.totalPrice
            }
            apiPos.sendOrder(order).then((response) => {
                if(response.data.status){
                    console.log('order sent')
                    console.log(response.data)
                    this.cart = []
                    this.cartDetails = {
                        totalPrice: 0,
                    }
                    this.customerDetails = {
                        name: "",
                        address: "",
                        phone: "+998 ",
                    }
                    //$('#payment-popup').modal('hide')
                    document.getElementById('cartModal').click();
                    //this.products = response.data.data
                }else{
                    console.log(response.data)
                }
            })
            console.log(order)
        },
        priceFormat(price, add = ''){
            return this.number_format(price, 0, '.', ' ') + '' + add;
        },
        number_format (number, decimals = 0, dec_point = '.', thousands_sep = ' ') {
            // Strip all characters but numerical ones.
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        }
    }
}
</script>

<style scoped>

</style>
