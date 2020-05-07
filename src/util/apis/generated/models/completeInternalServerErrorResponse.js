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
 * Class representing a CompleteInternalServerErrorResponse.
 */
class CompleteInternalServerErrorResponse {
  /**
   * Create a CompleteInternalServerErrorResponse.
   * @property {string} message
   */
  constructor() {
  }

  /**
   * Defines the metadata of CompleteInternalServerErrorResponse
   *
   * @returns {object} metadata of CompleteInternalServerErrorResponse
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'CompleteInternalServerErrorResponse',
      type: {
        name: 'Composite',
        className: 'CompleteInternalServerErrorResponse',
        modelProperties: {
          message: {
            required: true,
            serializedName: 'message',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = CompleteInternalServerErrorResponse;