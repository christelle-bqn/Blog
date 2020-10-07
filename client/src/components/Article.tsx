import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import axios from "axios";
import { ArticleElement } from "./ArticleElement";
import { Header } from './Header';
import { I18nProvider } from '@lingui/react';

interface ArticleState {
  articles: {title: string, content: string, author: object, createdAt: string, updatedAt: string, category: object}[],
  isLoaded: boolean
}

export class Article extends Component<{}, ArticleState> {
	constructor(props: RouteComponentProps) {
		super(props);
    this.state = { 
      articles: [],
      isLoaded: false
    }
  }
  
	componentDidMount() {
		axios.get("http://127.0.1:8000/api/articles/"+ window.location.href.split("?id=")[1]).then((res) => {
			this.setState({
        articles: [res.data],
        isLoaded: true
			});
		})
		.catch((res) => {
			console.log(res);
		});
	}

	render() {
    const articles = this.state.articles.map((article, i) => {
			return (
          <ArticleElement key={i}
            title={article.title}
            content={article.content}
            author={article.author}
            createdAt={article.createdAt}
            updatedAt={article.updatedAt}
            category={article.category}
          />
			)
    })
    if (this.state.isLoaded === false) {
      return (
        <div className="loading">
          Loading...
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <I18nProvider language="en">
            <Header title="Blog" />
          </I18nProvider>
          <section>
            {articles}
            <Link to="/" className="link_homepage">Return to the homepage</Link>
          </section>
        </React.Fragment>	
      )
    }
	}
}