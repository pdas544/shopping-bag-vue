import { createStore } from 'vuex'
 import axios from 'axios';

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    setProducts(state, products) {
      //update the state with the fetched products
      state.products = products;
    },

    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    },

    setProductsInBag(state, productsInBag) {
      state.productsInBag = productsInBag;
    },

    removeFromBag(state, productId) {
      
      state.productsInBag = state.productsInBag.filter(item => item.id !== productId);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
      
    }
  },
  actions: {
      loadProducts({commit}){
        axios.get('/api/products')
      .then(response => 
        // console.log(response.data))
        //calling mutation to update state
        commit('setProducts', response.data))
      .catch(error => {
        console.error('Error fetching products:', error);
      });

      },
      
      //load products in the bag from local storage
      loadProductsInBag({commit}){
        //check the local storage for products in the bag
        if(localStorage.getItem('productsInBag')){
     
        commit('setProductsInBag', JSON.parse(localStorage.getItem('productsInBag')));
        }
      },

      addToBag({commit}, product) {
        //check if the product is already in the bag
        commit('addToBag', product);
      },

      removeFromBag({commit}, productId) {
        //check if the product is already in the bag
        if(confirm('Are you sure you want to remove this product from the bag?')) {
        commit('removeFromBag', productId);
        }
      }
  },
  modules: {
  }
})
