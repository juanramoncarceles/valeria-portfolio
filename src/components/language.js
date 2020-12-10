import React from "react";
import { IntlContextConsumer, useIntl, changeLocale } from "gatsby-plugin-intl";

const Language = () => {
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
    <div>
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
    </div>
  );
};

export default Language;
