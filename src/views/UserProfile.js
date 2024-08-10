import React, { useEffect, useState } from "react";

import moment from "moment";
// react-bootstrap components
import { Button, Card, Container, Row, Col, Table, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeUserRole, getUserLikes } from "../features/Users/usersSlice";
import { resetState } from "../features/Users/usersSlice";
import { getAUser } from "../features/Users/usersSlice";
import { getAUserPosts } from "../features/Post/postSlice";
import { suspendAUser } from "../features/Users/usersSlice";
import { UnsuspendAUser } from "../features/Users/usersSlice";

import { getUserBookmarks } from "../features/Users/usersSlice";
import { getPostsCommented } from "../features/Post/postSlice";

function User() {
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  // Prev
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);
  const auserPostsState = useSelector((state) => state.post);

  const {
    isSuccess,
    isError,
    user,
    updatedRole,
    suspendAU,
    unSuspendAU,
    userBookmarks,
  } = userState;
  const { aUserPosts } = auserPostsState;
  // both below have empty array
  // console.log(auserPostsState?.postsCommentedOn);
  // console.log(userState?.userLikes);
  console.log(userState?.userBookmarks);

  useEffect(() => {
    if (updatedRole) {
      toast.success("Role Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isError, updatedRole]);
  useEffect(() => {
    if (isSuccess && suspendAU) {
      toast.success("Creator Suspended!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, suspendAU]);

  useEffect(() => {
    const ids = { id, token };
    dispatch(resetState());
    dispatch(getAUser(ids));
  }, [id, updatedRole, suspendAU, unSuspendAU]);

  useEffect(() => {
    const ids = { id, token };
    dispatch(getPostsCommented(ids));
    dispatch(getUserLikes(ids));
    dispatch(getUserBookmarks(ids));
    dispatch(getAUserPosts(ids));
  }, [id]);

  const bookmarks = userBookmarks?.filter((item) => item.userId == id);

  const [eventKey, setEventKey] = useState("link-0");
  // console.log(bookmarks);
  return (
    <>
      <Container fluid>
        <Row className="mb-4 pl-4">
          <Link to="/admin/users">{"<<<"} Go Back</Link>
        </Row>
        {/* Tab starts here */}

        {/* {user?.role === "user" && ( */}
        <Nav className="my-4" fill variant="tabs">
          <Nav.Item>
            <Nav.Link
              eventKey={"link-0"}
              onClick={() => setEventKey("link-0")}
              style={{
                backgroundColor: eventKey === "link-0" ? "#007bff" : "",
                color: eventKey === "link-0" ? "#fff" : "",
              }}
            >
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey={"link-1"}
              onClick={() => setEventKey("link-1")}
              style={{
                backgroundColor: eventKey === "link-1" ? "#007bff" : "",
                color: eventKey === "link-1" ? "#fff" : "",
              }}
            >
              Liked Posts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey={"link-2"}
              onClick={() => setEventKey("link-2")}
              style={{
                backgroundColor: eventKey === "link-2" ? "#007bff" : "",
                color: eventKey === "link-2" ? "#fff" : "",
              }}
            >
              Bookmarks
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {/* )} */}

        {/* Tab ends here */}
        <Row className="px-3">
          {
            // user?.role === "user"  &&
            eventKey === "link-0" && (
              <Col md="4">
                <Card className="card-user">
                  <div className="card-image"></div>
                  <Card.Body>
                    <div className="author">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={require("../assets/img/default-avatar.png")}
                        ></img>
                        <h5 className="title">{user?.username}</h5>
                      </a>
                      <span className="description">
                        {user?.email} | {user?.phone ? user?.phone : "N/A"}
                      </span>
                      <p className="description">
                        Date Joined:{" "}
                        {moment(user?.otp_date).format("YYYY-MM-DD")}
                      </p>
                    </div>
                    <div className="description text-center">
                      {/* <div>no of likes, no of comments, no of bookmarks</div> */}
                      <span className="mx-1 text-info">
                        Posts: {user?.postCount}
                      </span>{" "}
                      |{" "}
                      <span className="mx-1 text-muted">
                        Followers: {user?.followersCount}
                      </span>{" "}
                      |{" "}
                      <span className="mx-1 text-warning">
                        Following: {user?.followingCount}
                      </span>
                      {/* <span className="mx-1 text-info">likes: 10</span> |{" "}
                    <span className="mx-1 text-muted">comments: 15</span> |{" "}
                    <span className="mx-1 text-warning">bookmarks: 5</span> */}
                    </div>
                  </Card.Body>
                  <hr></hr>
                  <div className="button-container my- d-flex justify-content-center m-2">
                    {user?.role === "user" && !user?.status ? (
                      <Button
                        className="btn-outlined btn-icon"
                        // href="#"
                        // onClick={(e) => e.preventDefault()}
                        variant="info"
                        onClick={() => {
                          const ids = { id, token };
                          dispatch(changeUserRole(ids));
                        }}
                      >
                        {/* <i className="fab fa-facebook-square"></i> */}
                        Make A Creator
                      </Button>
                    ) : (
                      ""
                    )}
                    {user?.role === "creator" && !user?.status ? (
                      <Button
                        className="btn-outlined btn-icon"
                        // href="#"
                        onClick={() => {
                          const ids = { id, token };
                          dispatch(suspendAUser(ids));
                        }}
                        variant="warning"
                      >
                        {/* <i className="fab fa-twitter"></i> */}
                        Suspend creator
                      </Button>
                    ) : (
                      ""
                    )}
                    {user?.status ? (
                      <Button
                        className="btn-outlined btn-icon"
                        // href="#"
                        onClick={() => {
                          const ids = { id, token };
                          dispatch(UnsuspendAUser(ids));
                        }}
                        variant="warning"
                      >
                        {/* <i className="fab fa-twitter"></i> */}
                        Unsuspend creator
                      </Button>
                    ) : (
                      ""
                    )}
                    {/* <Button
                  className="btn-outlined btn-icon"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button> */}
                  </div>
                </Card>
              </Col>
            )
          }
          {user?.role === "creator" && eventKey === "link-0" && (
            <Col md="8">
              <Row>
                <Card className="strpied-tabled-with-hover">
                  <Card.Header className="d-flex justify-content-between">
                    <div>
                      <Card.Title as="h4">Creator's Posts</Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Title</th>
                          <th className="border-0">Author</th>
                          <th className="border-0">no comment</th>
                          <th className="border-0">no of likes</th>
                          <th className="border-0">bible ref.</th>
                          <th className="border-0">date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aUserPosts?.map((post, i) => (
                          <tr key={i}>
                            <td>{post?.title}</td>
                            <td>{post?.User?.username}</td>
                            <td>{post?.CommentCount}</td>
                            <td>{post?.likeCount}</td>
                            <td>{post?.bible_book}</td>
                            <td>{moment(post?.createdAt).format("L")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          )}

          {/* {user?.role === "user" && ( */}
          <Col md="12 mx-3">
            {eventKey === "link-0" && (
              <Row>
                <Card className="strpied-tabled-with-hover">
                  <Card.Header className="d-flex justify-content-between">
                    <div>
                      <Card.Title as="h4">
                        List of Posts Commented on
                      </Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Title</th>
                          <th className="border-0">Author</th>
                          <th className="border-0">comment</th>
                          <th className="border-0">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auserPostsState?.postsCommentedOn &&
                          auserPostsState?.postsCommentedOn.length > 0 && (
                            <tr>
                              <td>
                                <Link to={`/admin/post/21`}>
                                  Post Title one of September
                                </Link>
                              </td>
                              <td>Dakota Joe</td>
                              <td>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Maxime mollitia, amet
                                consectetur adipisicing elit.
                              </td>
                              <td>25/09/2023</td>
                            </tr>
                          )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Row>
            )}
            {eventKey === "link-1" && (
              <Row>
                <Card className="strpied-tabled-with-hover mr-3">
                  <Card.Header className="d-flex justify-content-between">
                    <div>
                      <Card.Title as="h4">All Liked Posts</Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Title</th>
                          <th className="border-0">Author</th>
                          <th className="border-0">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userState?.userLikes &&
                          userState?.userLikes.length > 0 && (
                            <tr>
                              <td>Niger</td>
                              <td>Dakota Rice</td>
                              <td>Dakota Rice</td>
                            </tr>
                          )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Row>
            )}
            {eventKey === "link-2" && (
              <Row>
                <Card className="strpied-tabled-with-hover">
                  <Card.Header className="d-flex justify-content-between">
                    <div>
                      <Card.Title as="h4">List of bookmarks</Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Title</th>
                          <th className="border-0">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userState?.userBookmarks?.map((item, i) => (
                          <tr key={i}>
                            <td>{item?.post?.title}</td>
                            <td>{moment(item?.createdAt).format("L")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Row>
            )}
          </Col>
          {/*  )} */}
        </Row>
      </Container>
    </>
  );
}

export default User;

{
  /*
  {
    user?.role === "creator" && eventKey === "link-0" && (
      <Col md="4">
        <Card className="card-user">
          <div className="card-image"></div>
          <Card.Body>
            <div className="author">
              <a href="#" onClick={(e) => e.preventDefault()}>
                <img
                  alt="..."
                  className="avatar border-gray"
                  src={require("../assets/img/default-avatar.png")}
                ></img>
                <h5 className="title">{user?.username}</h5>
              </a>
              <span className="description">
                {user?.email} | {user?.phone ? user?.phone : "N/A"}
              </span>
              <p className="description">
                Date Joined: {moment(user?.otp_date).format("YYYY-MM-DD")}
              </p>
            </div>
            <div className="description text-center">
              <span className="mx-1 text-info">likes: 10</span> |{" "}
              <span className="mx-1 text-muted">comments: 15</span> |{" "}
              <span className="mx-1 text-warning">bookmarks: 5</span>
            </div>
          </Card.Body>
          <hr></hr>
          <div className="button-container mr-auto ml-auto my-3">
            {user?.role === "user" && !user?.status ? (
              <Button
                className="btn-outlined btn-icon"
                // href="#"
                // onClick={(e) => e.preventDefault()}
                variant="info"
                onClick={() => {
                  const ids = { id, token };
                  dispatch(changeUserRole(ids));
                }}
              >
                Make A Creator
              </Button>
            ) : (
              ""
            )}
            {user?.role === "creator" && !user?.status ? (
              <Button
                className="btn-outlined btn-icon"
                // href="#"
                onClick={() => {
                  const ids = { id, token };
                  dispatch(suspendAUser(ids));
                }}
                variant="warning"
              >
                Suspend creator
              </Button>
            ) : (
              ""
            )}
            {user?.status ? (
              <Button
                className="btn-outlined btn-icon"
                // href="#"
                onClick={() => {
                  const ids = { id, token };
                  dispatch(UnsuspendAUser(ids));
                }}
                variant="warning"
              >
                Unsuspend creator
              </Button>
            ) : (
              ""
            )}
          </div>
        </Card>
      </Col>
    );
  }
*/
}
