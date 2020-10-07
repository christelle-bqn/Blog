import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Blog } from './components/Blog';
import { Article } from "./components/Article";
import { AdminPanel } from "./components/AdminPanel";
import { AdminAuthorCreate } from "./components/AdminAuthorCreate";
import { AdminAuthorRead } from "./components/AdminAuthorRead";
import { AdminAuthorDelete } from "./components/AdminAuthorDelete";
import { AdminArticleCreate } from "./components/AdminArticleCreate";
import { AdminArticleRead } from "./components/AdminArticleRead";
import { AdminArticleUpdate } from "./components/AdminArticleUpdate";

const sections = [
  { title: 'Tech', url: '/' },
  { title: 'Food', url: '/' },
  { title: 'Gaming', url: '/' },
];

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
           <Blog sections={sections}/>
          </Route>
          <Route path="/article">
            <Article />
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
          <Route path="/admin-author-create">
            <AdminAuthorCreate />
          </Route>
          <Route path="/admin-author-read">
            <AdminAuthorRead />
          </Route>
          <Route path="/admin-author-delete">
            <AdminAuthorDelete />
          </Route>
          <Route path="/admin-article-create">
            <AdminArticleCreate />
          </Route>
          <Route path="/admin-article-read">
            <AdminArticleRead />
          </Route>
          <Route path="/admin-article-update">
            <AdminArticleUpdate />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}