import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    limit: { refreshModel: true },
    letter: { refreshModel: true }
  },

  model(params) {
    if (params.limit === 'all') {
      return Ember.RSVP.hash({
        recipients:this.store.findAll('recipient'),
        lists:this.store.findAll('list')
      });
    }

    return Ember.RSVP.hash({
      lists:this.store.findAll('list'),
      recipients: this.store.query('recipient', {
          orderBy: 'name',
          startAt: params.letter,
          endAt: params.letter+"\uf8ff"
      })
    });
  },

  setupController(controller, model) {
    const recipients = model.recipients;
    const lists = model.lists;

    this._super(controller, recipients);

    controller.set('recipients', recipients);
    controller.set('lists', lists);
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
