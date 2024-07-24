import { resetState } from "../features/Users/usersSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import {
  getAPostComments,
  approvePost,
  getAPost,
} from "../features/Post/postSlice";

function Post() {
  // user token
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // user token
  const [num, setNum] = useState(1);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  console.log(id);
  //
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const { isSuccess, isError, isLoading, aPostComments, updatedPost, post } =
    postState;

  const renderMedia = () => {
    if (post?.file_type === "image") {
      return (
        <img
          width="100%"
          style={{
            maxHeight: "400px",
            marginBottom: "1rem",
            border: "1px solid #e3e3e3",
            objectFit: "fill",
          }}
          src={post?.file}
          alt={post?.title}
        />
      );
    } else if (post?.file_type === "video") {
      return (
        // <video
        //   width="100%"
        //   style={{ height: "400px" }}
        //   controls
        //   src={post?.file}
        // />
        <ReactPlayer
          url={post?.file}
          controls
          width="100%"
          style={{ height: "400px" }}
        />
      );
    } else if (post?.file_type === "audio") {
      return (
        <audio
          // width="100%"
          style={{ marginBottom: "1rem" }}
          controls
          src={post?.file}
        />
      );
    } else {
      return null; // Return null if file_type is not recognized
    }
  };
  console.log(post);
  useEffect(() => {
    if (updatedPost) {
      toast.success("Post Approved Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isError, updatedPost]);

  useEffect(() => {
    const ids = { id, token };
    dispatch(resetState());
    dispatch(getAPost(ids));
  }, [id, updatedPost]);

  useEffect(() => {
    const ids = { id, num, token };
    dispatch(getAPostComments(ids));
  }, [id, num]);
  // console.log(aPostComments);

  return (
    <>
      <Container className="" fluid>
        <Row className="mb-4 pl-4">
          <Link to="/admin/posts">{"<<<"} Go Back</Link>
        </Row>
        <Row className="">
          <Col md="9">
            <Card>
              <Card.Header className="p-2">
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title as="h4">{post?.title}</Card.Title>
                  {!post?.status && (
                    <button
                      type="button"
                      className="btn btn-primary ml-2"
                      onClick={() => {
                        const ids = { id, token };
                        dispatch(approvePost(ids));
                      }}
                    >
                      &nbsp;{isLoading ? "loading..." : "Approve Post"}
                    </button>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <div>{renderMedia()}</div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-5 align-items-center">
                    <div className="mr-5 d-flex flex-column justify-content-between align-items-center">
                      <span style={{ fontWeight: "600" }}>
                        {post?.CommentCount}
                      </span>
                      <span style={{ color: "#9a9a9a" }}>comments</span>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                      <span style={{ fontWeight: "600" }}>
                        {post?.likeCount}
                      </span>
                      <span style={{ color: "#9a9a9a" }}>Likes</span>
                    </div>
                  </div>
                  <div>
                    <span>{moment(post?.createdAt).format("L")}</span>
                  </div>
                </div>
                <div className="typography-line">
                  <h3>
                    <span>Author:</span>
                    {post?.User?.username}
                  </h3>
                </div>

                <div className="typography-line">
                  <span>bible reference:</span>
                  <p className="text-muted">
                    {post?.bible_book} {post?.bible_chapter}:{post?.bible_verse}
                  </p>
                </div>
              </Card.Body>
            </Card>
            {/*  */}
            <Card>
              <Card.Header>
                <Card.Title as="h4">List of comment</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">Comment</th>
                      <th className="border-0">Commenter</th>
                      <th className="border-0">Date</th>
                      {/* <th className="border-0">City</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {aPostComments?.map((comment, i) => {
                      return (
                        <tr key={i}>
                          <td>{comment?.comment}</td>
                          <td>{comment?.User?.username}</td>
                          <td>{moment(comment?.createdAt).format("L")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <div className="my-4 text-right">
                    <Button
                      disabled={num <= 1 ? true : false}
                      className="m-1"
                      onClick={() => {
                        if (num > 1) setNum((prev) => prev - 1);
                      }}
                    >
                      Prev
                    </Button>
                    <Button
                      onClick={() => setNum((prev) => prev + 1)}
                      className="m-1"
                      disabled={aPostComments?.length === 0}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <Card.Header>
                <Card.Title as="h4">List of users that liked post</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      {/* <th className="border-0">Date</th> */}
                      {/* <th className="border-0">City</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {post?.Likes?.map((like, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link to={`/admin/user/1`}>
                              {like?.User?.username}
                            </Link>
                          </td>
                          {/* <td>Niger</td> */}
                          {/* <td>Oud-Turnhout</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Post;
