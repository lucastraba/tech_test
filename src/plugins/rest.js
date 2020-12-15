import RestService from '@/services/APIDataProvider';

const restActions = new RestService();

export default {
  install (Vue) {
    Vue.prototype.$restActions = restActions;
  }
};
