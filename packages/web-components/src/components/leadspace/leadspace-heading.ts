/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './leadspace.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * The heading content of leadspace.
 *
 * @element c4d-leadspace-heading
 */
@customElement(`${c4dPrefix}-leadspace-heading`)
class C4DLeadspaceHeading extends StableSelectorMixin(LitElement) {
  /**
   * The shadow slot this heading content should be in.
   */
  @property({ reflect: true })
  slot = 'heading';

  /**
   * The shadow slot this heading content should be in.
   */
  @property({ reflect: true })
  highlight = '';

  /**
   * The type style that can be used for the heading.
   */
  @property({ reflect: true, attribute: 'type-style' })
  typeStyle = 'display-01';

  @property()
  content;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'heading');
    }
    if (!this.hasAttribute('aria-level')) {
      this.setAttribute('aria-level', '1');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    const textContent = this.innerText;
    const h1 = document.createElement('h1');
    h1.textContent = textContent;

    if (changedProperties.has('highlight') && this.highlight) {
      const index = textContent!.indexOf(this.highlight);

      if (index !== -1) {
        const beforeSubstring = textContent!.substring(0, index);
        const modifiedText = document.createElement('span');
        modifiedText.textContent = this.highlight;
        const afterSubstring = textContent!.substring(
          index + this.highlight.length
        );

        this.replaceChildren(beforeSubstring, modifiedText, afterSubstring, h1);
      }
    } else {
      this.replaceChildren(textContent, h1);
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--leadspace-heading`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DLeadspaceHeading;
