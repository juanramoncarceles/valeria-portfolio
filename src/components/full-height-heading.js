import React from "react";
import PropTypes from "prop-types";

import pageHeadingStyles from "./full-height-heading.module.css";

const FullHeightHeading = ({ pageTitle, bgimg }) => (
  <div
    className={pageHeadingStyles.root}
    style={
      bgimg
        ? {
            backgroundImage: `url(${bgimg})`,
          }
        : ""
    }
  >
    <h1 className={pageHeadingStyles.pageTitle}>{pageTitle}</h1>
  </div>
);

FullHeightHeading.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  bgimg: PropTypes.string,
};

FullHeightHeading.defaultProps = {
  bgimg: "",
};

export default FullHeightHeading;
