import Service from '@ember/service';

export default Service.extend({
  getAPIDomain() {
      return "http://localhost:8080";
  }
});
