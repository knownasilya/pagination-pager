import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    pageChanged: function (direction, page, last) {
      console.log(direction, page, last);
    }
  }
});
