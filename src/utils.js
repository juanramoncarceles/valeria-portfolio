/**
 * @param {string} str The string to evaluate. It should follow this pattern /number-slug/ like /1-my-project/
 * @returns string
 */
export const createElementIdFromSlug = str => {
  const result = str.match(/^\/\d+-([^/]+)/);
  if (result) {
    return result[1];
  } else {
    console.error(
      `[Utils] Element id could not be created with the the slug: "${str}".`
    );
    return "";
  }
};
