/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-scroll-animations', () => {
  it('should load the default cds-scroll-animations example', () => {
    cy.visit('/scroll-animations');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-scroll-animations | default');
  });
});
