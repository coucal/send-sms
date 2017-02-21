import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  created: DS.attr('date'),
  size:DS.attr('number'),
  recipients: DS.hasMany('recipient', {inverse:'list', async: true}),

  isValid: Ember.computed.notEmpty('name'),

  isEditing: false
});
