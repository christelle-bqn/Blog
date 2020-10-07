import React, { useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { Header } from './Header';
import { I18nProvider } from '@lingui/react';
import { Link } from "react-router-dom";

type Inputs = {
    firstname: string,
    lastname: string,
    alertSuccess: boolean,
    alertError: boolean
}

export const AdminAuthorCreate = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  
  const onSubmit = (data: Inputs) => {
    axios
      .post("http://127.0.0.1:8000/api/authors", {
        firstname: data.firstname,
        lastname: data.lastname,
      })
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
        <h2>Add a new author</h2>
        {alertSuccess ? (
          <p
            className="alert_success"
            role="alert"
          >
            <strong>Good !</strong> Data successfully created.
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
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              ref={register({required: true})}
            />
            {errors.firstname && errors.firstname.type === "required" && (
              <div className="error">Your must enter your firstname.</div>
            )}
          </div>
          <div className="field">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              ref={register({required: true})}
            />
            {errors.lastname && errors.lastname.type === "required" && (
              <div className="error">Your must enter your lastname.</div>
            )}
          </div>
          <button type="submit">ADD</button>
        </form>
        <Link className="link_panel" to="/admin">
            Return to panel
        </Link>
      </div>
    </React.Fragment>
  );
};
