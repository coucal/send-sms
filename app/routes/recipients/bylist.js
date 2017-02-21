import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return Ember.RSVP.hash({
      //recipients:this.store.findAll('recipient'),
      recipients: this.store.query('recipient', { orderBy: 'list', equalTo: params.list_id }),
      list:this.store.findRecord('list', params.list_id),
    });
  },

  setupController(controller, model) {
    const recipients = model.recipients;
    const list = model.list;

    this._super(controller, recipients);

    controller.set('recipients', recipients);
    controller.set('list', list);
  },



  actions: {

      editRecipient(recipient) {
          recipient.set('isEditing', true);
        },

        cancelRecipientEdit(recipient) {
          recipient.set('isEditing', false);
          recipient.rollbackAttributes();
        },

        saveRecipient(recipient) {
          if (recipient.get('isNotValid')) {
            return;
          }

          recipient.set('isEditing', false);
          recipient.save();
        },


        editList(recipient) {
          recipient.set('isListEditing', true);
        },

        cancelListEdit(recipient) {
          recipient.set('isListEditing', false);
          recipient.rollbackAttributes();
        },

        saveList(list, recipient) {
          // Firebase adapter is buggy, we have to manually remove the previous relation.
          // You don't need this callback mess when your adapter properly manages relations.
          // If Firebase fix this bug, we can remove this part.
         recipient.get('list').then((previousList) => {
            previousList.get('recipients').then((previousListRecipients) => {
              previousListRecipients.removeObject(recipient);
              previousList.save();
            });
          });

          recipient.set('list', list);
          recipient.save().then(() => list.save());
          recipient.set('isListEditing', false);
        }
      }
    });
