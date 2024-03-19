/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement, state } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import ChevronRight20 from '../../internal/vendor/@carbon/web-components/icons/chevron--right/20.js';
import styles from './tabs-extended.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A tab within a tabbed layout.
 *
 * @element dds-tab
 */
@customElement(`${ddsPrefix}-tab`)
class DDSTab extends MediaQueryMixin(StableSelectorMixin(LitElement), {
  [MQBreakpoints.LG]: MQDirs.MIN,
}) {
  /**
   * Whether we're viewing smaller or larger window.
   */
  @state()
  _isLargeOrGreater = this.carbonBreakpoints.lg.matches;

  mediaQueryCallbackLG() {
    this._isLargeOrGreater = this.carbonBreakpoints.lg.matches;
  }

  /**
   * Defines label of the tab.
   */
  @property({ reflect: true })
  label = '';

  /**
   * Defines the disabled state of the tab.
   */
  @property({ reflect: true, type: Boolean })
  disabled: boolean = false;

  /**
   * Defines the selected state of the tab.
   */
  @property({ reflect: true, type: Boolean })
  selected: boolean = false;

  /**
   * Defines the index of the tab relative to other tabs.
   */
  @state()
  private _index: number = 0;

  /**
   * Sets the index of the tab.
   */
  setIndex(index: number) {
    this._index = index;
  }

  /**
   * Returns the index of the tab.
   */
  getIndex() {
    return this._index;
  }

  protected async updated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): Promise<void> {
    if (_changedProperties.has('selected')) {
      await this.updateComplete;
      const { eventTabSelected } = this.constructor as typeof DDSTab;
      this.dispatchEvent(
        new CustomEvent(eventTabSelected, {
          bubbles: true,
          composed: true,
          detail: {
            selected: this.selected,
          },
        })
      );
    }

    super.updated(_changedProperties);
  }

  protected _renderAccordionItem() {
    const { label, selected, disabled, _index: index } = this;
    const classes = classMap({
      [`${prefix}--accordion__item`]: true,
      [`${prefix}--accordion__item--active`]: selected,
      [`${prefix}--accordion__item--disabled`]: disabled,
    });

    return html`
      <li class="${classes}">
        <button
          class="${prefix}--accordion__heading"
          aria-expanded="${selected}"
          aria-controls="pane-${index}"
          tabindex="${index + 1}"
          ?disabled="${disabled}">
          ${ChevronRight20({
            part: 'expando-icon',
            class: `${prefix}--accordion__arrow`,
          })}
          <div class="${prefix}--accordion__title">${label}</div>
        </button>
        <div id="pane-${index}" class="${prefix}--accordion__content">
          <slot></slot>
        </div>
      </li>
    `;
  }

  protected _renderTabItem() {
    const { _index, selected } = this;
    return html`
      <div
        id="tab-panel-${_index}-default"
        tabindex="0"
        class="tab-${_index}-container"
        role="tabpanel"
        aria-labelledby="tab-link-${_index}-default"
        aria-hidden="${!selected}"
        ?hidden="${!selected}">
        <slot></slot>
      </div>
    `;
  }

  render() {
    return this._isLargeOrGreater
      ? this._renderTabItem()
      : this._renderAccordionItem();
  }

  static get stableSelector() {
    return `${ddsPrefix}--tab`;
  }

  /**
   * An event that fires whenever the tab's selected state changes.
   */
  static get eventTabSelected() {
    return `${ddsPrefix}-tab-selected`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSTab;
