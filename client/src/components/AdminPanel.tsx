import React, { FunctionComponent } from "react";
import { I18nProvider } from '@lingui/react';
import { Header } from './Header';

export const AdminPanel: FunctionComponent = () => {
  return (
    <React.Fragment>
      <I18nProvider language="en">
        <Header title="Blog" />
        <div className="admin_container">
          <section className="admin_header">
            <h1>ADMIN PANEL</h1>
          </section>
          <section className="admin_crud">
            <table>
              <thead>
                <tr>
                  <th>Authors</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="/admin-author-create">
                      Create a new author
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="/admin-author-read">
                      Read author data
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="/admin-author-delete">
                      Delete author
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Articles</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="/admin-article-create">
                      Create a new article
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="/admin-article-read">
                      Read article data
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </I18nProvider>
    </React.Fragment>
  );
};