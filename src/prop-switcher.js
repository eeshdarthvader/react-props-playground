import React from "react";
import { TextInput, Switch, Select } from "@auth0/cosmos";

const dequotify = quotesValue => {
  return quotesValue.replace(/"/g, "");
};

const quotify = dequotesValue => {
  return `"${dequotesValue}"`;
};

const PropSwitcher = ({ propName, data, onPropsChange }) => {
  let handler = value => onPropsChange(propName, value.toString());

  if (data.type.name === "bool") {
    return (
      <Switch
        accessibleLabels={[]}
        on={data.value === "true"}
        onChange={handler}
      />
    );
  } else if (["string", "number"].includes(data.type.name)) {
    if (data.value === "null") data.value = "";
    return <TextInput onChange={e => handler(e.target.value)} />;
  } else if (data.type.name === "enum") {
    const options = data.type.value.map(i => {
      return { text: dequotify(i.value), i };
    });

    return (
      <Select
        defaultValue={dequotify(data.value)}
        onChange={e => handler(quotify(e.target.value))}
        options={options}
      />
    );
  }
  return <div />;
};

export default PropSwitcher;
