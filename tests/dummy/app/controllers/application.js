import Ember from 'ember';

export default Ember.Controller.extend({
  current: 2,
  dynamicCount: 10,
  dynamicCurrent: 5,

  actions: {
    pageChanged(direction, page, last) {
      console.log(direction, page, last);
    }
  }
});
