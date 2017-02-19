import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('list');
  },


size: function() {
      // Here is where i go wrong, i can get the length of spreads, but not access a spread to get the page length.
      var recipients =  this.store.query('recipient', { orderBy: 'list', equalTo: params.id });
      console.log(recipients);
      return recipients.get('length');
  }.property('recipients'),
});
