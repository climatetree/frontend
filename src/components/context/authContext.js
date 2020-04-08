/**
 * Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes. Accepts a value prop to be passed to consuming components that are descendants of this Provider.One Provider can be connected to many consumers.
 * This Context component is used to create an object to share the Auth state of a given user (admin and non-admin) across the application
 */
import React from "react";

const authContext = React.createContext({});

export const AuthProvider = authContext.Provider;
export const Consumer = authContext.Consumer;
export default authContext;
