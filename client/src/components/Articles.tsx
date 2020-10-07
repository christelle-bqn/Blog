import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from "axios";

interface ArticlesState {
	articles: {title: string, content: string, author: object, createdAt: string, updatedAt: string, "@id": string, category: object}[],
}

export class Articles extends Component<{}, ArticlesState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = { articles: [] }
	}
	componentDidMount() {
		axios.get(`http://127.0.1:8000/api/articles`).then((res) => {
			this.setState({
				articles: res.data["hydra:member"]
			});
		})
		.catch((res) => {
			console.log(res);
		});
	}

	render() {
		const articles = this.state.articles.map((article, i) => {
			return (
        <article className="article"  key={i}>
          <h1 className="article_title">{article.title}</h1>
          <div className="article_infos">
            <span>by {Object.values(article.author)[2]} {Object.values(article.author)[3]}</span>
            <p>Posted on {article.createdAt.split("T")[0]} at {article.createdAt.split("T")[1].split("+")[0]} / Updated on {article.updatedAt.split("T")[0]} at {article.updatedAt.split("T")[1].split("+")[0]}</p>
			<p>Category : {Object.values(article.category)[2]}</p>
          </div>
          <div className="article_content">
            <p>{article.content.split('.')[0]}...</p>
            <a href={
              window.location.href +
              "article?id=" +
              article["@id"].split("/")[article["@id"].split("/").length - 1]
            }>READ MORE</a>            
          </div>
      </article>
			)
		})
		return (
			<main>
				{articles}
			</main>
		)
	}
}