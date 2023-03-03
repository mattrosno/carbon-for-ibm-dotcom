/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css, customElement, html, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSContentBlock from '../content-block/content-block';
import styles from './leadspace-block.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * LeadSpace Block content Component.
 *
 * @element dds-leadspace-block-content
 */
@customElement(`${ddsPrefix}-leadspace-block-content`)
class DDSLeadSpaceBlockContent extends DDSContentBlock {
  protected _renderInnerBody(): TemplateResult | string | void {
    const { _hasContent: hasContent, _hasMedia: hasMedia } = this;
    return html`
      <div
        ?hidden="${!hasContent && !hasMedia}"
        class="${prefix}--content-block__children">
        ${this._renderMedia()}${this._renderContent()}
      </div>
    `;
  }

  connectedCallback() {
    /**
     * ensure link list heading is aria level 3 so that the headings in
     * leadspace block are hierarchical for accessibility purposes
     */
    const linkListHeading = this.querySelector('dds-link-list-heading');
    if (linkListHeading) {
      linkListHeading.setAttribute('aria-level', '3');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <slot name="heading"></slot>
      ${this._renderBody()}
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--leadspace-block-content`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`
      ${super.styles}${styles}
    `;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSLeadSpaceBlockContent;
