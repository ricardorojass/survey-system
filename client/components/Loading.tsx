import React from "react";

export default props => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <img src="/images/loading.svg" />
      { props.text ? <p>{props.text}</p> : null }
    </div>
  )
};
