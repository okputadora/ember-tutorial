import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

module('Integration | Component | rental-listing', function(hooks) {
  setupRenderingTest(hooks);

  test('should initially load all listings', async function (assert) {
    // we want our actions to return promises, since they are potentially fetching data asynchronously
    this.set('filterByCity', () => resolve({ results: ITEMS }));

    // with an integration test,
    // you can set up and use your component in the same way your application will use it.
    /* await -- throws an error that this a reserved word?*/ render(hbs`
      {{#list-filter filter=(action filterByCity) as |results|}}
        <ul>
        {{#each results as |item|}}
          <li class="city">
            {{item.city}}
          </li>
        {{/each}}
        </ul>
      {{/list-filter}}
    `);

    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('.city').length, 3);
      assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
    });
  });

});
