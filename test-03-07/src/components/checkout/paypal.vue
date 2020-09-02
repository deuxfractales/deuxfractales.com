<template>
  <div>
    <div id="paypal-button"></div>
  </div>
</template>

<script>

export default {
  name: 'Paypal',
  props: ['products', 'total'],
  data: function () {
    return {
      loaded: false,  
    };
  },
  mounted: function () {
    const client = document.createElement('script');
    client.src = "https://www.paypal.com/sdk/js?client-id=AS8sFDWaGYjHUZF3xxN9oeCU7l7x-XY4sb_XEKnNwuCqtZ3QJUu9MDHCvTGrfLZDBEWVfPZGx6NDftKm&currency=USD";
    client.addEventListener('load', this.setLoaded);
    document.body.appendChild(client);
    
    // const checkout = document.createElement('script');
    // checkout.src = "https://www.paypalobjects.com/api/checkout.js";
    // checkout.addEventListener('load', this.setLoaded);
    // document.body.appendChild(checkout);
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      paypal.Buttons({
        
        commit: true,

        style: {
            color:  'blue',
            shape:  'pill',
            label:  'pay',
            height: 40
        },

        createOrder: () => {
          return fetch('http://127.0.0.1:3001/orders/create', {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              products: this.products,
              total: this.total
            })
          }).then(function(res) {
            return res.json();
          }).then(function(data) {
            return data.orderID; 
          });
        },
        
        onApprove: (data) => {
          return fetch('http://127.0.0.1:3001/orders/payment', {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          }).then(function(res) {
            return res.json();
          }).then(function(details) {
            alert('Authorization created for ' + details.fullName);
          });
        }
      }).render('#paypal-button');
    }
  }  
};
</script>

<style scoped></style>
