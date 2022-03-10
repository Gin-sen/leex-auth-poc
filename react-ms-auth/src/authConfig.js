import { b2cPolicies } from "./policies"; 
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
      clientId: "b7c6c5f9-c237-47b5-bb26-732615f57172",
      authority: b2cPolicies.authorities.signUpSignIn.authority,
      knownAuthorities: [b2cPolicies.authorityDomain],
      //authority: "https://login.microsoftonline.com/326ce939-a8b6-4247-8d35-939b4d2e8c8a", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "https://my-react-ms-auth.placesm-portfolio.fr",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
          }
        }
      }
    }
  };
  
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
   scopes: ["openid"]
};
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };