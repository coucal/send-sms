import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'select',
  classNames: ['form-control'],
  lists: [],
  recipient: null,

  change(event) {
    const selectedListId = event.target.value;
    const selectedList = this.get('lists').find((record) => record.id === selectedListId);
    this.sendAction('action', selectedList, this.get('recipient'));
  }
});
