import { createStore } from 'vuex';
const store = createStore({
  state () {
    return {
      count: 0
    };
  }
  // mutations: {
  //   increament () {
  //     state.count++;
  //   }
  // }
});

export default store;
