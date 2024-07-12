import CustomModal from "../components/CustomModal";
import { getUsers } from "../features/Users/usersSlice";
import { searchUserByName } from "../features/Users/usersSlice";
import { getUsersByTopics } from "../features/Users/usersSlice";
import { changeUserRole } from "../features/Users/usersSlice";
import { resetState } from "../features/Users/usersSlice";
import { getCategories } from "../features/category/categorySlice";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

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
  Tooltip,
  OverlayTrigger,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const Users = () => {
  const [username, setUsername] = useState("");
  // user token
  //
  const categoryState = useSelector((state) => state.category.category);
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // user token
  const [num, setNum] = useState(1);
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);
  const roleState = useSelector((state) => state.users);

  let { updatedRole, usersTopics } = roleState;
  let data2 = usersState?.users?.data;
  let data3 = usersTopics;
  data2 = data2?.filter((user) => user?.role === "user" && !user?.status);
  data3 = data3?.filter((user) => user?.role === "user" && !user?.status);

  //

  // Approve Users
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleMakeCreator = () => {
    const ids = { id, token };
    dispatch(resetState());
    dispatch(changeUserRole(ids));
    setOpen(false);
  };

  // Set Category
  const categorySelect = []; // set a coloropt array
  categoryState?.data?.forEach((i) => {
    categorySelect.push({
      name: i.name,
      value: i.name,
    });
  });

  const setPostStatus = (e) => {
    console.log(e);
    const item = e;
    const items = { item, token };
    dispatch(getUsersByTopics(items));
  };

  useEffect(() => {
    const nums = { num, token };
    dispatch(resetState());
    dispatch(getUsers(nums));
  }, [num, updatedRole]);

  useEffect(() => {
    dispatch(getCategories(token));
  }, []);

  const usersAggregate = data3 ? data3 : data2;

  // Create a useEffect to watch for changes in the 'name' state while searching for Users by name
  useEffect(() => {
    let timer;
    // Define a delay (e.g., 2000 milliseconds = 2 seconds)
    const delay = 2000;
    // Check if the 'name' has a value and it's not empty
    if (username.trim() !== "") {
      // Clear the existing timer, if any
      clearTimeout(timer);
      // Start a new timer to fetch data after the delay
      timer = setTimeout(() => {
        // Dispatch the action to fetch data using the 'name'
        const nums = { username, token };
        dispatch(searchUserByName(nums));
      }, delay);
    }

    // Clean up the timer if the component unmounts or 'name' changes
    return () => {
      clearTimeout(timer);
    };
  }, [username, dispatch]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value); // Update the username state with the input value
    // console.log(e.target.value);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <div
            style={{ width: "97%" }}
            className="d-flex justify-content-end my-2"
          >
            <Form.Group style={{ width: "25%" }}>
              <Form.Control
                placeholder="Search user..."
                type="text"
                onChange={handleUsernameChange}
              ></Form.Control>
            </Form.Group>{" "}
          </div>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Users' List</Card.Title>

                <Form.Group className="p-3">
                  <Form.Select
                    // defaultValue={enqState[i].status ? enqState[i].status : "Submitted"}
                    style={{
                      border: "1px solid grey !important",
                      width: "230px",
                      height: "30px",
                      paddingLeft: "10px",
                      borderRadius: "5px",
                    }}
                    aria-label="Default select example"
                    // value={categorySelect?.value}
                    onChange={(e) => setPostStatus(e.target.value)}
                  >
                    <option>filter users by topics followed...</option>
                    {categorySelect.map((i, j) => {
                      return (
                        <option key={j} value={i.value}>
                          {i.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {/* <th className="border-0">ID</th> */}
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone No.</th>
                      <th className="border-0">Date Joined</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">Assign Creator</th>
                      {/* <th className="border-0">Status</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {usersAggregate?.map((user, i) => {
                      return (
                        <tr key={i}>
                          {/* <td>{i + 1}</td> */}
                          <td>
                            <Link to={`/admin/user/${user.id}`}>
                              {user.username}
                            </Link>
                          </td>
                          <td>{user.email}</td>
                          <td>{!user?.phone ? "N/A" : user?.phone}</td>
                          <td>{moment(user.createdAt).format("L")}</td>
                          <td>{user.role}</td>
                          {/* <td>
                            {user.status ? (
                              <span className="text-danger">Suspended</span>
                            ) : (
                              <span className="text-success">Active</span>
                            )} */}
                          {/* </td> */}
                          <td>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-119603706">
                                  Assign As Creator
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="success"
                                onClick={() => showModal(user?.id)}
                              >
                                <i
                                  style={{ fontSize: "1.4rem" }}
                                  className="fas fa-check"
                                ></i>
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
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
                disabled={data2?.length === 0}
              >
                Next
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <CustomModal
        handleClose={hideModal}
        show={open}
        performAction={() => {
          handleMakeCreator();
        }}
        title="Are you sure you want make this user a creator?"
      />
    </>
  );
};

export default Users;
