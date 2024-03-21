/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-link-list-section (cdn)', () => {
  it('should load the default cds-link-list-section example', () => {
    cy.visit('/link-list-section/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-link-list-section | cdn | default');
  });
});
