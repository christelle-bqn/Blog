import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Header } from './Header';
import { I18nProvider } from '@lingui/react';
import { Link } from "react-router-dom";

export const AdminAuthorRead = () => {
  const [authors, setAuthors] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:8000/api/authors");
      setAuthors(result.data["hydra:member"]);
    };
    fetchData();
  }, []);
  
  return (
    <React.Fragment>
      <I18nProvider language="en">
        <Header title="Blog" />
      </I18nProvider>
      <div className="container">
        <h2>Authors list</h2>
        {Object.values(authors).map((author:any, i) => (
          <ul key={i}>
            <li>
                <b>ID: </b> {author["@id"].substring(author["@id"].length - 1)}
            </li>
            <li>
                <b>Firstname: </b> {author["firstname"]}
            </li>
            <li>
                <b>Lastname: </b> {author["lastname"]}
            </li>
          </ul>
          ))}
        <Link className="link_panel" to="/admin">
          Return to panel
        </Link>
      </div>
    </React.Fragment>
  );
};