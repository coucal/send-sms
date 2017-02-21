import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    limit: { refreshModel: true },
    letter: { refreshModel: true }
  },

  model(params) {

    if (params.limit === 'all') {
      return this.store.findAll('list');
    }

    return this.store.query('list', {
      orderBy: 'name',
      startAt: params.letter,
      endAt: params.letter+"\uf8ff"
    });
  },

  actions: {

    deleteList(list) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        list.destroyRecord();
      }
    }
  }

});
