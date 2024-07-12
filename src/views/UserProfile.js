import React, { useEffect, useState } from "react";

import moment from "moment";
// react-bootstrap components
import { Button, Card, Container, Row, Col, Table, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeUserRole } from "../features/Users/usersSlice";
import { resetState } from "../features/Users/usersSlice";
import { getAUser } from "../features/Users/usersSlice";
import { getAUserPosts } from "../features/Post/postSlice";
import { suspendAUser } from "../features/Users/usersSlice";
import { UnsuspendAUser } from "../features/Users/usersSlice";

import SVG from "../assets/img/SVGImg.png";
import { getUserBookmarks } from "../features/Users/usersSlice";
import { getPostsCommented } from "../features/Post/postSlice";

function User() {
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // const user = false;
  // const creator = true;
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  // console.log(id);

  // Prev
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);
  const auserPostsState = useSelector((state) => state.post);

  const {
    isSuccess,
    isError,
    isLoading,
    user,
    updatedRole,
    suspendAU,
    unSuspendAU,
    userBookmarks,
  } = userState;
  const { postsCommentedOn, aUserPosts } = auserPostsState;
  // logged user commented posts
  // console.log(postsCommentedOn);

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
    dispatch(getUserBookmarks(token));
    dispatch(getAUserPosts(ids));
  }, [id]);

  const bookmarks = userBookmarks?.filter((item) => item.userId == id);

  const [eventKey, setEventKey] = useState("link-0");
  console.log(eventKey);
  return (
    <>
      <Container fluid>
        {/* Tab starts here */}

        {user?.role === "user" && (
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
        )}

        {/* Tab ends here */}
        <Row className="px-3">
          {user?.role === "creator" && (
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
          {user?.role === "creator" && eventKey === "link-0" && (
            <Col md="4">
              <Card className="card-user">
                <div className="card-image">
                  {/* <img
                    alt="..."
                    src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                  ></img> */}
                </div>
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
                    <p className="description">Date Joined: 12/09/2023</p>
                  </div>
                  <div className="description text-center">
                    {/* <div>no of likes, no of comments, no of bookmarks</div> */}
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
          )}
          {user?.role === "user" && eventKey === "link-0" && (
            <Col md="4">
              <Card className="card-user">
                <div className="card-image">
                  {/* <img
                    alt="..."
                    src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                  ></img> */}
                </div>
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
                    <p className="description">Date Joined: 12/09/2023</p>
                  </div>
                  <div className="description text-center">
                    {/* <div>no of likes, no of comments, no of bookmarks</div> */}
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
          )}
          {user?.role === "user" && (
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
                          <tr>
                            <td>
                              <Link to={`/admin/post/21`}>
                                Post Title one of September
                              </Link>
                            </td>
                            <td>Dakota Joe</td>
                            <td>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Maxime mollitia, amet consectetur
                              adipisicing elit.
                            </td>
                            <td>25/09/2023</td>
                          </tr>
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
                          <tr>
                            <td>Niger</td>
                            <td>Dakota Rice</td>
                            <td>Dakota Rice</td>
                          </tr>
                          <tr>
                            <td>Niger</td>
                            <td>Dakota Rice</td>
                            <td>Dakota Rice</td>
                          </tr>
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
                          {bookmarks?.map((item, i) => (
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
          )}
        </Row>
      </Container>
    </>
  );
}

export default User;

{
  /* <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company (disabled)</label>
                        <Form.Control
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card> */
}
