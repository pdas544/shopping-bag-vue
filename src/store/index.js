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
    },

    removeFromBag(state, productId) {
      
      state.productsInBag = state.productsInBag.filter(item => item.id !== productId);
      
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
