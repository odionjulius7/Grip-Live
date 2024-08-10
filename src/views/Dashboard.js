import React, { useEffect } from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MonthlyUser from "../Charts/MonthlyUser";

import "../App.css";
import MonthlyPosts from "../Charts/MonthlyPosts";
import DailyUsers from "../Charts/DailyUsers";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../features/Users/usersSlice";
import { getPosts } from "../features/Post/postSlice";
import { getUsers } from "../features/Users/usersSlice";
import { getUsersAggregate } from "../features/Users/usersSlice";
import moment from "moment";
import { getApprovePosts } from "../features/Post/postSlice";
import { getMonthlyUsers } from "../features/Users/usersSlice";
import DailyPosts from "../Charts/DailyPosts";

function Dashboard() {
  // user token
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // user token
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const usersState = useSelector((state) => state.users);
  const history = useHistory();

  const { deletedPost, isSuccessDel, isSuccessStatus } = postState;
  const posts = postState?.posts;
  useEffect(() => {
    const nums = { token };
    const items = { item: "false", token };
    dispatch(resetState()); // at first render alway clear the state(like loading, success etc)
    dispatch(getUsers(nums));
    dispatch(getApprovePosts(items));
  }, []);

  // Users

  let users = usersState?.users?.data;
  users = users?.filter((user) => user?.role === "user" && !user?.status);

  // counts
  const usersAggreg = useSelector((state) => state.users.userAggregate);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getUsersAggregate(token));
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card
              className="card-stats"
              style={{
                cursor: "pointer",
              }}
              onClick={() => history.push("/admin/scheduled-posts")}
            >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Content waiting approval</p>
                      <Card.Title as="h4">{posts?.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats" style={{ cursor: "pointer" }}>
                  <i className="fas fa-redo mr-1"></i>
                  Check Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card
              className="card-stats"
              style={{
                cursor: "pointer",
              }}
              onClick={() => history.push("/admin/creators")}
            >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">No. of creators</p>
                      <Card.Title as="h4">{usersAggreg?.creators}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  All Creators
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card
              className="card-stats"
              style={{
                cursor: "pointer",
              }}
              onClick={() => history.push("/admin/users")}
            >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">No. of Users</p>
                      <Card.Title as="h4">
                        {usersAggreg?.subscribers}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  All Users
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card
              className="card-stats"
              style={{
                cursor: "pointer",
              }}
              onClick={() => history.push("/admin/posts")}
            >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      {/* <i className="nc-icon nc-favourite-28 text-primary"></i>
                       */}
                      <i className="nc-icon nc-chart text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">No of posts made</p>
                      <Card.Title as="h4">{usersAggreg?.all_post}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Total Posts
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4"> Daily App Users</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <DailyUsers />
                </div>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4"> Daily Posts</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <DailyPosts />
                </div>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Monthly App Users</Card.Title>
                {/* <p className="card-category">24 Hours performance</p> */}
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <MonthlyUser />
                </div>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Monthly Posts</Card.Title>
                {/* <p className="card-category">24 Hours performance</p> */}
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <MonthlyPosts />
                </div>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Posts Waiting Approval</Card.Title>
                <p className="card-category">
                  All Posts excluding Approved ones
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Title</th>
                      <th className="border-0">Author</th>
                      <th className="border-0">Date Posted</th>
                      <th className="border-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts?.map((post, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link to={`/admin/post/${post?.id}`}>
                              {post?.title}
                            </Link>
                          </td>
                          <td>{post?.User?.username}</td>
                          <td>{moment(post.createdAt).format("L")}</td>
                          <td>
                            {post?.status ? (
                              <span className="text-success">Approved</span>
                            ) : (
                              <span className="text-warning">Unapproved</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users List</Card.Title>
                <p className="card-category">All Users excluding Creators</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Role</th>
                      {/* <th className="border-0">Reg. date</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link to={`/admin/user/${user.id}`}>
                              {user.username}
                            </Link>
                          </td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>

                          {/* <td>{moment(user.createdAt).format("L")}</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
              {/* <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Tesla Model S <i className="fas fa-circle text-danger"></i>
                  BMW 5 Series
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

{
  /* <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Top Posts</Card.Title>
                <p className="card-category">Post With The Most Likes</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td
                          className="td-actions text-right"
                          onClick={() => {
                            history.push(`/admin/post/${34}`);
                          }}
                        >
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488980961">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td
                          className="td-actions text-right"
                          onClick={() => {
                            history.push(`/admin/post/${34}`);
                          }}
                        >
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-537440761">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td
                          className="td-actions text-right"
                          onClick={() => {
                            history.push(`/admin/post/${34}`);
                          }}
                        >
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-577232198">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-773861645">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Create 4 Invisible User Experiences you Never Knew
                          About
                        </td>
                        <td
                          className="td-actions text-right"
                          onClick={() => {
                            history.push(`/admin/post/${34}`);
                          }}
                        >
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-422471719">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-829164576">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                disabled
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Unfollow 5 enemies from twitter</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-938342127">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-119603706">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col> */
}
