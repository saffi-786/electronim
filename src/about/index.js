/*
   Copyright 2022 Marc Nuri San Felix

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
const {BrowserView, BrowserWindow} = require('electron');
const path = require('path');
const {handleRedirect} = require('../tab-manager/redirect');
const {showDialog} = require('../browser-window');

const webPreferences = {
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true,
  preload: path.resolve(__dirname, '..', '..', 'bundles', 'about.preload.js')
};

const openAboutDialog = event => {
  const aboutView = new BrowserView({webPreferences});
  aboutView.webContents.loadURL(`file://${__dirname}/index.html`);
  const handleRedirectForCurrentUrl = handleRedirect(aboutView);
  aboutView.webContents.on('will-navigate', handleRedirectForCurrentUrl);
  aboutView.webContents.on('new-window', handleRedirectForCurrentUrl);
  showDialog(BrowserWindow.fromWebContents(event.sender), aboutView);
};

module.exports = {openAboutDialog};
