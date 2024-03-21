/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DContentBlock from '../content-block/content-block';
import styles from './content-block-card-static.scss';
import { C4D_CONTENT_BLOCK_CARD_STATIC } from '../../globals/internal/feature-flags';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Content block variation which includes a static card group.
 *
 * @element c4d-content-block-card-static
 */
class C4DContentBlockCardStatic extends StableSelectorMixin(C4DContentBlock) {
  updated() {
    this.querySelector(`${c4dPrefix}-card-group`)?.setAttribute(
      'grid-mode',
      'border'
    );
    const cardGroupItems = this.querySelectorAll(
      (this.constructor as typeof C4DContentBlockCardStatic).selectorCardItem
    );
    cardGroupItems.forEach((e) => {
      (e as HTMLElement).setAttribute('color-scheme', 'light');
    });
  }

  static get selectorCardItem() {
    return `${c4dPrefix}-card-group-item`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--content-block-card-static`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

// Define the new element
if (
  C4D_CONTENT_BLOCK_CARD_STATIC &&
  !customElements.get(`${c4dPrefix}-content-block-card-static`)
) {
  customElements.define(
    `${c4dPrefix}-content-block-card-static`,
    C4DContentBlockCardStatic
  );
}

export default !C4D_CONTENT_BLOCK_CARD_STATIC
  ? undefined
  : C4DContentBlockCardStatic;
