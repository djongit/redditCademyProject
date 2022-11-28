import React from "react";
import './styleSpinner.css';
// const spinnerIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/spinner.png'

export default function Spinner() {
  return (
    // <img src={spinnerIconUrl} alt="Loading..." className="spinner" />
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  );
}
