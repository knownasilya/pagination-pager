import Ember from 'ember';

export default Ember.Controller.extend({
  current: 2,
  dynamicCount: 10,
  dynamicCurrent: 5,
  hidden: false,
  autoHide: true,

  actions: {
    pageChanged: function (direction, page, last) {
      console.log(direction, page, last);
    }
  }
});
