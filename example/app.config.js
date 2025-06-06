
export default ({ config }) => {
  if (process.env.MY_ENVIRONMENT === 'production') {
    config.name = 'RN BLE Example';
  } else {
    config.name = 'RN BLE Example Dev';
  }

  return {
    ...config,
    android: {
      package: 'it.innove.example.ble',
    },
    ios: {
      bundleIdentifier: 'it.innove.example.ble',
    },
    plugins: [
      [
        '../app.plugin.js',
        { companionDeviceEnabled: true, neverForLocation: true },
      ],
      'expo-build-properties',
    ],
  };
};
