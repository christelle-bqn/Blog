import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Header } from './Header';
import { I18nProvider } from '@lingui/react';
import { Link } from "react-router-dom";

export const AdminArticleRead = () => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:8000/api/articles");
      setArticles(result.data["hydra:member"]);
    };
    fetchData();
  }, []);
  
  return (
    <React.Fragment>
      <I18nProvider language="en">
        <Header title="Blog" />
      </I18nProvider>
      <div className="container">
        <h2>Articles</h2>
        {articles.map((article:any, i) => (
          <article className="article"  key={i}>
            <h1 className="article_title">{article["title"]}</h1>
            <div className="article_infos">
                <span>by {Object.values(article["author"])[2]} {Object.values(article["author"])[3]}</span>
                <p>Posted on {article["createdAt"].split("T")[0]} at {article["createdAt"].split("T")[1].split("+")[0]} / Updated on {article["updatedAt"].split("T")[0]} at {article["updatedAt"].split("T")[1].split("+")[0]}</p>
                <p>Category : {Object.values(article["category"])[2]}</p>
            </div>
            <div className="article_content">
              <p>{article.content.split('.')[0]}...</p>
              <div className="article_content-link">
                <Link to={`/article?id=${article["@id"].split("/")[article["@id"].split("/").length - 1]}`}>
                  READ MORE
                </Link> 
                <Link to={`/admin-article-update?id=${article["@id"].split("/")[article["@id"].split("/").length - 1]}`}>
                  UPDATE / DELETE
                </Link>
              </div>   
            </div>
          </article>
        ))}
        <Link className="link_panel" to="/admin">
          Return to panel
        </Link>
      </div>
    </React.Fragment>
  );
};