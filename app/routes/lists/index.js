import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('list');
  },

  actions: {

    addNewList(name) {
      const created=new Date();
      this.store.createRecord('list', { name, created }).save().then((response) => {
      this.controller.set('responseMessage', `List saved with the following id: ${response.get('id')}`);
      this.controller.set('newListName', '');
      });
    },
    editList(list) {
      list.set('isEditing', true);
    },
    cancelUpdate(list) {
      list.set('isEditing', false);
    },
    updateList(list) {
      list.save().then(
        list => list.set('isEditing', false)
      );
    },
    deleteList(list) {
      list.destroyRecord();
    }

  }
});
