/* eslint-disable camelcase */
import React from 'react';

const mcColors = {
  '&0': '#000000',
  '&1': '#0000AA',
  '&2': '#00AA00',
  '&3': '#00AAAA',
  '&4': '#AA0000',
  '&5': '#AA00AA',
  '&6': '#FFAA00',
  '&7': '#AAAAAA',
  '&8': '#555555',
  '&9': '#5555FF',
  '&a': '#55FF55',
  '&b': '#55FFFF',
  '&c': '#FF5555',
  '&d': '#FF55FF',
  '&e': '#FFFF55',
  '&f': '#FFFFFF',
};

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
  const codes = [];
  string.match(/&\w/g).forEach((element) => {
    codes.push(element);
  });
  const parts = string.split(/&\w/g);
  parts.shift();

  const spans = [];
  parts.forEach((part, i) => {
    spans.push(<span style={{ color: mcColors[codes[i]] }}>{parts[i]}</span>);
  });
  return spans;
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
