import Vue from 'vue';

function initialState() {
  return {
    name: '',
    description: '',
    index: ''
  };
}

export default {
  namespaced: true,

  state: {
    ...initialState()
  },

  getters: {
    wildcardIndex(state) {
      if (!state.index) return '';
      return state.index.replace(/%[Ymd]/g, '*');
    },

    strftime(state) {
      return state.index.includes('%Y') || state.index.includes('%m') || state.index.includes('%d');
    }
  },

  mutations: {
    /*eslint-disable */
    RESET(state) {
      /* eslint-enable */
      state = Object.assign(state, initialState());
    },

    UPDATE_NAME(state, name) {
      state.name = name;
    },

    UPDATE_DESCRIPTION(state, description) {
      if (description) {
        state.description = description;
      } else {
        Vue.delete(state, 'description');
      }
    },

    UPDATE_INDEX(state, index) {
      state.index = index;
    }
  }
};