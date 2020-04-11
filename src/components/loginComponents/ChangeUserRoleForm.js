import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../context/UserContext";
import CloseIcon from "../../images/x.svg";
import DropdownInput from "./DropdownInput";
import "./ChangeUserRoleForm.css";

const ChangeUserRoleForm = ({
    setOpenChangeUserRoleForm,
}) => {
    const { user } = useContext(UserContext);
    const [emailInput, setEmailInput] = useState("");
    const [roleInput, setRoleInput] = useState("");

    // Role ids for user service = index + 1
    const roles = ["administrator", "moderator", "standard user"];

    const closeForm = () => {
        setOpenChangeUserRoleForm(false);
    };

    async function searchUserEmail(email) {
        console.log(JSON.stringify({
            "email": email,
        }));
        fetch("https://climatetree-api-gateway.azurewebsites.net/user/searchemail", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + user.jwt,
                "Content-Type": "application/json",
            },
            // convert the data to json
            body: JSON.stringify({
                "email": email,
            }),
        }).then(response => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function updateRole(userId, roleId) {
        fetch(`https://climatetree-api-gateway.azurewebsites.net/user/${userId}/${roleId}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + user.jwt,
                "Content-Type": "application/json",
            },
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
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
                            onClick={async () => searchUserEmail(emailInput)}
                        >
                            Update
                        </button>
                    </footer>
                </div>
            </form>
        </section>
    );
}

export default ChangeUserRoleForm;