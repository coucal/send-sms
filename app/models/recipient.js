import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  firstName: DS.attr('string'),
  phone: DS.attr('string'),
  list :DS.belongsTo('list',{inverse: 'recipients', async: true}),

  isEditing: false
});
