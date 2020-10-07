import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { Header } from './Header';
import { I18nProvider } from '@lingui/react';
import { Link } from "react-router-dom";
import { AdminArticleDelete } from "./AdminArticleDelete";

type Inputs = {
    title: string,
    content: string,
    author: string,
    category: string
}

export const AdminArticleUpdate = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const fetchDataArticles = async () => {
      const result = await axios(`http://127.0.0.1:8000/api/articles/`+
      window.location.href.split("id=")[1]);
      setTitle(result.data.title);
      setContent(result.data.content);
      setAuthorId(result.data.author["@id"]);
      setCategoryId(result.data.category["@id"]);
    };
    fetchDataArticles();
      const fetchDataAuthors = async () => {
        const result = await axios(`http://127.0.0.1:8000/api/authors`);
        setAuthors(result.data["hydra:member"]);
      };
      fetchDataAuthors();
      const fetchDataCategories = async () => {
        const result = await axios(`http://127.0.0.1:8000/api/categories`);
        setCategories(result.data["hydra:member"]);
      };
      fetchDataCategories();
  }, []);

  const onSubmit = (data: Inputs) => {
    axios
      .put(`http://127.0.0.1:8000/api/articles/` +
      window.location.href.split("id=")[1], 
      {
        title: data.title,
        content: data.content,
        author: data.author,
        category: data.category
      })
      .then((response) => {
        if (response) setAlertSuccess(true);
      })
      .catch((error) => {
        console.log(error)
        if (error) setAlertError(true);
      });
  };

  return (
    <React.Fragment>
      <I18nProvider language="en">
        <Header title="Blog" />
      </I18nProvider>
      <div className="container">
        <h2>Update/Delete an article</h2>
        {alertSuccess ? (
          <p
            className="alert_success"
            role="alert"
          >
            <strong>Good !</strong> Data successfully updated.
          </p>
        ) : (
          ""
        )}
        {alertError ? (
          <p
            className="alert_error"
            role="alert"
          >
            <strong>Error !</strong> Change a few things up and try
            submitting again.
          </p>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={title}
              ref={register({required: true})}
            />
            {errors.title && errors.title.type === "required" && (
              <div className="error">Your must enter a title.</div>
            )}
          </div>
          <div className="field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              defaultValue={content}
              ref={register({required: true})}
            />
            {errors.content && errors.content.type === "required" && (
              <div className="error">Your must enter a content.</div>
            )}
          </div>
          <div className="field">
            <label htmlFor="author">Author</label>
            <select
              id="author"
              name="author"
              ref={register({required: true})}
            >
              {Object.values(authors).map((author, i) => (
                <option key={i} defaultValue={authorId} value={author["@id"]}>
                  {author["firstname"]} {author["lastname"]}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              ref={register({required: true})}
            >
              {Object.values(categories).map((category, i) => (
                <option key={i} defaultValue={categoryId} value={category["@id"]}>
                  {category["name"]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">UPDATE</button>
        </form>
        <AdminArticleDelete />
        <Link className="link_articles" to="/admin-article-read">
            Return to the articles
        </Link>
      </div>
    </React.Fragment>
  );
};