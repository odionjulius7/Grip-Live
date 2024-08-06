import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import CustomInput from "../components/CustomInput";
import { createTag, getCategories } from "../features/category/categorySlice";
import { resetState } from "../features/Users/usersSlice";
import "../assets/error.css";

// Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
});

function CreateTags() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector((state) => state);
  const categoryState = useSelector((state) => state.category);
  const { isLoading, isError, createdCategory } = categoryState;
  const { user } = authState.auth;
  const token = user?.data?.token;

  // tag list
  useEffect(() => {
    dispatch(getCategories(token));
  }, []);

  // console.log(categoryState?.category?.data);

  // Formik state and handlers
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const existingTags = categoryState?.category?.data.map((tag) =>
        tag.name.toLowerCase()
      );
      if (existingTags.includes(values.name.toLowerCase())) {
        alert("Tag already exists");
        return;
      }
      const items = { name: values.name, token };
      dispatch(createTag(items));
      dispatch(resetState());
      formik.setFieldValue("name", "");
    },
  });

  // Effect hook to handle toast messages
  useEffect(() => {
    if (createdCategory) {
      toast.success("Tag Created Successfully!");
      history.push("/admin/tag-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isError, createdCategory]);

  return (
    <Container fluid style={{ padding: "1rem 20rem" }}>
      <Row className="px-5">
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Create Tag</Card.Title>
            </Card.Header>
            <Card.Body>
              <form onSubmit={formik.handleSubmit}>
                <CustomInput
                  type="text"
                  label="Tag Name"
                  id="name"
                  name="name"
                  onChng={formik.handleChange("name")}
                  onBlr={formik.handleBlur("name")}
                  val={formik.values.name}
                />
                <div className="error mt-2">
                  {/* {formik.touched.name && formik.errors.name} */}
                </div>

                <button
                  className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                  style={{ background: "blue" }}
                  type="submit"
                >
                  {isLoading ? "Submitting" : "Submit"}
                </button>
              </form>
              {/* Additional Form Example (commented out) */}
              {/* <Form>
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

                <Button
                  className="btn-fill pull-right mt-3"
                  type="submit"
                  variant="info"
                >
                  Submit
                </Button>
                <div className="clearfix"></div>
              </Form> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateTags;
