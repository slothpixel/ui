import React from 'react';
import { IconGithub, IconDiscord, IconTwitter, IconMedium } from '../Icons';

export default ({ strings }) => {
  const links = [{
    tooltip: strings.app_github,
    path: '//github.com/slothpixel',
    icon: <IconGithub />,
  }, {
    tooltip: strings.app_discord,
    path: '//discord.gg/ND9bJKK',
    icon: <IconDiscord />,
  }, {
    tooltip: strings.app_twitter,
    path: '//twitter.com/slothpixel_me',
    icon: <IconTwitter/>
  }, {
    tooltip: strings.app_medium,
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