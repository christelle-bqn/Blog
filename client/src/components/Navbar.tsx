import React, { FunctionComponent } from 'react';
import { Link } from "react-router-dom";

type NavbarProps = { 
  sections: {title: string, url: string}[],
};

export const Navbar: FunctionComponent<NavbarProps> = ({ sections }) => (
  <React.Fragment>
    <nav className="navbar">
      <ul>
        <li>
          {sections.map((section, i) => (
            <Link key ={i} to={section.url}>
              <span className="link-text">
                {section.title} 
                {(() => {
                switch (section.title) {
                  case 'Tech':
                    return <i className="fas fa-cogs icon"></i>;
                  case 'Food':
                    return <i className="fas fa-utensils icon"></i>;
                  case 'Gaming':
                    return <i className="fas fa-gamepad icon"></i>;
                  }
                })()}
              </span>
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  </React.Fragment>
)