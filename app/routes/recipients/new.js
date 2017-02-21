import Ember from 'ember';

export default Ember.Route.extend({


  model(params) {
    return Ember.RSVP.hash({
      //recipients:this.store.findAll('recipient'),
      recipient: this.store.createRecord('recipient'),
      lists:this.store.findAll('list')
    });
  },

  setupController(controller, model) {
    const recipient = model.recipient;
    const lists = model.lists;

    this._super(controller, model);

    controller.set('title', 'Create a new recipient');
    controller.set('buttonLabel', 'Create');
    controller.set('recipient', recipient);
    controller.set('lists', lists);
  },

  renderTemplate() {
    this.render('recipients/form');
  },

  actions: {

    saveRecipient(newRecipient) {
      newRecipient.save().then(() => this.transitionTo('recipients'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').recipient.rollbackAttributes();
    }
  }
});
