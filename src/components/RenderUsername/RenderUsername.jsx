/* eslint-disable camelcase */
import React from 'react';
import RenderString from './RenderString';

function buildFormattedString(username = '&fAnonymous', rank_formatted, prefix, tag, tag_color) {
  let string = (prefix)
    ? `${prefix} ${username}`
    : `${rank_formatted} ${username}`;
  if (tag) {
    string += ` ${tag_color}[${tag}]`;
  }
  return RenderString(string);
}

const RenderUsername = ({
  username, rank_formatted, prefix, tag = null, tag_color,
}) => {
  const getFormattedUsername = () => (
    <div>
      {buildFormattedString(username, rank_formatted, prefix, tag, tag_color)}
    </div>
  );
  return getFormattedUsername();
};

export default RenderUsername;
