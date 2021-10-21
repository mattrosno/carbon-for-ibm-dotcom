/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Masthead)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-masthead--default';

/**
 * Sets the correct path (Custom Masthead)
 *
 * @type {string}
 * @private
 */
const _pathCustom =
  '/iframe.html?id=components-masthead--with-custom-navigation';

/**
 * Sets the correct path (Masthead with Platform)
 *
 * @type {string}
 * @private
 */
const _pathPlatform = '/iframe.html?id=components-masthead--with-platform';

describe('Masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should have url for IBM logo', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-logo"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | IBM logo', {
      widths: [1280],
    });
  });

  it('should load menu item with selected state', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav1"] a').then(
      $menuItem => {
        expect($menuItem).to.have.attr('data-selected', 'true');
      }
    );

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | menu item with selected state', {
      widths: [1280],
    });
  });

  it('should render 4 menu items', () => {
    cy.get('.bx--masthead__megamenu__l0-nav').should('have.length', 4);

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | Number of menu items', {
      widths: [1280],
    });
  });

  it('should load the megamenu - first nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mega menu (nav 0)', {
      widths: [1280],
    });
  });

  it('should load the megamenu - second nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav1"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mega menu (nav 1)', {
      widths: [1280],
    });
  });

  it('should load the megamenu - third nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav2"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mega menu (nav 3)', {
      widths: [1280],
    });
  });

  it('should load the megamenu - fourth nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav3"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mega menu (nav 4)', {
      widths: [1280],
    });
  });

  it('should have urls for the submenu items within the megamenu', () => {
    cy.get(
      '[data-autoid="dds--masthead-default__l0-nav0"] a.bx--masthead__megamenu__category-sublink--highlighted'
    ).then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.get(
      '[data-autoid="dds--masthead-default__l0-nav0"] a.bx--masthead__megamenu__category-sublink'
    ).then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | megamenu sublinks have urls', {
      widths: [1280],
    });
  });

  it('should open the login menu', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-account"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | profile menu', {
      widths: [1280],
    });
  });

  it('should have 2 menu items under the login menu', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-account"]').click();
    cy.get('.bx--masthead__profile-item').should('have.length', 2);

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | profile menu has 2 items', {
      widths: [1280],
    });
  });

  it('should open the search bar on click', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-search"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead |  search bar opens', {
      widths: [1280],
    });
  });

  it('should allow keywords in the search bar and display 10 suggested results', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-search"]').click();

    cy.get('[data-autoid="dds--masthead__search"]')
      .find('input[data-autoid="dds--header__search--input"]')
      .type('redhat', { force: true });

    cy.get('.react-autosuggest__suggestions-list li').should('have.length', 10);

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot(
      'dds-masthead |  allow for keywords in search bar and display 10 suggested results',
      {
        widths: [1280],
      }
    );
  });
});

describe('Masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should load the mobile menu', () => {
    cy.get('[data-autoid="dds--masthead-default-sidenav__l0-menu"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mobile menu', {
      widths: [320],
    });

    cy.get('[data-autoid="dds--masthead-default-sidenav__l0-nav0"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mobile menu level 2', {
      widths: [320],
    });
  });
});

describe('Masthead | custom (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathCustom}`);
    cy.viewport(1280, 780);
  });

  it('should scroll the L0 overflow properly', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | custom - overflow', {
      widths: [1280],
    });
  });
});

describe('Masthead | with platform (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathPlatform}`);
    cy.viewport(1280, 780);
  });

  it('should load platform containing a link', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-ecosystemname"]').then(
      $link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      }
    );
  });

  it('should render platform next to IBM logo', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-ecosystemname"]').then(
      $platform => {
        cy.get('[data-autoid="dds--masthead-eco__l0-logo"]').then($logo => {
          expect($logo[0].getBoundingClientRect().right).to.equal(
            $platform[0].parentElement.getBoundingClientRect().left
          );
        });
      }
    );
  });

  it('should open the search bar with platform', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-search"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | with platform - search', {
      widths: [1280],
    });
  });
});
