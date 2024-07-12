import { getUsers } from "../features/Users/usersSlice";
import { searchCreatorsByName } from "../features/Users/usersSlice";
import { getCreatorUsers } from "../features/Users/usersSlice";
import { resetState } from "../features/Users/usersSlice";
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
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Creators() {
  const [username, setUsername] = useState("");
  // user token
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // user token

  const [num, setNum] = useState(1);
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);

  let data2 = usersState?.creators?.data;
  data2 = data2?.filter((user) => user?.role === "creator" && !user?.status);

  useEffect(() => {
    const nums = { num, token };
    dispatch(resetState());
    dispatch(getCreatorUsers(nums));
  }, [num]);

  // console.log(data2);

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
        dispatch(searchCreatorsByName(nums));
      }, delay);
    }

    // Clean up the timer if the component unmounts or 'name' changes
    return () => {
      clearTimeout(timer);
    };
  }, [username, dispatch]);

  const handleCreatornameChange = (e) => {
    setUsername(e.target.value); // Update the username state with the input value
    console.log(e.target.value);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Creators' List</Card.Title>

                <div
                  style={{ width: "97%" }}
                  className="d-flex justify-content-end my-2"
                >
                  <Form.Group style={{ width: "25%" }}>
                    <Form.Control
                      placeholder="Search Post..."
                      type="text"
                      onChange={handleCreatornameChange}
                    ></Form.Control>
                  </Form.Group>{" "}
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {/* <th className="border-0">ID</th> */}
                      <th className="border-0">Creator Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone No.</th>
                      <th className="border-0">No. Content</th>
                      <th className="border-0">Date Assigned</th>
                      <th className="border-0">Date Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data2?.map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link to={`/admin/user/${user.id}`}>
                              {user.username}
                            </Link>
                          </td>
                          <td>{user.email}</td>
                          <td>{!user?.phone ? "N/A" : user?.phone}</td>
                          <td>{"4"}</td>
                          <td>{moment(user.updatedAt).format("L")}</td>
                          <td>{moment(user.createdAt).format("L")}</td>
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
    </>
  );
}

export default Creators;
