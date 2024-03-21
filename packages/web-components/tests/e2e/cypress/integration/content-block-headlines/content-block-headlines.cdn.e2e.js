/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-content-block-headlines (cdn)', () => {
  it('should load the default cds-content-block-headlines example (cdn)', () => {
    cy.visit('/content-block-headlines/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-content-block-headlines | cdn | default');
  });
});
