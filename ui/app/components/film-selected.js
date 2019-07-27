import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames:["film-selected"],
  router: inject(),
  config: inject(),

  apiDomain: computed('config', function(){
    return this.get("config").getAPIDomain();
  }),

  actions: {
    backButtonClick() {
      this.get('router').transitionTo('home');
    }
  }
});
