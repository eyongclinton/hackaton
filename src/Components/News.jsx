import React, { useState } from "react";
import axios from "axios";
import './News.css'; // Added CSS import

const CreateNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim() === "" || formData.content.trim() === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/news/",
        formData,
      );
      setSuccessMessage("News article created successfully!");
      setFormData({
        title: "",
        content: "",
      });
    } catch (error) {
      setErrorMessage("Error creating news article. Please try again.");
    }
  };

  return (
    <div className="pa4">
      <h2 className="mb4">Create New News Article</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb3">
          <label className="db">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
          />
        </div>
        <div className="mb3">
          <label className="db">Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
          ></textarea>
        </div>
        <button
          type="submit"
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNews;