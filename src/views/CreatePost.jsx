import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  FormLabel,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/category/categorySlice";
import { toast } from "react-toastify";
import { postCreate } from "../features/Post/postSlice";
import "./newStyle.css";

const bibleBooks = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

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
  const postState = useSelector((state) => state.post);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    dispatch(getCategories(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (postState.isSuccess) {
      toast.success("Post Created Successfully!");
    }
    if (postState.isError) {
      toast.error("Something Went Wrong!");
    }
  }, [postState.isError, postState.isSuccess]);

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
      published_at: new Date().toISOString().slice(0, 16),
      description: "",
      is_scheduled: false,
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
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

        const data = { formData, token };
        await dispatch(postCreate(data));
        resetForm();
        setSelectedCategories([]);
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

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(value);
    formik.setFieldValue("category", value);
  };

  const handleBibleBookChange = (event) => {
    const value = event.target.value;
    formik.setFieldValue("bible_book", value);

    if (value) {
      const filteredSuggestions = bibleBooks.filter((book) =>
        book.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectBook = (book) => {
    formik.setFieldValue("bible_book", book);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="container-fluid mt-1 mb-4 px-3">
      <div className="row m-3 px-5">
        <h1 className="mb-4">Create Post</h1>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            className="form-grid justify-content-between bg-white py-2 px-4"
          >
            <Grid item xs={12} sm={6}>
              <div className="my-3">
                <label htmlFor="title" className="form-label">
                  Add Title
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
              <div className="my-3">
                <label htmlFor="file" className="form-label">
                  File (video, audio, or image)
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

              <div className="my-3">
                <select
                  id="file_type"
                  name="file_type"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.file_type}
                >
                  <option value="">Select file type</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="image">Image</option>
                </select>
                {formik.touched.file_type && formik.errors.file_type && (
                  <div className="text-danger">{formik.errors.file_type}</div>
                )}
              </div>
              <div className="my-3">
                <label htmlFor="description" className="form-label">
                  Add Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  style={{ height: "250px" }}
                  className="form-control"
                  rows={17}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
              </div>

              <div className="my-3">
                <InputLabel id="category-label" style={{ fontWeight: "bold" }}>
                  Add Tags
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    id="category"
                    name="category"
                    multiple
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    onBlur={formik.handleBlur}
                    inputProps={{ name: "category", id: "category" }}
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
            </Grid>
            <Grid item xs={12} sm={5}>
              <div className="my-3">
                <label htmlFor="image" className="form-label">
                  Thumbnail
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

              <div className="my-3">
                <label htmlFor="bible_book" className="form-label">
                  Bible Book
                </label>
                <input
                  id="bible_book"
                  name="bible_book"
                  type="text"
                  className="form-control"
                  onChange={handleBibleBookChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bible_book}
                  onFocus={() => setShowSuggestions(true)}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((book, index) => (
                      <li key={index} onClick={() => handleSelectBook(book)}>
                        {book}
                      </li>
                    ))}
                  </ul>
                )}
                {formik.touched.bible_book && formik.errors.bible_book && (
                  <div className="text-danger">{formik.errors.bible_book}</div>
                )}
              </div>

              <div className="my-3">
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
                {formik.touched.bible_chapter &&
                  formik.errors.bible_chapter && (
                    <div className="text-danger">
                      {formik.errors.bible_chapter}
                    </div>
                  )}
              </div>

              <div className="my-3">
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
              <div className="my-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      id="is_scheduled"
                      name="is_scheduled"
                      checked={formik.values.is_scheduled}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  }
                  label="Is Scheduled"
                />
              </div>

              {formik.values.is_scheduled && (
                <div className="my-3">
                  <label htmlFor="published_at" className="form-label">
                    Published At
                  </label>
                  <input
                    id="published_at"
                    name="published_at"
                    type="datetime-local"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.published_at}
                  />
                </div>
              )}
              <Grid className="mt-4">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={formik.isSubmitting}
                >
                  Publish
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
