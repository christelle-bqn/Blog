import React, { FunctionComponent } from 'react';

type ArticleElementProps = { 
  title: string,
  content: string,
  author: object,
  createdAt: string,
  updatedAt: string,
  category: object
};

export const ArticleElement: FunctionComponent<ArticleElementProps> = ({ title, content, author, createdAt, updatedAt, category }) => {
  return (
    <article className="article">
      <h1 className="article_title">{title}</h1>
      <div className="article_infos">
        <span>by {Object.values(author)[2]} {Object.values(author)[3]}</span>
        <p>Posted on {createdAt.split("T")[0]} at {createdAt.split("T")[1].split("+")[0]} / Updated on {updatedAt.split("T")[0]} at {updatedAt.split("T")[1].split("+")[0]}</p>
        <p>Category : {Object.values(category)[2]}</p>
      </div>
      <div className="article_content">
        <p>{content}</p>
      </div>
    </article>
  );
};