/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-content-group-horizontal', () => {
  it('should load the default dds-content-group-horizontal example', () => {
    cy.visit('/content-group-horizontal');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-group-horizontal | default');
  });
});
