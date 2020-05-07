/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Class representing a BasicReleaseDetailsResponseDistributionStoresItem.
 */
class BasicReleaseDetailsResponseDistributionStoresItem {
  /**
   * Create a BasicReleaseDetailsResponseDistributionStoresItem.
   * @property {string} id ID identifying a unique distribution store.
   * @property {string} [name] A name identifying a unique distribution store.
   * @property {string} [type] type of the distribution store currently stores
   * type can be intune, googleplay or windows. Possible values include:
   * 'intune', 'googleplay', 'apple', 'none'
   * @property {string} [publishingStatus] publishing status of the release in
   * the store.
   * @property {boolean} [isLatest] Is the containing release the latest one in
   * this distribution store.
   */
  constructor() {
  }

  /**
   * Defines the metadata of BasicReleaseDetailsResponseDistributionStoresItem
   *
   * @returns {object} metadata of BasicReleaseDetailsResponseDistributionStoresItem
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'BasicReleaseDetailsResponse_distribution_storesItem',
      type: {
        name: 'Composite',
        className: 'BasicReleaseDetailsResponseDistributionStoresItem',
        modelProperties: {
          id: {
            required: true,
            serializedName: 'id',
            type: {
              name: 'String'
            }
          },
          name: {
            required: false,
            serializedName: 'name',
            type: {
              name: 'String'
            }
          },
          type: {
            required: false,
            serializedName: 'type',
            type: {
              name: 'String'
            }
          },
          publishingStatus: {
            required: false,
            serializedName: 'publishing_status',
            type: {
              name: 'String'
            }
          },
          isLatest: {
            required: false,
            serializedName: 'is_latest',
            type: {
              name: 'Boolean'
            }
          }
        }
      }
    };
  }
}

module.exports = BasicReleaseDetailsResponseDistributionStoresItem;