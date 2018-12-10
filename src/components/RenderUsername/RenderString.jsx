import React from 'react';

const mcColors = {
  // Foreground - background
  '&0': ['#000000', '#000000'],
  '&1': ['#0000AA', '#00002A'],
  '&2': ['#00AA00', '#002A00'],
  '&3': ['#00AAAA', '#002A2A'],
  '&4': ['#AA0000', '#2A0000'],
  '&5': ['#AA00AA', '#2A002A'],
  '&6': ['#FFAA00', '#2A2A00'],
  '&7': ['#AAAAAA', '#2A2A2A'],
  '&8': ['#555555', '#151515'],
  '&9': ['#5555FF', '#15153F'],
  '&a': ['#55FF55', '#153F15'],
  '&b': ['#55FFFF', '#153F3F'],
  '&c': ['#FF5555', '#3F1515'],
  '&d': ['#FF55FF', '#3F153F'],
  '&e': ['#FFFF55', '#3F3F15'],
  '&f': ['#FFFFFF', '#3F3F3F'],
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
    const [color, shadow] = mcColors[codes[i]];
    spans.push(<span style={{ color, textShadow: `${shadow} 0 0 5px` }} key={part}>{parts[i]}</span>);
  });
  return spans;
}

export default RenderString;
