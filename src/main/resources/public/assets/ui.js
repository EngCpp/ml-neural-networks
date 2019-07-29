'use strict';



;define('ui/adapters/film', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.RESTAdapter.extend({
    config: Ember.inject.service(),

    host: Ember.computed('config', function () {
      return this.get("config").getAPIDomain();
    })

  });
});
;define('ui/adapters/recommendation', ['exports', 'ui/adapters/film'], function (exports, _film) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _film.default.extend({});
});
;define('ui/app', ['exports', 'ui/resolver', 'ember-load-initializers', 'ui/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('ui/components/film-selected', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["film-selected"],
    router: Ember.inject.service(),
    config: Ember.inject.service(),

    domain: Ember.computed('config', function () {
      return this.get("config").getDomain();
    }),

    actions: {
      backButtonClick() {
        this.get('router').transitionTo('home');
      }
    }
  });
});
;define('ui/components/video-card', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ["video-card"],
    router: Ember.inject.service(),
    config: Ember.inject.service(),

    domain: Ember.computed('config', function () {
      return this.get("config").getDomain();
    }),

    click() {
      var url = this.get("config").getAPIDomain() + "/films/watch/" + this.film.id;

      $.ajax({ method: 'POST', url: url }).then(() => {
        this.get('router').transitionTo('film', this.film.id);
      });
    }
  });
});
;define('ui/components/video-list', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
;define('ui/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('ui/helpers/app-version', ['exports', 'ui/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('ui/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('ui/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('ui/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ui/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('ui/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('ui/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('ui/initializers/export-application-global', ['exports', 'ui/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('ui/instance-initializers/ember-data', ['exports', 'ember-data/initialize-store-service'], function (exports, _initializeStoreService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define('ui/models/category', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    film: _emberData.default.hasMany('film')
  });
});
;define('ui/models/film', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    categories: _emberData.default.attr(),
    views: _emberData.default.attr('number'),
    image: _emberData.default.attr('string'),
    rating: _emberData.default.attr('number')
  });
});
;define('ui/models/recommendation', ['exports', 'ui/models/film'], function (exports, _film) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _film.default.extend({});
});
;define('ui/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('ui/router', ['exports', 'ui/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('home', { path: '/' });
    this.route('film', { path: '/film/:id' });
  });

  exports.default = Router;
});
;define('ui/routes/film', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      return {
        selectedFilm: this.store.find('film', params.id),
        recommendations: this.store.findAll('recommendation')
      };
    },

    beforeModel() {
      this.store.unloadAll('recommendation');
      this.store.unloadAll('film');
    }
  });
});
;define('ui/routes/home', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.store.findAll('film');
    }
  });
});
;define('ui/serializers/film', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.RESTSerializer.extend({
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
              };
            })
          };
        })
      };

      return this._super(store, primaryModelClass, payload, id, requestType);
    }

  });
});
;define('ui/serializers/recommendation', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.RESTSerializer.extend({
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
      payload = {
        recommendations: payload.map(rec => {
          return {
            id: rec.id,
            name: rec.name,
            views: rec.views,
            image: rec.image,
            rating: rec.rating,
            type: 'recommendation',
            categories: rec.categories.map(cat => {
              return {
                id: cat.id,
                name: cat.name,
                type: 'category'
              };
            })
          };
        })
      };

      return this._super(store, primaryModelClass, payload, id, requestType);
    }

  });
});
;define('ui/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("ui/services/config", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Service.extend({
        getAPIDomain() {
            return this.getDomain() + "/api";
        },
        getDomain() {
            return "http://localhost:8080";
        }
    });
});
;define("ui/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "T41ohd65", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ui/templates/application.hbs" } });
});
;define("ui/templates/components/film-selected", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Yvou/g5K", "block": "{\"symbols\":[\"cat\"],\"statements\":[[7,\"img\"],[12,\"src\",[28,[[21,\"domain\"],\"/images/\",[23,[\"film\",\"image\"]]]]],[11,\"class\",\"video-thumbnail\"],[11,\"alt\",\"thumbnail\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\\n\"],[7,\"div\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"video-title\"],[9],[1,[23,[\"film\",\"name\"]],false],[10],[0,\"\\n  \"],[1,[23,[\"film\",\"views\"]],false],[0,\" views\"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"film\",\"categories\"]]],null,{\"statements\":[[0,\"    \"],[7,\"i\"],[9],[1,[22,1,[\"name\"]],false],[10],[7,\"br\"],[9],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[7,\"br\"],[9],[10],[0,\"\\n  \"],[7,\"button\"],[11,\"class\",\"back-button\"],[12,\"onclick\",[27,\"action\",[[22,0,[]],\"backButtonClick\"],null]],[9],[0,\"\\n    Back\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ui/templates/components/film-selected.hbs" } });
});
;define("ui/templates/components/video-card", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FQls++CZ", "block": "{\"symbols\":[\"cat\"],\"statements\":[[7,\"img\"],[12,\"src\",[28,[[21,\"domain\"],\"/images/\",[23,[\"film\",\"image\"]]]]],[11,\"class\",\"video-thumbnail\"],[11,\"alt\",\"thumbnail\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"video-title\"],[9],[1,[23,[\"film\",\"name\"]],false],[10],[0,\"\\n\"],[1,[23,[\"film\",\"views\"]],false],[0,\" views\"],[7,\"br\"],[9],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"film\",\"categories\"]]],null,{\"statements\":[[0,\"  \"],[7,\"i\"],[9],[1,[22,1,[\"name\"]],false],[10],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "ui/templates/components/video-card.hbs" } });
});
;define("ui/templates/components/video-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pkV2e9z3", "block": "{\"symbols\":[\"film\"],\"statements\":[[7,\"u\"],[9],[7,\"b\"],[9],[1,[21,\"title\"],false],[10],[10],[7,\"br\"],[9],[10],[0,\"\\n\"],[7,\"br\"],[9],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"video-list\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"data\"]]],null,{\"statements\":[[0,\"    \"],[1,[27,\"video-card\",null,[[\"film\"],[[22,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ui/templates/components/video-list.hbs" } });
});
;define("ui/templates/film", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "W/psGNiz", "block": "{\"symbols\":[],\"statements\":[[7,\"h2\"],[9],[0,\"You've Selected\"],[10],[0,\"\\n\"],[1,[27,\"film-selected\",null,[[\"film\"],[[22,0,[\"model\",\"selectedFilm\"]]]]],false],[0,\"\\n\"],[7,\"hr\"],[9],[10],[0,\"\\n\"],[7,\"br\"],[9],[10],[0,\"\\n\"],[1,[27,\"video-list\",null,[[\"title\",\"data\"],[\"You may also like\",[22,0,[\"model\",\"recommendations\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ui/templates/film.hbs" } });
});
;define("ui/templates/home", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "R6hWQ7t0", "block": "{\"symbols\":[],\"statements\":[[7,\"h2\"],[9],[0,\"FILMS AVAILABLE\"],[10],[0,\"\\n\"],[1,[27,\"video-list\",null,[[\"title\",\"data\"],[\"Available films\",[22,0,[\"model\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ui/templates/home.hbs" } });
});
;

;define('ui/config/environment', [], function() {
  var prefix = 'ui';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("ui/app")["default"].create({"name":"ui","version":"0.0.0+f1445598"});
          }
        
//# sourceMappingURL=ui.map
