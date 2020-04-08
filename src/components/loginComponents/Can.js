/**
 * Component takes the rules (wrote in the RBAC) and decides whether or not users can perform the desired action or see some part of the UI.
 */

import rules from "./rbac-rules";


// Role Based Access Control (RBAC) based on Auth0 rules. If the user has the right permissions, return false. Otherwise return true
const check = (rules, role, action, data) => {
  const permissions = rules[role];
  // console.log("Permissions for role: " + role);
  // console.log("Permissions: " + permissions);
  if (!permissions) {
    // role is not present in the rules
    // console.log("Role is ----Can" + role);

    return false;
  }

  // static permissions are permissions which don't need any data apart from the user role
  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }

  // dynamic permissions need additional data to determine user access
  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

const Can = (props) =>
  check(rules, props.role, props.perform, props.data)
    ? props.yes()
    : props.no();

Can.defaultProps = {
  yes: () => null,
  no: () => null,
};

export default Can;
