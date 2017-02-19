import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  created: DS.attr('date'),
  recipients: DS.hasMany('recipient'),

  isEditing: false
});
