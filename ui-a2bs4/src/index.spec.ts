Error.stackTraceLimit = Infinity;

import 'core-js/client/shim';
import '@angular/common';
import 'rxjs';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
//const context = (require as any).context('./app', true, /\.(js|ts|tsx)$/);
//context.keys().forEach(context);
import * as testing from '@angular/core/testing';
import * as testingBrowser from '@angular/platform-browser-dynamic/testing';

testing.TestBed.initTestEnvironment(testingBrowser.BrowserDynamicTestingModule, testingBrowser.platformBrowserDynamicTesting());
