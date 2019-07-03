import glob from "glob";
import fs from "fs";
import * as docgen from "react-docgen";

const javascriptFiles = glob.sync("src/*/*.js");

let metadata = javascriptFiles.map(path => {
  const code = fs.readFileSync(path, "utf8");

  let data = docgen.parse(code);

  console.log("data", data);

  /* make modifications to prop types to improve documentation */
  if (data.props) {
    Object.keys(data.props).forEach(propName => {
      const prop = data.props[propName];
      /* remove redundant quotes from default value of type string */
      if (prop.defaultValue) {
        if (typeof prop.defaultValue.value === "string") {
          prop.defaultValue.value = prop.defaultValue.value.replace(
            /^'(.*)'$/,
            "$1"
          );
        }
      }

      /* remove redundant quotes from enum values in prop types */
      if (prop.type.name === "enum" && Array.isArray(prop.type.value)) {
        prop.type.value.forEach(element => {
          element.value = element.value.replace(/^'(.*)'$/, "$1");
        });
      }
    });
  }

  data.filepath = path;

  console.log("data", data);

  return data;
});

export default metadata;
