import React from 'react';
import { string } from 'prop-types';

const Error = ({ text }) => (
  <div>
    Whoops! Something went wrong.
    {text || ''}
  </div>
);

Error.propTypes = {
  text: string,
};

export default Error;
