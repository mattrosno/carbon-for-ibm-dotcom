/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CTA } from '../../../components/CTA';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../../../components/Image';
import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentItem Component
 *
 * @param {object} props props object
 * @param {string} props.cta cta object
 * @param {string} props.copy copy text
 * @param {string} props.heading  heading object
 * @param {object} props.image image object
 * @returns {*} JSX ContentItem component
 */
const ContentItem = ({ cta, copy, heading, image }) => (
  <div
    className={`${prefix}--content-item`}
    data-autoid={`${stablePrefix}--content-item`}>
    {heading && (
      <h4
        data-autoid={`${stablePrefix}--content-item__heading`}
        className={`${prefix}--content-item__heading`}>
        {heading}
      </h4>
    )}
    {image && <Image classname={`${prefix}--content-item__image`} {...image} />}
    {copy && (
      <div
        data-autoid={`${stablePrefix}--content-item__copy`}
        className={`${prefix}--content-item__copy`}
        dangerouslySetInnerHTML={{
          __html: markdownToHtml(copy, { bold: false }),
        }}></div>
    )}
    {cta && (
      <CTA style="text" type={cta.type} copy={cta.copy} href={cta.href} />
    )}
  </div>
);

ContentItem.propTypes = {
  cta: PropTypes.shape({
    type: PropTypes.string,
    copy: PropTypes.string,
    href: PropTypes.string,
  }),
  copy: PropTypes.string,
  heading: PropTypes.string,
  image: PropTypes.shape({
    images: PropTypes.shape({
      src: PropTypes.string,
      minWidth: PropTypes.string,
    }),
    alt: PropTypes.string,
    defaultImage: PropTypes.string,
  }),
};

export default ContentItem;
