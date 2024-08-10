import CustomModal from "../components/CustomModal";
import { deletePost, getSchdPosts } from "../features/Post/postSlice";
import { getPosts } from "../features/Post/postSlice";
import { getApprovePosts } from "../features/Post/postSlice";
import { resetState } from "../features/Users/usersSlice";
import moment from "moment";
import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

function SchedulePosts() {
  // user token
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // user token
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  // const history = useHistory();

  const { deletedPost, isSuccessDel, isSuccessStatus } = postState;
  const posts = postState?.posts;
  useEffect(() => {
    dispatch(resetState()); // at first render alway clear the state(like loading, success etc)
    dispatch(getSchdPosts(token));
    // dispatch(getApprovePosts());
  }, [deletedPost]);

  // delete
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleDeletePost = () => {
    const ids = { id, token };
    dispatch(deletePost(ids));
    setOpen(false);
    if (isSuccessDel) {
      toast.success("Post Deleted Successfully");
    }
  };

  // const setPostStatus = (e) => {
  //   // console.log(e);
  //   const item = e;
  //   const items = { item, token };
  //   dispatch(getApprovePosts(items));
  // };
  console.log(postState);
  return (
    <>
      <Container fluid>
        {/* <Row className="gap-3">
          <div
            // style={{ width: "97%" }}
            className="d-flex justify-content-end my-2"
          >
            <Link to="/admin/create-post">
              <Button>Create Post</Button>
            </Link>
          </div>
          <div
            // style={{ width: "97%" }}
            className="d-flex justify-content-end my-2"
          >
            <Form.Group style={{ width: "25%" }}>
              <Form.Control
                placeholder="Search Post..."
                type="text"
              ></Form.Control>
            </Form.Group>{" "}
          </div>
        </Row> */}
        <Row>
          <Col md="10">
            <Card className="strpied-tabled-with-hover">
              <Card.Header className="d-flex justify-content-between">
                <div>
                  <Card.Title as="h4">Scheduled Posts</Card.Title>
                  {/* <p className="card-category">
                    Here is a subtitle for this table
                  </p> */}
                </div>
                {/* <Form.Group className="p-3">
                  <Form.Select
                    // defaultValue={enqState[i].status ? enqState[i].status : "Submitted"}
                    style={{
                      border: "1px solid grey !important",
                      width: "200px",
                      height: "30px",
                      paddingLeft: "10px",
                      borderRadius: "5px",
                    }}
                    aria-label="Default select example"
                    onChange={(e) => setPostStatus(e.target.value)}
                  >
                    <option>Filter Post...</option>
                    <option value="false">Unapproved</option>
                    <option value="true">Approved</option>
                  </Form.Select>
                </Form.Group> */}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Title</th>
                      <th className="border-0">Author</th>
                      {/* <th className="border-0">No. of comment</th>
                      <th className="border-0">No. of likes</th> */}
                      <th className="border-0">Bible Ref</th>
                      <th className="border-0">Date Posted</th>
                      <th className="border-0">Status</th>
                      {/* <th className="border-0">Delete</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {posts?.map((post, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link to={`/admin/post/${post?.id}`}>
                              {post?.Post?.title}
                            </Link>
                          </td>
                          <td>{post?.Post?.User?.username}</td>
                          {/* <td>{post?.Post?.CommentCount}</td>
                          <td>{post?.Post?.likeCount}</td> */}
                          <td>{post?.Post?.bible_book}</td>
                          <td>{moment(post?.published_at).format("L")}</td>
                          <td>
                            {post?.status ? (
                              <span className="text-success">Published</span>
                            ) : (
                              <span className="text-warning">
                                Not Published
                              </span>
                            )}
                          </td>
                          {/* <td>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-119603706">
                                  Delete This Post
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                                onClick={() => showModal(post?.id)}
                              >
                                <i
                                  style={{ fontSize: "1.4rem" }}
                                  className="fas fa-times"
                                ></i>
                              </Button>
                            </OverlayTrigger>
                          </td> */}
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
      <CustomModal
        handleClose={hideModal}
        show={open}
        performAction={() => {
          handleDeletePost();
        }}
        title="Are you sure you want to delete this Post?"
      />
    </>
  );
}

export default SchedulePosts;

{
  /* <Form.Group>
<Form.Control
  placeholder="Search Post..."
  type="text"
></Form.Control>
</Form.Group> */
}
