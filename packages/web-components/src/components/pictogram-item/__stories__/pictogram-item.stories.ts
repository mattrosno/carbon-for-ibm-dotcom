/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import styles from './pictogram-item.stories.scss';

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { heading, copy, href, linkCopy } = parameters?.props?.PictogramItem ?? {};
  return html`
    <dds-pictogram-item>
      <svg
        slot="pictogram"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        data-autoid="dds--pictogram-item__pictogram"
        aria-label="Pictogram description"
        width="64"
        height="64"
        viewBox="8 8 32 32"
        role="img"
        class="bx--pictogram-item__pictogram"
      >
        <path
          fill="none"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width=".72"
          d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
        0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
        ></path>
      </svg>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-copy>${copy}</dds-content-item-copy>
      <dds-link-with-icon href="${href}" slot="footer">
        ${linkCopy} ${ArrowRight20({ slot: 'icon' })}
      </dds-link-with-icon>
    </dds-pictogram-item>
  `;
};

export default {
  title: 'Components/Pictogram item',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      PictogramItem: ({ groupId }) => ({
        heading: textNullable('Heading (heading):', 'Lorem ipsum dolor sit', groupId),
        copy:
          'Lorem ipsum dolor sit amet, ' +
          'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
          'Ut enim ad minim veniam\n',
        href: textNullable('Link with Icon href:', 'https://example.com', groupId),
        linkCopy: textNullable('Link with Icon copy:', 'Lorem ipsum dolor', groupId),
      }),
    },
  },
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
};
