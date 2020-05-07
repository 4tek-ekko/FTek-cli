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
 * Export started.
 *
 */
class ExportDevicesAcceptedResponse {
  /**
   * Create a ExportDevicesAcceptedResponse.
   * @property {string} exportId The unique export identifier.
   */
  constructor() {
  }

  /**
   * Defines the metadata of ExportDevicesAcceptedResponse
   *
   * @returns {object} metadata of ExportDevicesAcceptedResponse
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ExportDevicesAcceptedResponse',
      type: {
        name: 'Composite',
        className: 'ExportDevicesAcceptedResponse',
        modelProperties: {
          exportId: {
            required: true,
            serializedName: 'export_id',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = ExportDevicesAcceptedResponse;