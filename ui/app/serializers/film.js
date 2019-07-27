import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = {
      films: payload.map(rec => {
          return {
                id: rec.id,
                name: rec.name,
                views: rec.views,
                image: rec.image,
                rating: rec.rating,
                type: 'film',
                categories: rec.categories.map(cat => {
                  return {
                    id: cat.id,
                    name: cat.name,
                    type: 'category'
                  }
                })
              }
          })
    };

    return this._super(store, primaryModelClass, payload, id, requestType);
  }

});
