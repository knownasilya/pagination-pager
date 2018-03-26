import Controller from '@ember/controller';

export default Controller.extend({
  current: 2,
  dynamicCount: 10,
  dynamicCurrent: 5,
  hidden: false,
  autoHide: true,

  actions: {
    pageChanged: function (direction, page, last) {
      // eslint-disable-next-line no-console
      console.log(direction, page, last);
    }
  }
});
