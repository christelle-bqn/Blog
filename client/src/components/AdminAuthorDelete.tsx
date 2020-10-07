import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { Header } from './Header';
import { I18nProvider } from '@lingui/react';
import { Link } from "react-router-dom";

type Inputs = {
    id: string,
}

export const AdminAuthorDelete = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [authors, setAuthors] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:8000/api/authors");
      setAuthors(result.data["hydra:member"]);
    };
    fetchData();
  }, []);

  const onSubmit = (data: Inputs) => {
    axios
      .delete(`http://127.0.0.1:8000/api/authors/${parseInt(data.id.split('/')[3])}`)
      .then((response) => {
        if (response) setAlertSuccess(true);
      })
      .catch((error) => {
        if (error) setAlertError(true);
      });
  };
  
  return (
    <React.Fragment>
      <I18nProvider language="en">
        <Header title="Blog" />
      </I18nProvider>
      <div className="container">
        <h2>Delete an author</h2>
        {alertSuccess ? (
          <p
            className="alert_success"
            role="alert"
          >
            <strong>Good !</strong> Data successfully deleted.
          </p>
        ) : (
          ""
        )}
        {alertError ? (
          <p
            className="alert_error"
            role="alert"
          >
            <strong>Error !</strong> Try
            submitting again.
          </p>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <select
              className="select_id"
              id="id"
              name="id"
              ref={register({required: true})}
            >
              {Object.values(authors).map((author, i) => (
                <option value={author["@id"]}>
                  {author["firstname"]} {author["lastname"]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">DELETE</button>
        </form> 
        <Link className="link_panel" to="/admin">
          Return to panel
        </Link>
      </div>
    </React.Fragment>
  );
};