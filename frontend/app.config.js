module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    REACT_APP_BACKEND_URL: process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  },
});
