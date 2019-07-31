import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../assets/img/rolling.svg";
import { getPost } from "../../../actions/post";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <div className="Developers-loader-container">
      <img src={Loader} alt="Loading..." className="Developers-loader" />
    </div>
  ) : (
    <div className="container">
      <Link to="/posts" className="btn">
        {" "}
        Back to Feed
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postID={post._id} />
      <div className="comments">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postID={post._id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
