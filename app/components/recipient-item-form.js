import Ember from 'ember';

export default Ember.Component.extend({

  buttonLabel: 'Save',

  actions: {

    buttonClicked(param) {
      this.sendAction('action', param);
    },

    saveList(list, recipient) {
      // Firebase adapter is buggy, we have to manually remove the previous relation
      if(!Ember.isEmpty(recipient.list.Id)) {
              console.log(recipient.list.Id);
      recipient.get('list').then((previousList) => {
      previousList.get('recipients').then((previousListRecipients) => {
      previousListRecipients.removeObject(recipient);
      previousList.save();
        });
      })
    } else {
      console.log("IS EMPTY");
    }

      // Setup the new relation
      recipient.set('list', list);
      recipient.save().then(() => list.save());
    },

  }
});
