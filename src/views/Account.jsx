import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import "../assets/error.css";

// Yup validation setting, yup doc
let schema = yup.object().shape({
  oldPassword: yup.string().required("Old Password is Required"),
  newPassword: yup.string().required("New Password is Required"),
});
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import CustomInput from "../components/CustomInput";
import { createTag } from "../features/category/categorySlice";
import { resetState } from "../features/Users/usersSlice";
import { toast } from "react-toastify";
import { changePassword } from "../features/auth/authSlice";

function Account() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector((state) => state);
  const { user, isError, newCredentials, isLoading } = authState.auth;
  const token = user?.data?.token;

  //
  const formik = useFormik({
    // initial form state
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: schema, // to validate the yup setup schema
    onSubmit: (values) => {
      const userData = {
        oldPassword: values?.oldPassword,
        newPassword: values?.newPassword,
        token,
      };
      dispatch(changePassword(userData));
    },
  });

  useEffect(() => {
    if (newCredentials) {
      toast.success("Password Changed Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isError, newCredentials]);

  useEffect(() => {
    if (newCredentials) {
      formik.setFieldValue("oldPassword", "");
      formik.setFieldValue("newPassword", "");
    }
  }, [newCredentials]);

  return (
    <>
      <Container style={{ padding: "1rem 2rem" }} fluid>
        <Row className="px-5">
          <Col md="12">
            <Card style={{ width: "20rem" }}>
              <Card.Header>
                <Card.Title as="h4">Change Password</Card.Title>
              </Card.Header>
              <Card.Body>
                <form action="" onSubmit={formik.handleSubmit}>
                  <div>
                    <CustomInput
                      type="password"
                      label="Old Password"
                      id="oldPassword"
                      name="oldPassword"
                      onChng={formik.handleChange("oldPassword")}
                      onBlr={formik.handleBlur("oldPassword")}
                      val={formik.values.oldPassword}
                    />
                    <div className="error mt-2">
                      {formik.touched.oldPassword && formik.errors.oldPassword}
                    </div>
                  </div>

                  <div>
                    <CustomInput
                      type="password"
                      label="New Password"
                      id="newPassword"
                      name="newPassword"
                      onChng={formik.handleChange("newPassword")}
                      onBlr={formik.handleBlur("newPassword")}
                      val={formik.values.newPassword}
                    />
                    <div className="error mt-2">
                      {formik.touched.newPassword && formik.errors.newPassword}
                    </div>
                  </div>

                  <button
                    className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                    style={{ background: "blue" }}
                    type="submit"
                  >
                    {isLoading ? "Submittiing" : "Submit"}
                  </button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;
