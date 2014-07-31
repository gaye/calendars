'use strict';

exports.ensureOnline = function ensureOnline() {
  if (exports.isOffline()) {
    throw new Error(navigator.mozL10n.get('error-offline'));
  }
};

exports.isOffline = function isOffline() {
  if (!navigator || !('onLine' in navigator)) {
    return true;
  }

  return !navigator.onLine;
};
