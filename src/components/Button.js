import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
  return(
    <Link to={{ pathname: props.path }}
      className="text-center m-2 btn btn-primary"
      role="button"
      aria-pressed="true">
      {props.buttonText}
    </Link>
  )
}

export default Button;
