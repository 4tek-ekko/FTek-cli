/*
 * Code generated by Microsoft (R) AutoRest Code Generator 0.17.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

var models = require('./index');

/**
 * @class
 * Initializes a new instance of the PackageUpdateResponse class.
 * @constructor
 * Package has successfully updated.
 *
 * @member {object} [packageDetails]
 * 
 * @member {string} [packageDetails.packageId] ID identifying this unique
 * package.
 * 
 * @member {string} [packageDetails.status] The package state.<br>
 * <b>available</b>: The uploaded package has been distributed.<br>
 * <b>unavailable</b>: The uploaded package is not visible to the user. <br>
 * . Possible values include: 'available', 'unavailable'
 * 
 * @member {string} [packageDetails.appName] The app's name (extracted from
 * the uploaded package).
 * 
 * @member {string} [packageDetails.version] The package's version.<br>
 * For iOS: CFBundleVersion from info.plist.
 * For Android: android:versionCode from AppManifest.xml.
 * 
 * @member {string} [packageDetails.shortVersion] The package's short
 * version.<br>
 * For iOS: CFBundleShortVersionString from info.plist.
 * For Android: android:versionName from AppManifest.xml.
 * 
 * @member {string} [packageDetails.releaseNotes] The package's release notes.
 * 
 * @member {string} [packageDetails.provisioningProfileName] The package's
 * release notes.
 * 
 * @member {number} [packageDetails.size] The package's size in bytes.
 * 
 * @member {string} [packageDetails.minOs] The package's minimum required
 * operating system.
 * 
 * @member {string} [packageDetails.fingerprint] MD5 checksum of the package
 * binary.
 * 
 * @member {string} [packageDetails.uploadedAt] UTC time in ISO 8601 format of
 * the uploaded time.
 * 
 * @member {string} [packageDetails.downloadUrl] The URL that hosts the binary
 * for this package.
 * 
 * @member {string} [packageDetails.appIconUrl] A URL to the app's icon.
 * 
 * @member {string} [packageDetails.installUrl] The href required to install a
 * package on a mobile device. On iOS devices will be prefixed with
 * `itms-services://?action=download-manifest&url=`
 * 
 * @member {array} [packageDetails.distributionGroups] a list of distribution
 * groups that are associated with this package.
 * 
 */
function PackageUpdateResponse() {
}

/**
 * Defines the metadata of PackageUpdateResponse
 *
 * @returns {object} metadata of PackageUpdateResponse
 *
 */
PackageUpdateResponse.prototype.mapper = function () {
  return {
    required: false,
    serializedName: 'PackageUpdateResponse',
    type: {
      name: 'Composite',
      className: 'PackageUpdateResponse',
      modelProperties: {
        packageDetails: {
          required: false,
          serializedName: 'packageDetails',
          type: {
            name: 'Composite',
            className: 'PackageDetails'
          }
        }
      }
    }
  };
};

module.exports = PackageUpdateResponse;
