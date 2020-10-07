import React, { FunctionComponent } from 'react';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { Articles } from './Articles';
import { I18nProvider } from '@lingui/react';

type BlogProps = { 
  sections: {title: string, url: string}[],
};

export const Blog: FunctionComponent<BlogProps> = ({ sections }) => (
    <React.Fragment>
      <I18nProvider language="en">
        <Header title="Blog" />
      </I18nProvider>
      <Navbar sections={sections} />
      <Articles />
    </React.Fragment>
)