import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});


Router.map(function() {
  this.route('recipients', function() {
    this.route('bylist',{ path: '/bylist/:list_id' });
    this.route('edit', { path: '/:recipient_id/edit' });
    this.route('new');
  });
  this.route('admin');
  this.route('campaigns',function() {
    this.route('new');
  });
  this.route('lists', function() {
    this.route('edit', { path: '/:list_id/edit' });
    this.route('new');
  });
});

export default Router;
