import React from 'react';
import { IconGithub, IconDiscord, IconTwitter, IconMedium } from '../Icons';

export default ({ strings }) => {
  const links = [{
    tooltip: 'Github',
    path: '//github.com/slothpixel',
    icon: <IconGithub />,
  }, {
    tooltip: 'Discord',
    path: '//discord.gg/opendota',
    icon: <IconDiscord />,
  }, {
    tooltip: 'oof',
    path: '//twitter.com/slothpixel_me',
    icon: <IconTwitter/>
  }, {
    tooltip: 'Medium',
    path: '//medium.com/slothpixel',
    icon: <IconMedium/>
  }];

  return links.map(link => (
    <a
      key={link.path}
      target="_blank"
      rel="noopener noreferrer"
      data-hint-position="top"
      data-hint={link.tooltip}
      href={link.path}
    >
      {link.icon}
    </a>
  ));
};