import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});


Router.map(function() {

  this.route('campaigns', { path: '/' });
  this.route('admin');
  this.route('recipients');
});

export default Router;
