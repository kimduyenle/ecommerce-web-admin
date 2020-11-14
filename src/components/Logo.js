import React from "react";

const Logo = (props) => {
  return <img alt="Logo" src="/static/logo.jpg" {...props}
  style={{
    width: 55, 
    height: 55, 
    borderRadius: '50%'
  }} />;
  // return <div
  // style={{
  //     width: 40, 
  //     height: 40, 
  //     borderRadius: '50%',
  //     backgroundImage: 'url(/static/logo.png)'
  //   }}
  // >

  // </div>
};

export default Logo;
