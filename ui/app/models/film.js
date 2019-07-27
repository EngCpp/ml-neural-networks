import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  categories: DS.attr(),
  views: DS.attr('number'),
  image: DS.attr('string'),
  rating: DS.attr('number')
});
