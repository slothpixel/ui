import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TableLink = ({
  to, children, target,
}) => (
  <Link to={to} target={target}>
    {children}
  </Link>
);

const { string, node } = PropTypes;

TableLink.propTypes = {
  to: string,
  children: node,
  target: string,
};

export default TableLink;
