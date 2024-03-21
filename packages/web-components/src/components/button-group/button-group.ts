/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { BUTTON_KIND } from '../../internal/vendor/@carbon/web-components/components/button/defs.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './button-group.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Button group.
 *
 * @element c4d-button-group
 */
@customElement(`${c4dPrefix}-button-group`)
class C4DButtonGroup extends StableSelectorMixin(LitElement) {
  /**
   * Handler for @slotchange, set the first button-group-item to kind tertiary and primary for the remaining ones
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    const childItems = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof C4DButtonGroup).selectorItem
            ) ||
            (elem as HTMLElement).matches(
              (this.constructor as typeof C4DButtonGroup).selectorItemCTA
            ) ||
            (elem as HTMLElement).matches(
              (this.constructor as typeof C4DButtonGroup).selectorItemDefaultCTA
            )
          : false
      );

    childItems.forEach((elem, index) => {
      (elem as HTMLElement).setAttribute(
        'kind',
        index === 0 ? BUTTON_KIND.PRIMARY : BUTTON_KIND.TERTIARY
      );
    });

    const { customPropertyItemCount } = this
      .constructor as typeof C4DButtonGroup;
    this.style.setProperty(customPropertyItemCount, String(childItems.length));

    const update = new CustomEvent(`${c4dPrefix}-button-group-update`, {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.dispatchEvent(update);
  }

  render() {
    return html` <slot @slotchange="${this._handleSlotChange}"></slot> `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'list');
  }

  /**
   * The CSS custom property name for the live button group item count.
   */
  static get customPropertyItemCount() {
    return `--${c4dPrefix}--button-group--item-count`;
  }

  /**
   * A selector that will return the child items.
   */
  static get selectorItem() {
    return `${c4dPrefix}-button-group-item`;
  }

  /**
   * A selector that will return the child items.
   */
  static get selectorItemDefaultCTA() {
    return `${c4dPrefix}-cta`;
  }

  /**
   * A selector that will return the child items.
   */
  static get selectorItemCTA() {
    return `${c4dPrefix}-button-cta`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--button-group`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DButtonGroup;
