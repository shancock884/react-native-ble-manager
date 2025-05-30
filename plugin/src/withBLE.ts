import { AndroidConfig, ConfigPlugin } from 'expo/config-plugins';

import { withBLEAndroidManifest } from './withBLEAndroidManifest';
import { withBluetoothPermissions } from './withBluetoothPermissions';

/**
 * Apply BLE native configuration.
 */
const withBLE: ConfigPlugin<
   {
      neverForLocation?: boolean;
      bluetoothAlwaysPermission?: string | false;
      companionDeviceEnabled?: boolean;
      isBleRequired?: boolean;
   } | void
> = (config, props = {}) => {
   const _props = props || {};
   const isBleRequired = _props.isBleRequired ?? false;
   const neverForLocation = _props.neverForLocation ?? false;
   const companionDeviceEnabled = _props.companionDeviceEnabled ?? false;
   
   // iOS
   config = withBluetoothPermissions(config, _props);

   // Android
   config = AndroidConfig.Permissions.withPermissions(config, [
      'android.permission.BLUETOOTH',
      'android.permission.BLUETOOTH_ADMIN',
      'android.permission.BLUETOOTH_CONNECT', // since Android SDK 31
   ]);
   config = withBLEAndroidManifest(config, {
      isBleRequired,
      neverForLocation,
      companionDeviceEnabled,
   });

   return config;
};

export default withBLE;
