import { getCategories } from "../features/category/categorySlice";
import moment from "moment";
import React, { useEffect } from "react";

// react-bootstrap components
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function Tags() {
  const dispatch = useDispatch();
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  const categoryState = useSelector((state) => state.category.category);
  useEffect(() => {
    dispatch(getCategories(token));
  }, []);
  // console.log(categoryState?.data);

  // categoryState = categoryState?.set();

  return (
    <>
      <Container style={{ padding: "1rem 10rem" }} fluid>
        <Row className="px-5">
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Tag List</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {/* <th className="border-0">ID</th> */}
                      <th className="border-0">Name</th>
                      <th className="border-0">Date Added</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryState?.data
                      ?.filter(
                        (category, i, self) =>
                          self.findIndex(
                            (c) =>
                              c.name.toLowerCase() ===
                              category.name.toLowerCase()
                          ) === i
                      )
                      .map((category, i) => (
                        <tr key={i}>
                          <td>{category?.name?.toUpperCase()}</td>
                          <td>{moment(category?.createdAt).format("L")}</td>
                        </tr>
                      ))}
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

export default Tags;
