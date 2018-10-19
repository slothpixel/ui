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

function RenderString(string) {
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

export default RenderString;
