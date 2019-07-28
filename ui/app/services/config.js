import Service from '@ember/service';

export default Service.extend({
  getAPIDomain() {
      return this.getDomain() + "/api";
  },
  getDomain() {
      return "http://localhost:8080";
  }
});
