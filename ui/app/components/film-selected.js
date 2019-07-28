import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames:["film-selected"],
  router: inject(),
  config: inject(),

  domain: computed('config', function(){
    return this.get("config").getDomain();
  }),

  actions: {
    backButtonClick() {
      this.get('router').transitionTo('home');
    }
  }
});
