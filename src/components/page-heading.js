import React from "react";
import PropTypes from "prop-types";

import pageHeadingStyles from "./page-heading.module.css";

const PageHeading = ({ pageTitle, fullHeightHeading, bgimg }) => (
  <div
    className={`${pageHeadingStyles.root} ${
      fullHeightHeading ? pageHeadingStyles.fullHeight : ""
    }`}
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

PageHeading.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  fullHeightHeading: PropTypes.bool,
  bgimg: PropTypes.string,
};

PageHeading.defaultProps = {
  fullHeightHeading: false,
  bgimg: "",
};

export default PageHeading;
