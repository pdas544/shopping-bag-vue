import { createStore } from 'vuex'
 import axios from 'axios';

export default createStore({
  state: {
    products: []
  },
  mutations: {
    setProducts(state, products) {
      //update the state with the fetched products
      state.products = products;
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

      }
  },
  modules: {
  }
})
