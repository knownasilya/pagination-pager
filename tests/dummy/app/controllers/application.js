import Controller from '@ember/controller';

export default Controller.extend({
  current: 2,
  dynamicCount: 10,
  dynamicCurrent: 5,
  hidden: false,
  autoHide: true,

  actions: {
    pageChanged(current, last) {
      this.set('dynamicCurrent', current);
      // eslint-disable-next-line no-console
      console.log(current, last);
    },
  },
});
