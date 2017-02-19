import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    var thisList = {
    list: this.store.findRecord('list', params.id),
    recipients: this.store.query('recipient', { orderBy: 'list', equalTo: params.id }) 
  };
  return thisList
},

  actions: {

    addNewRecipient(name, firstName, phone, list) {
      this.store.createRecord('recipient', { name, firstName, phone, list }).save().then((response) => {
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
