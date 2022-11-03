import React from "react";

const Link = ({ href, children }) => {
  return (
    <div>
      <a href={href}>{children}</a>
    </div>
  );
};
export default Link;
