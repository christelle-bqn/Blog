import React, { FunctionComponent } from 'react';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';

type HeaderProps = { 
  title: string,
};

export const Header: FunctionComponent<HeaderProps> = ({ title }) => (
  <React.Fragment>
    <header className="header">
      <Link to="/"><h1 className="header_title"><Trans>{title}</Trans></h1></Link>
    </header>
  </React.Fragment>
)