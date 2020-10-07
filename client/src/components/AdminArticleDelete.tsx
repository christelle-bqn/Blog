import React, { useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";

type Inputs = {
    id: string,
}

export const AdminArticleDelete = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  
  const onSubmit = (data: Inputs) => {
    axios
      .delete(`http://127.0.0.1:8000/api/articles/${data.id}`)
      .then((response) => {
        if (response) setAlertSuccess(true);
      })
      .catch((error) => {
        if (error) setAlertError(true);
      });
  };
  
  return (
    <React.Fragment>
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
            <input
              type="hidden"
              name="id"
              defaultValue={window.location.href.split("?id=")[1]}
              ref={register}
            />
          </div>
          <button type="submit">DELETE</button>
        </form> 
    </React.Fragment>
  );
};