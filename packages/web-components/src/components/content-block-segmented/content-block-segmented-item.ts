/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, html, TemplateResult } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DContentGroup from '../content-group/content-group';
import styles from './content-block-segmented.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Content block segmented item.
 *
 * @element c4d-content-block-segmented-item
 */
@customElement(`${c4dPrefix}-content-block-segmented-item`)
class C4DContentBlockSegmentedItem extends StableSelectorMixin(
  C4DContentGroup
) {
  protected _renderInnerBody(): TemplateResult | string | void {
    return html` ${this._renderContent()}${this._renderMedia()} `;
  }

  protected _renderMedia(): TemplateResult | string | void {
    const { _hasMedia: hasMedia, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div
        ?hidden="${!hasMedia}"
        class="${prefix}--content-block-segmented__media">
        <slot name="media" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--content-block-segmented-item`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

console.warn(
  'The content-block-segmented-item component has been deprecated in favor of the content-block component. ' +
    'See content-block documentation for more information.'
);

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DContentBlockSegmentedItem;
