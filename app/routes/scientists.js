import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return ['marie curie', 'mae jamison', 'albert hofmann']
  }
});
