import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PageLinks = ({ strings }) => {
  const links = [{
    name: strings.app_about,
    path: '',
  }, {
    name: strings.app_privacy_terms,
    path: '',
  }, {
    name: strings.app_api_docs,
    path: '//docs.slothpixel.me',
  }, {
    name: strings.app_blog,
    path: '//medium.com/slothpixel',
  }];
  return links.map(link => (
    <a href={link.path} key={link.name} target="_blank" rel="noopener noreferrer">{link.name}</a>
  ));
};

PageLinks.propTypes = {
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PageLinks);
