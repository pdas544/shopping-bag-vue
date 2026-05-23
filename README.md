# Shopping Bag using Vue, VuEx and Vue-Router

## 15.05.26

- Using `axios` to fetch products from API: https://fakestoreapi.com/api
- Inspect -> Network shows Respone Blocking (Cross-Origin Response Blocking) CORB
- Modify `vite.config.js` to add proxy for the api. Proxy prevents Cross-Origin Response Blocking
- Now, use `/api/products` to retrieve products instead of original API

## Routing:

- Routes are defined in routes array in `src/routes/index.js`

*Step-1*:
- Create a New View - Product.vue (Product Component)

*Step-2*:
- Import the newly create Product Component
- Add a new route `/products` route in the routes array
```
 {
    path: '/products',
    name: 'Product',
    component: Product
  }
```

## 19.05.2026
## Vuex (Replaced by Pinia)
- State Management Pattern and Library
- It creates a global store for the data which can be shared among all components.
- It has 3 main components:
  - state: contains the shared data
  - mutations: which modifies the data
  - actions: ways the state could change in reaction to user inputs from the view.
- When we have multiple components that share a common state:

  - multiple views may depend on the same piece of state.
  - actions from different views may need to mutate the same piece of state.

### To use Vuex
- Step 1: Install it by running `npm install vuex@next`
- Step 2: Import it in the required file.  `import {createStore} from 'vuex'`
- Step 3: Export it like any other component.
- Step 4: Use it. `this.$store.state.[variable-name]`. Checkout: src/store/index.js

## 23.05.2026

1. **Using Vuex to fetch the products from the fakestore API**

- File Modified: `store/index.js`
- **Step 1:** Create a new state object to hold the products.
```
state: {
    products: [],
  },
```
- **Step 2:** Create a new action `loadProducts({commit})` which will fetch the data. Commit the action by passing the mutation and the response data `commit(setProducts,'response.data')`
```
actions: {
      loadProducts({commit}){
        axios.get('/api/products')
      .then(response => 
        commit('setProducts', response.data))
      .catch(error => {
        console.error('Error fetching products:', error);
      });
      }
}
```
- **Step 3:** Create a new mutation `setProducts(state, products)` which takes the `state` and `products` as the parameters and modifies/updates the `products`
```
mutations: {
    setProducts(state, products) {
      //update the state with the fetched products
      state.products = products;
    },

   
  }
```
- **Step 4:** Create a new **computed property** `products` which returns the newly created state.
- **NOTE**: state objects are typically used in a computed property.
- File Modified: `HomePage.vue`
```
 export default {
    
    computed: {
      products() {
        return this.$store.state.products;
      }
    }
 }
```
- **Step 5:** Display the products
```
<div class="product" v-for="product in products" :key="product.id">
          <div class="product-image" :style="{ backgroundImage: `url(${product.image})` }"></div>
          <h4>{{ product.title }}</h4>
          <p class="price">US$ {{ product.price.toFixed(2) }}</p>
          <button >Add to bag</button>          
        </div>
</div>
```

2. **Adding an Item to the Shopping Bag/Cart**

- Following the above process, create an object in the global state to store the items in the bag. 




