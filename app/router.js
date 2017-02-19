import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});


Router.map(function() {
  this.route('recipients', { path: '/' });
  this.route('admin');
  this.route('campaigns',function() {
    this.route('new');
  });
  this.route('lists', function() {
    this.route('show', { path: 'show/:id' });
  });
});

export default Router;
