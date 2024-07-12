import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/category/categorySlice";
import { toast } from "react-toastify";
import { postCreate } from "../features/Post/postSlice";

// Yup validation schema
const schema = Yup.object().shape({
  file: Yup.mixed().required("File is required"),
  image: Yup.mixed()
    .test(
      "fileType",
      "Only images are allowed",
      (value) => value && value.type.startsWith("image/")
    )
    .required("Image is required"),
  file_type: Yup.string()
    .oneOf(["video", "audio", "image"], "Invalid file type")
    .required("File type is required"),
  title: Yup.string().required("Title is required"),
  category: Yup.array()
    .of(Yup.string())
    .min(1, "At least one category is required"),
  bible_book: Yup.string(),
  bible_chapter: Yup.number().positive().integer(),
  bible_verse: Yup.number().positive().integer(),
  published_at: Yup.date(),
  description: Yup.string(),
  is_scheduled: Yup.boolean(),
});

function CreatePost() {
  const dispatch = useDispatch();
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  const categoryState = useSelector((state) => state.category.category);

  //
  const postState = useSelector((state) => state.post);
  // const history = useHistory();

  const { isLoading, isSuccess, posted, isError } = postState;

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    dispatch(getCategories(token));
  }, [dispatch, token]);

  const formik = useFormik({
    initialValues: {
      file: null,
      image: null,
      file_type: "",
      title: "",
      category: [],
      bible_book: "",
      bible_chapter: "",
      bible_verse: "",
      published_at: "",
      description: "",
      is_scheduled: false,
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // console.log("Form Values:", values);
        const formData = new FormData();

        // This approach allows you to handle both files as a single entity (files array)
        // on the server-side, if your backend expects them grouped together.
        formData.append("files", values.file);
        formData.append("files", values.image);

        formData.append("file_type", values.file_type);
        formData.append("title", values.title);
        formData.append("category", selectedCategories.join(","));
        formData.append("bible_book", values.bible_book);
        formData.append("bible_chapter", values.bible_chapter);
        formData.append("bible_verse", values.bible_verse);
        formData.append("published_at", values.published_at);
        formData.append("description", values.description);
        formData.append("is_scheduled", values.is_scheduled);

        // Log the formData to the console
        console.log("FormData:");
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        const data = { formData, token };
        await dispatch(postCreate(data));
        console.log("nnn", data);
        resetForm();
        setSelectedCategories([]); // Clear selected categories after submission
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.currentTarget.files[0]);
  };

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedCategories(value);
    formik.setFieldValue("category", value); // Update Formik field value
  };

  useEffect(() => {
    if (posted) {
      toast.success("Post Created Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isError, posted]);

  return (
    <div className="container-fluid mt-1 mb-4 px-5">
      <h1 className="mb-4">Create Post</h1>
      <div className="row m-3 px-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              File (video, audio, or any)
            </label>
            <input
              id="file"
              name="file"
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
            {formik.errors.file && (
              <div className="text-danger">{formik.errors.file}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />
            {formik.errors.image && (
              <div className="text-danger">{formik.errors.image}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="file_type" className="form-label">
              File Type
            </label>
            <select
              id="file_type"
              name="file_type"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.file_type}
            >
              <option value="">Select a file type</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="image">Image</option>
            </select>
            {formik.touched.file_type && formik.errors.file_type && (
              <div className="text-danger">{formik.errors.file_type}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-danger">{formik.errors.title}</div>
            )}
          </div>

          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                id="category"
                name="category"
                multiple
                value={selectedCategories}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                inputProps={{
                  name: "category",
                  id: "category",
                }}
                renderValue={(selected) => selected.join(", ")}
              >
                {categoryState?.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.name}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-danger">{formik.errors.category}</div>
              )}
            </FormControl>
          </div>

          <div className="mb-3">
            <label htmlFor="bible_book" className="form-label">
              Bible Book
            </label>
            <input
              id="bible_book"
              name="bible_book"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bible_book}
            />
            {formik.touched.bible_book && formik.errors.bible_book && (
              <div className="text-danger">{formik.errors.bible_book}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="bible_chapter" className="form-label">
              Bible Chapter
            </label>
            <input
              id="bible_chapter"
              name="bible_chapter"
              type="number"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bible_chapter}
            />
            {formik.touched.bible_chapter && formik.errors.bible_chapter && (
              <div className="text-danger">{formik.errors.bible_chapter}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="bible_verse" className="form-label">
              Bible Verse
            </label>
            <input
              id="bible_verse"
              name="bible_verse"
              type="number"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bible_verse}
            />
            {formik.touched.bible_verse && formik.errors.bible_verse && (
              <div className="text-danger">{formik.errors.bible_verse}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="published_at" className="form-label">
              Published At
            </label>
            <input
              id="published_at"
              name="published_at"
              type="date"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.published_at}
            />
            {formik.touched.published_at && formik.errors.published_at && (
              <div className="text-danger">{formik.errors.published_at}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>

          {/* <div className="mb-3 form-check">
            <input
              id="is_scheduled"
              name="is_scheduled"
              type="checkbox"
              className="form-check-input"
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // checked={formik.values.is_scheduled}
            />
            <label htmlFor="is_scheduled" className="form-check-label">
              Is Scheduled
            </label>
            {formik.touched.is_scheduled && formik.errors.is_scheduled && (
              <div className="text-danger">{formik.errors.is_scheduled}</div>
            )}
          </div> */}
          <div className="mb-3">
            <label className="form-label">Is Scheduled</label>
            <div className="form-check">
              <input
                id="isScheduledYes"
                name="is_scheduled"
                type="radio"
                className="form-check-input"
                value="true"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.is_scheduled === true}
              />
              <label htmlFor="isScheduledYes" className="form-check-label">
                Yes
              </label>
            </div>
            <div className="form-check">
              <input
                id="isScheduledNo"
                name="is_scheduled"
                type="radio"
                className="form-check-input"
                value="false"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.is_scheduled === false}
              />
              <label htmlFor="isScheduledNo" className="form-check-label">
                No
              </label>
            </div>
            {formik.touched.is_scheduled && formik.errors.is_scheduled && (
              <div className="text-danger">{formik.errors.is_scheduled}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            {isLoading ? "Sending" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
