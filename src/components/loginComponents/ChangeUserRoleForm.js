import React, { useContext, useState } from 'react';
import { UserContext } from "../context/UserContext";
import CloseIcon from "../../images/x.svg";
import DropdownInput from "../generalComponents/DropdownInput";
import "./ChangeUserRoleForm.css";

const ChangeUserRoleForm = ({
    setOpenChangeUserRoleForm,
}) => {
    const { user } = useContext(UserContext);
    const [emailInput, setEmailInput] = useState("");
    const [roleInput, setRoleInput] = useState("");
    const [submitMsg, setSubmitMsg] = useState("");
    const [msgIsError, setMsgIsError] = useState(true);

    // Role ids for user service = index + 1
    const roles = ["administrator", "moderator", "standard user"];

    const closeForm = () => {
        setOpenChangeUserRoleForm(false);
    };

    /**
     * Update user role if form is valid.
     */
    async function handleSubmit() {
        // Remove previous error messages
        setSubmitMsg("");

        // Ensure valid role chosen
        let roleId = roles.indexOf(roleInput) + 1;  // 0 if not found
        if (roleId === 0) {
            setMsgIsError(true);
            setSubmitMsg("Invalid role. Choose from the options given.");
            return;
        }

        // Ensure user is found
        let userId = await searchUserEmail(emailInput);
        if (userId === -1) {
            setMsgIsError(true)
            setSubmitMsg("User email not found. Please try again.");
            return;
        }

        // Proceed with change role
        let ok = await updateRole(userId, roleId);
        if (!ok) {
            setMsgIsError(true);
            setSubmitMsg("Unable to update role. Note: user may already have this role.");
        } else {
            // Notify user of successful submit
            setMsgIsError(false);
            setSubmitMsg("Update successful!");
        }
    }

    /**
     * Retrieves the user id of attached to the user email given.
     * Returns the user id, or -1 if user is not found.
     * @param {String} email A user's email to search for
     */
    async function searchUserEmail(email) {
        return fetch(`https://climatetree-api-gateway.azurewebsites.net/user/searchemail/${email}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + user.jwt,
                "Content-Type": "application/json",
            },
        }).then(response => {
            return response.json();
        }).then(response => {
            if (response.users) {
                return response.users.userId;
            } else {
                return -1;
            }
        }).catch((error) => {
            console.log(error);
            return -1;
        });
    }

    /**
     * Changes the user role of the given user.
     * @param {Integer} userId The ID of the user needing an update
     * @param {Integer} roleId The ID of the new role for this user
     */
    async function updateRole(userId, roleId) {
        return fetch(`https://climatetree-api-gateway.azurewebsites.net/user/${userId}/${roleId}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + user.jwt,
                "Content-Type": "application/json",
            },
        }).then(response => {
            return response.ok;
        }).catch(error => {
            console.log(error);
            return false;
        });
    }

    return (
        <section className="role-change-form-wrapper">
            <form autoComplete="off">
                <header>
                    <p className="">Change User Role</p>
                    <div className="close-btn">
                        <img
                            src={CloseIcon}
                            alt="close change role form"
                            onClick={closeForm}
                        />
                    </div>
                </header>
                <div className="form-body">
                    <label htmlFor="user-email">User Email</label>
                    <input
                        name="user-email"
                        type="email"
                        value={emailInput}
                        onChange={(event) => {
                            setEmailInput(event.target.value);
                        }}
                        placeholder="name@example.com"
                    />
                    <div className="dropdown-input">
                        <DropdownInput
                            name="role"
                            type="text"
                            label="Change Role To"
                            placeholder="click to choose"
                            allOptions={roles}
                            searchTerm={roleInput}
                            setSearchTerm={setRoleInput}
                            optional={false}
                        />
                    </div>
                    <footer>
                        <button
                            className="post-change"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                        {submitMsg && (
                            <p className={msgIsError ? "error-msg" : "success-msg"}>
                                {submitMsg}
                            </p>
                        )}
                    </footer>
                </div>
            </form>
        </section>
    );
}

export default ChangeUserRoleForm;