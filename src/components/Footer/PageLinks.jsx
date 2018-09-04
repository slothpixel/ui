import React from 'react';
import { connect } from 'react-redux';

const PageLinks = ({ strings }) => {
  const links = [{
    name: 'About',
    path: '',
  }, {
    name: 'Privacy & Terms',
    path: '',
  }, {
    name: 'API Docs',
    path: '',
  }, {
    name: 'Blog',
    path: '//medium.com/slothpixel',
  }];
  return links.map(link => (
    <a href={link.path} key={link.name} target="_blank" rel="noopener noreferrer">{link.name}</a>
  ));
};

export default PageLinks;