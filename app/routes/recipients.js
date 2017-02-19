import Ember from 'ember';

export default Ember.Route.extend({

  model() {
/*    return [
      { id: 1,
        name: "Couchot",
        firstName : "Alain",
        phone : "+33687504497"
      },
      { id: 2,
        name: "Griesinger",
        firstName : "Pascale",
        phone : "+33662177656"
      }
    ]*/
    return this.store.findAll('recipient');
  },

  actions: {

    addNewRecipient(id, name, firstName, phone) {
      this.store.createRecord('recipient', { id, name, firstName, phone }).save().then((response) => {
        this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
        this.set('name', '');
      };
    },
    deleteRecipient(recipient) {
      recipient.destroyRecord();
    }

  }
});
