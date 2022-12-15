 type="module"
    var vm = new Vue({
        el: '#app',
        data: {
            cart: [],
            cartDetails: {
                totalPrice: 0,
            },
            customerDetails: {
                address: "",
                phone: ""
            },
            company: {
                phone: '',
                email: '',
            },
            page: {
                header: {
                    links: [
                        { name: "Asosiy", link: "./index.html" },
                        { name: "Filiallar", link: "./filial.html" },
                        { name: "Vakantlar", link: "#" },
                        { name: "Yangiliklar", link: "#" },
                        { name: "Biz haqimizda", link: "#" },
                        { name: "Kontaktlar", link: "#" },
                    ]
                }
            },
            products: [
                { id: 1, name: "Mol go'shti bilan lavash Mini", price: "19 000", image: "/food/lavash.png" },
                { id: 2, name: "Tovuq va pishloqli lavash", price: "26 000", image: "/food/lavash.png" },
                { id: 3, name: "Tovuqli achchiq lavash", price: "23 000", image: "/food/achchiq_lavash.png" },
                { id: 4, name: "Mol go'shti Shawarma mini", price: "20 000", image: "/food/shawrma.png" },
                { id: 5, name: "Shawarma tovuq bilan", price: "22 000", image: "/food/shawrma.png" },
                { id: 6, name: "Tovuqli achchiq shawarma ", price: "19 000", image: "/food/shawrma.png" },
                { id: 7, name: "Gamburger", price: "20 000", image: "/food/gamburger.png" },
                { id: 8, name: " Dublburger", price: "29 000", image: "/food/gamburger.png" },
                { id: 9, name: "Chizburger", price: "22 000", image: "/food/gamburger.png" }, 
                { id: 10, name: "Hot dog", price: "12 000", image: "/food/hot_dog.png" },
                { id: 11, name: "Double hot dog", price: "18 000", image: "/food/hot_dog.png" },
                { id: 12, name: "Mini hot-dog", price: "8 000", image: "/food/hot_dog_mini.png" },
                { id:13, name: "Mol go'shti bilan donor", price: "40 000", image: "/food/donar.png" },
                { id: 14, name: "Tovuq bilan donor", price: "38 000", image: "/food/hot_dog.png" },
                { id: 15, name: "Strips", price: "17 000", image: "/food/strips.png" },
                { id: 16, name: "combo plus", price: "16 000", image: "/food/kombo_plus.png" },
                { id: 17, name: "Combo plus issiq (kok choy)", price: "16 000", image: "/food/combo6.png" },
                { id: 18, name: "FitCOMBO", price: "29 000", image: "/food/fit_combo.png" },
                { id: 19, name: "Asal keki", price: "14 000", image: "/food/asal_keki.png" },
                { id: 20, name: "Pishloq keki", price: "14 000", image: "/food/cheesecake.png" },
                { id: 21, name: "Donut Berry aralashmasi", price: "14 000", image: "/food/donat_klubnichniy.png" },
                { id: 21, name: "Donut Berry aralashmasi", price: "14 000", image: "/food/donat_klubnichniy.png" },
                { id: 21, name: "Donut Berry aralashmasi", price: "14 000", image: "/food/donat_klubnichniy.png" },
                { id: 21, name: "Donut Berry aralashmasi", price: "14 000", image: "/food/donat_klubnichniy.png" },
                
            ]
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

                console.log(order)
            }
        }
    })

