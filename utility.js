export const isPropertySetInCss = (css, selector, property, value) => {
  // convert to string remove spaces and change to lowercase
  css = removeSpacesAndLowerCase(css);
  property = removeSpacesAndLowerCase(property);
  value = removeSpacesAndLowerCase(value);

  // generate the properties object for the selector
  const properties = {};
  const parts = css.split(selector + '{');
  const subPart = parts[1].split('}');
  const propertiesRaw = subPart[0].split(';');
  propertiesRaw.forEach((item) => {
    const colonIndex = item.indexOf(':');
    const prop = item.slice(0, colonIndex);
    const value = item.slice(colonIndex + 1);
    properties[prop] = value;
  });

  //check value
  if (properties[property] && properties[property] == value) {
    return true;
  }
  return properties[property];
};

const removeSpacesAndLowerCase = (str) => {
  return str
    .toString()
    .replaceAll(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '')
    .replaceAll(/(?:\r\n|\r|\n| )/g, '')
    .toLowerCase();
};

export const isMediaRuleCorrect = (css, property, value) => {
  // convert to string remove spaces and change to lowercase
  css = removeSpacesAndLowerCase(css);
  property = removeSpacesAndLowerCase(property);
  value = removeSpacesAndLowerCase(value);

  const parts = css.split('{');
  return parts[0].includes(property + ':' + value);
};

export const getPropertyValue = (css, selector, property) => {
  // Normalize selector and property to lowercase for matching
  selector = selector.toLowerCase().trim();
  property = property.toLowerCase().trim();

  // Split the CSS into individual rules
  const rules = css.split('}').map((rule) => rule.trim() + '}');
  for (let rule of rules) {
    if (rule.toLowerCase().includes(selector)) {
      // Extract the properties block
      const propertiesBlock = rule.split('{')[1].split('}')[0];
      const properties = propertiesBlock.split(';').map((prop) => prop.trim());

      for (let prop of properties) {
        const [key, value] = prop.split(':').map((p) => p.trim());
        if (key.toLowerCase() === property) {
          return value;
        }
      }
    }
  }

  return null;
};
