/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import EarthFilled16 from 'carbon-web-components/es/icons/earth--filled/16.js';
import FocusMixin from 'carbon-web-components/es/globals/mixins/focus.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import settings from 'carbon-components/es/globals/js/settings';
import { FOOTER_SIZE } from './footer';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Locale button.
 *
 * @element dds-locale-button
 */
@customElement(`${ddsPrefix}-locale-button`)
class DDSLocaleButton extends StableSelectorMixin(FocusMixin(LitElement)) {
  /**
   * Button label for accessibility.
   */
  @property()
  buttonLabel = 'Select geographic area';

  /**
   * Size property to apply different styles.
   */
  @property()
  size = FOOTER_SIZE.REGULAR;

  /**
   * The shadow slot this locale button should be in.
   */
  @property({ reflect: true })
  slot = 'locale-button';

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  render() {
    const { buttonLabel } = this;
    return html`
      <button
        id="button"
        class="${prefix}--btn ${prefix}--btn--tertiary ${prefix}--locale-btn"
        aria-label="${ifNonNull(buttonLabel)}"
      >
        <slot></slot>
        ${EarthFilled16()}
      </button>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--locale-btn`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLocaleButton;
