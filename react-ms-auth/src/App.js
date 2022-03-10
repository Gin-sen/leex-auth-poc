import React from "react";
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

function App() {
  return (
      <PageLayout>
        <AuthenticatedTemplate>
          <p id="connected">You are signed in!</p>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>You are not signed in! Please sign in.</p>
        </UnauthenticatedTemplate>
      </PageLayout>
  );
}

export default App;