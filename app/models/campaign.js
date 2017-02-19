import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  created: DS.attr('date'),
  sent: DS.attr('date'),
  list:DS.attr('string'),
  message: DS.attr('string'),


  isEditing: false
});
