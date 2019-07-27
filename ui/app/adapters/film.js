import DS from 'ember-data';
import { inject } from '@ember/service';
import { computed } from '@ember/object'

export default DS.RESTAdapter.extend({
  config: inject(),

  host:  computed('config', function() {
    return this.get("config").getAPIDomain();
  }),

});
