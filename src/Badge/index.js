import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Badge = props => {
  const StyledBadge = styled.span`
    font-size: 11px;
    text-transform: uppercase;
    background-color: ${props => {
      if (props.disabled) {
        return "grey";
      } else if (props.type === "dark") {
        return "black";
      } else {
        return "slateblue";
      }
    }};
    padding: 4px 8px 2px;
    border-radius: 4px;
    color: white;
    font-weight: 500;
    letter-spacing: 1px;
  `;

  return (
    <StyledBadge
      disabled={props.disabled}
      type={props.type}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </StyledBadge>
  );
};

Badge.propTypes = {
  /** Children of the type: node*/
  children: PropTypes.string.isRequired,
  /** Enable or disable the badge */
  disabled: PropTypes.bool,
  /** Custom classname */
  className: PropTypes.string,
  /** Type of badge */
  type: PropTypes.oneOf(["dark", "light"]),
  /** Onclick handler */
  onClick: PropTypes.func
};

Badge.defaultProps = {
  disabled: false,
  className: "",
  type: "light",
  onClick: () => {}
};

export default Badge;
