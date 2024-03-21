/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DMastheadTopNav from './top-nav';
import C4DLeftNavName from './left-nav-name';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * The brand name UI in top nav.
 *
 * @element c4d-top-nav-name
 */
@customElement(`${c4dPrefix}-top-nav-name`)
class C4DTopNavName extends C4DLeftNavName {
  connectedCallback() {
    super.connectedCallback();
    const { selectorTopNav } = this.constructor as typeof C4DTopNavName;
    const { nextElementSibling } = this;
    if (nextElementSibling && nextElementSibling.matches(selectorTopNav)) {
      (nextElementSibling as C4DMastheadTopNav).hideDivider = true;
    }
  }

  disconnectedCallback() {
    const { selectorTopNav } = this.constructor as typeof C4DTopNavName;
    const { nextElementSibling } = this;
    if (nextElementSibling && nextElementSibling.matches(selectorTopNav)) {
      (nextElementSibling as C4DMastheadTopNav).hideDivider = false;
    }
    super.disconnectedCallback();
  }

  render() {
    const { href, prefix: namePrefix } = this;
    const namePrefixPart = !namePrefix
      ? undefined
      : html`
          <span class="${prefix}--header__name--prefix">${namePrefix}</span
          >&nbsp;
        `;
    return html`
      <a class="${prefix}--header__name" href="${ifDefined(href)}"
        >${namePrefixPart}<slot></slot
      ></a>
    `;
  }

  /**
   * A selector that will return the nav bar.
   */
  static get selectorTopNav() {
    return `${c4dPrefix}-top-nav`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--masthead__platform-name`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DTopNavName;
