/**
 * @fileoverview web worker script.
 */
'use strict';

var dav = require('dav'),
    proxy = require('./proxy'),
    url = require('url');

proxy({
  getAccount: function(account, preset) {
    var transport = createTransport(account, preset);
    var server;
    if (account.domain) {
      server = account.domain;
    } else if (preset.options && preset.options.domain) {
      server = !!preset.options.entrypoint ?
        url.resolve(preset.options.domain, preset.options.entrypoint) :
        preset.options.domain;
    }

    return dav.createAccount({ server: server, xhr: transport });
  }
});

function createTransport(account, preset) {
  var credentials = createCredentials(account, preset);
  var authenticationType = getAuthenticationType(account, preset);
  var transport;
  if (authenticationType === 'oauth') {
    transport = new dav.transport.OAuth2(credentials);
  } else {
    transport = new dav.transport.Basic(credentials);
  }

  return transport;
}

function createCredentials(account, preset) {
  var result = new dav.Credentials({
    username: account.user
  });

  var authenticationType = getAuthenticationType(account, preset);
  if (authenticationType === 'oauth') {
    // oauth
    if (preset.apiCredentials) {
      result.clientId = preset.apiCredentials.client_id;
      result.clientSecret = preset.apiCredentials.client_secret;
      result.redirectUrl = preset.apiCredentials.redirect_uri;
      result.scope = preset.apiCredentials.scope;
      result.tokenUrl = preset.apiCredentials.tokenUrl;
    }
  } else {
    // basic authentication
    result.password = account.password;
  }

  return result;
}

function getAuthenticationType(account, preset) {
  return account.oauth ||
         (preset && preset.authenticationType === 'oauth') ?
    'oauth' :
    'basic';
}
