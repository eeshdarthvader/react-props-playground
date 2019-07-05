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

const Table = styled.table`
  width: 80%;
  margin: 80px auto;
  white-space: normal;
  th,
  td {
    text-align: left;
    padding: 2px 2px;
    vertical-align: middle;
    position: relative;
    color: black;
  }
  th {
    border-bottom: 2px solid #ddd;
  }
  td {
    border-bottom: 1px solid #ddd;
  }
  th {
    text-transform: uppercase;
    font-weight: 12px;
    letter-spacing: 1px;
    font-size: 12px;
  }
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
      <Table>
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
              <td>
                {!propData[key].required && (
                  <PropSwitcher
                    propName={key}
                    data={propData[key]}
                    onPropsChange={this.onPropsChange.bind(this)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
export default Props;
