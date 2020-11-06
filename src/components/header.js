import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import ThemeContext from "../context/ThemeContext";

const Header = ({ siteTitle }) => (
  <ThemeContext.Consumer>  
    {theme => (<header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
      <div>
        <Link to="/">portfolio</Link>
        <Link to="/about/">about me</Link>
        <Link to="/contact/">contact</Link>
      </div>
      <button className="dark-switcher" onClick={theme.toggleDark}>
        {theme.dark ? <span>Light mode ☀</span> : <span>Dark mode ☾</span>}
      </button>
    </header>)}
  </ThemeContext.Consumer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header;
