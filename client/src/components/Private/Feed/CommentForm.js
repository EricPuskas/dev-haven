import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../../actions/post";

const CommentForm = ({ postID, addComment }) => {
  const [text, setText] = useState("");
  return (
    <div class="post-form">
      <form
        class="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(postID, {
            text
          });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
