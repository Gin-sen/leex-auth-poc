import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

function handleLogout(instance) {
    instance.logoutRedirect().catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButtonRedirect = () => {
    const { instance } = useMsal();

    return (
        <Button id="redirect" variant="secondary" className="ml-auto" onClick={() => handleLogout(instance)}>Sign out using Redirect</Button>
    );
}