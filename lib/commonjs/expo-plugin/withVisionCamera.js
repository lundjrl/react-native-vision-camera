"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _configPlugins = require("@expo/config-plugins");

var _withDisableFrameProcessorsAndroid = require("./withDisableFrameProcessorsAndroid");

var _withDisableFrameProcessorsIOS = require("./withDisableFrameProcessorsIOS");

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const pkg = require('../../../package.json');

const CAMERA_USAGE = 'Allow $(PRODUCT_NAME) to access your camera';
const MICROPHONE_USAGE = 'Allow $(PRODUCT_NAME) to access your microphone';

const withCamera = function (config) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (config.ios == null) config.ios = {};
  if (config.ios.infoPlist == null) config.ios.infoPlist = {};
  config.ios.infoPlist.NSCameraUsageDescription = props.cameraPermissionText ?? config.ios.infoPlist.NSCameraUsageDescription ?? CAMERA_USAGE;

  if (props.enableMicrophonePermission) {
    config.ios.infoPlist.NSMicrophoneUsageDescription = props.microphonePermissionText ?? config.ios.infoPlist.NSMicrophoneUsageDescription ?? MICROPHONE_USAGE;
  }

  const androidPermissions = ['android.permission.CAMERA'];
  if (props.enableMicrophonePermission) androidPermissions.push('android.permission.RECORD_AUDIO');

  if (props.disableFrameProcessors) {
    config = (0, _withDisableFrameProcessorsAndroid.withDisableFrameProcessorsAndroid)(config);
    config = (0, _withDisableFrameProcessorsIOS.withDisableFrameProcessorsIOS)(config);
  }

  return (0, _configPlugins.withPlugins)(config, [[_configPlugins.AndroidConfig.Permissions.withPermissions, androidPermissions]]);
};

var _default = (0, _configPlugins.createRunOncePlugin)(withCamera, pkg.name, pkg.version);

exports.default = _default;
//# sourceMappingURL=withVisionCamera.js.map