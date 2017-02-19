import Ember from 'ember';
import dateformat from 'npm:dateformat';

export function shortDate(theDate) {
  return dateformat(theDate,"dd-mm-yyyy HH:MM");
}

export default Ember.Helper.helper(shortDate);
