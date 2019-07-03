import React from "react";
import styled from "styled-components";
import parseType from "./prop-type";
import PropSwitcher from "./prop-switcher";

import addDefaultValues, { getDefaultValue } from "./default-props";

const Type = styled.div`
  font-size: 13px;
  font-family: "sans-serif";
  padding: 2px;
  border-radius: 2px;
  position: relative;
  left: -2px;
  color: red;
`;

class Props extends React.Component {
  constructor(props) {
    super(props);
    let propData = addDefaultValues(props.propData);

    this.state = { propData: propData };
    this.props.onPropsChange(propData);
  }
  onPropsChange(propName, value) {
    this.setState(currentState => {
      /* set value for prop */
      currentState.propData[propName].value = value;

      this.props.onPropsChange(currentState.propData);
      return currentState;
    });
  }
  render() {
    let { propData } = this.state;

    const keys = Object.keys(propData).filter(key => key[0] !== "_");

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th width="40%">Description</th>
            <th>Default</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {keys.map(key => (
            <tr key={key}>
              <td>
                <code style={{ color: "inherit" }}>{key}</code>
                {propData[key].required && (
                  <div className="required">*required</div>
                )}
                <Type> type: {parseType(propData[key].type)}</Type>
              </td>
              <td>
                <code>{propData[key].description}</code>
              </td>
              <td>
                <code>{getDefaultValue(propData[key])}</code>
              </td>
              {!propData[key].required && (
                <PropSwitcher
                  propName={key}
                  data={propData[key]}
                  onPropsChange={this.onPropsChange.bind(this)}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default Props;
