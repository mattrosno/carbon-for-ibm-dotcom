/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-footer', () => {
  beforeEach(() => {
    cy.mockMastheadFooterData();
  });

  it('should load the default dds-footer example', () => {
    cy.visit('/footer');

    cy.get('[data-autoid="dds--footer-nav-group"]');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-footer | default');
  });
});
