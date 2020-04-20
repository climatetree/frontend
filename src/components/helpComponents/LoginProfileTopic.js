import React from "react";

const LoginProfileTopic = () => {
  return (
    <div className="help-topic">
      <h1 className="big-title">Log-in/Profile</h1>
      <div className="help-header">
        <p className="objective">"Be a Part of the ClimateTree Community"</p>
      </div>
      <div className="help-body">
        <div className="help-content-paragraph">
          <h2 className="help-title">Log-in</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            The Log-in page will prompt you to use your Facebook or Google
            account to become a recognized user on ClimateTree&trade;. Your
            personal data is protected and not collected by ClimateTree&trade;
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">Profile</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            Once signed in, your profile will have a “Post a Story” function
            where you can share climate change solutions stories with
            ClimateTree&trade;.
          </p>
          <br />
          <p className="topic-explanation">
            You will also be able to scroll your past posts and see likes,
            comments, and ratings on them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginProfileTopic;
