import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('recipient');
  },

  actions: {

    addNewRecipient(name, firstName, phone) {
      this.store.createRecord('recipient', { name, firstName, phone }).save().then((response) => {
        this.controller.set('responseMessage', `Recipient saved with the following id: ${response.get('id')}`);
        this.controller.set('newRecipientName', '');
        this.controller.set('newRecipientFirstName', '');
        this.controller.set('newRecipientPhone', '');
      });
    },
    editRecipient(recipient) {
      recipient.set('isEditing', true);
    },
    cancelUpdate(recipient) {
      recipient.set('isEditing', false);
    },
    updateRecipient(recipient) {
      recipient.save().then(
        recipient => recipient.set('isEditing', false)
      );
    },
    deleteRecipient(recipient) {
      recipient.destroyRecord();
    }

  }
});
