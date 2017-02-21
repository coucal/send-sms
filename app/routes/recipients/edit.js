import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return Ember.RSVP.hash({
      //recipients:this.store.findAll('recipient'),
      recipient: this.store.findRecord('recipient', params.recipient_id),
      lists:this.store.findAll('list')
    });
  },



  setupController(controller, model) {
    const recipient = model.recipient;
    const lists = model.lists;

    this._super(controller, model);

    controller.set('title', 'Edit recipient');
    controller.set('buttonLabel', 'Save changes');
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


    willTransition(transition) {
      let model = this.controller.get('model').recipient;

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
