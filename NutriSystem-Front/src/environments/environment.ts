// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndpoint:
  {
    nutrisystem: 'https://localhost:44372'

  },
  adal: {
    tenant: '687c39b3-36c1-41c5-b235-8fad319475a1',
    clientId: 'c3d0925b-3bbf-43f5-b53c-b03bbd0e3c64',
    redirectUri: window.location.origin
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
