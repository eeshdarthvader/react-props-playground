import React from "react";

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { stripDefaultsFromDocs } from "../get-defaults-from-code";
import Props from "../props";
import getPropString from "../prop-string";

import metadata from "../generateMetaData";

class Live extends React.Component {
  constructor(props) {
    super(props);

    const code = stripDefaultsFromDocs(props.code);

    this.state = {
      code,
      metadata
    };
  }
  onPropsChange(propData) {
    const propString = getPropString(propData);
    console.log("propString", propString);
    const code = stripDefaultsFromDocs(this.props.code);

    console.log("code", code.replace(">", propString + ">"));
    this.setState({ code: code.replace(">", propString + ">") });
  }
  render() {
    return (
      <div className="container">
        <LiveProvider code={this.state.code} scope={this.props.scope}>
          <div className="react-live-preview">
            <LivePreview />
          </div>

          <div className="prism-code">
            <LiveEditor />
          </div>
          <Props
            propData={this.state.metadata ? this.state.metadata[0].props : ""}
            code={this.state.code}
            onPropsChange={this.onPropsChange.bind(this)}
          />

          <LiveError />
        </LiveProvider>
      </div>
    );
  }
}

export default Live;
