import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames:["video-card"],
  router: inject(),
  config: inject(),

  domain:  computed('config', function(){
    return this.get("config").getDomain();
  }),

  click() {
      var url = this.get("config")
                    .getAPIDomain() + "/films/watch/" + this.film.id

      $.ajax({method: 'POST', url: url }).then(() => {
        this.get('router').transitionTo('film', this.film.id);
      });
  }
});
