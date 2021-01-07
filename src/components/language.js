import React from "react";
import { IntlContextConsumer, useIntl, changeLocale } from "gatsby-plugin-intl";

import { useTheme } from "../context/ThemeContext";

import languageStyles from "./language.module.css";

const Language = () => {
  const { isDark } = useTheme();
  const intl = useIntl();

  const createLangOptions = languagesLocales => {
    const options = [];

    languagesLocales.forEach(locale => {
      options.push(
        <option value={locale} key={locale}>
          {intl.formatMessage({ id: locale })}
        </option>
      );
    });

    return options;
  };

  return (
    <form
      className={`${languageStyles.root} ${isDark ? languageStyles.dark : ""}`}
    >
      <label htmlFor="lang" className="visually-hidden">
        Language
      </label>
      <IntlContextConsumer>
        {({ languages, language: currentLocale, ignore, originalPath }) => (
          <select
            name="lang"
            id="lang"
            value={currentLocale}
            onChange={e => {
              // `ignore` is a custom field to know that the page route url is handled by me, so I pass the url for the translation.
              let language = e.target.value;
              let to = "";
              if (ignore) {
                language =
                  language === intl.defaultLocale ? "" : language + "/";
                to = originalPath;
              }
              changeLocale(language, to);
            }}
          >
            {createLangOptions(languages)}
          </select>
        )}
      </IntlContextConsumer>
      <svg className={languageStyles.arrow} fill="currentColor">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </form>
  );
};

export default Language;
