/* eslint-disable camelcase */
import React from 'react';
import RenderString from './RenderString';

function buildFormattedString(username = '&fAnonymous', rank, prefix, rank_plus_color) {
  let string;
  if (prefix) {
    string = `${prefix} ${username}`;
  } else {
    switch (rank) {
      case 'VIP':
        string = `&a[VIP] ${username}`;
        break;
      case 'VIP_PLUS':
        string = `&a[VIP&6+&a] ${username}`;
        break;
      case 'MVP':
        string = `&b[MVP] ${username}`;
        break;
      case 'MVP_PLUS':
        string = `&b[MVP${rank_plus_color}+&b] ${username}`;
        break;
      case 'MVP_PLUS_PLUS':
        string = `&6[MVP${rank_plus_color}++&6] ${username}`;
        break;
      case 'HELPER':
        string = `&9[HELPER] ${username}`;
        break;
      case 'MODERATOR':
        string = `&2[MOD] ${username}`;
        break;
      case 'ADMIN':
        string = `&c[ADMIN] ${username}`;
        break;
      case 'YOUTUBER':
        string = `&c[&fYOUTUBER&c] ${username}`;
        break;
      default:
        string = `&7${username}`;
    }
  }
}

const RenderUsername = ({
  username, rank, prefix, rank_plus_color,
}) => {
  const getFormattedUsername = () => (
    <div>
      {buildFormattedString(username, rank, prefix, rank_plus_color)}
    </div>
  );
  return getFormattedUsername();
};

export default RenderUsername;
