import React from "react";

const StoryDetail = ({ story }) => {
  return (
    <div
      style={{
        border: "1px solid #e2e2e2",
        borderRadius: "5px",
        margin: "15px 0"
      }}
    >
      <div style={{ padding: "5px 25px" }}>
        <a href={story.hyperlink} target="_blank" rel="noopener noreferrer">
          <h3>{story.title}</h3>
        </a>
        <div style={{ fontSize: "15px", marginBottom: "5px" }}>
          Created:{" "}
          {`${story.date.getUTCMonth() +
            1}/${story.date.getUTCDate()}/${story.date.getUTCFullYear()}`}
        </div>
      </div>

      <div>
        <div>
          <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
            <div
              style={{
                padding: "3px 0",
                display: "flex",
                flexGrow: 1,
                flexDirection: "row",
                order: 1,
                borderTop: "1px solid #e2e2e2"
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: "1 0 0px",
                  justifyContent: "center"
                }}
              >
                <i
                  class="far fa-heart fa-2x"
                  style={{ color: "black", cursor: "pointer" }}
                ></i>
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: "1 0 0px",
                  justifyContent: "center"
                }}
              >
                <i
                  class="far fa-comment fa-2x"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
