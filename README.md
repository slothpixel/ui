# ui

<p>
    <a href="https://discord.gg/ND9bJKK">
      <img src="https://discordapp.com/api/guilds/323555112553414667/embed.png" alt="Discord" />
    </a>
    <a href="https://travis-ci.org/slothpixel/ui">
      <img src="https://travis-ci.org/slothpixel/ui.svg?branch=master" alt="Build Status" />
    </a>
</p>

Slothpixel UI: A web interface for viewing Hypixel data. This utilizes the Slothpixel API, which is also an [open source project](https://github.com/slothpixel/core).

Quickstart
----
* Install Node.js (6.0.0 or greater) (on Ubuntu, `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && sudo apt-get install -y nodejs`)
* `npm install`
* `npm start`
* Visit port 3000 on your development machine.
* Make some changes
* `npm run lint` to check your code for linting errors
* Submit a pull request. Wait for review and merge.
* Congratulations! You're a contributor.

Configuration
----
* You can set the following environment variables:
  * PORT: Changes the port that the development server runs on
  * REACT_APP_API_HOST: Changes the API that the UI requests data from

Tech Stack
----
* View: React
* State Management: Redux
* CSS: styled-components

Resources
----
* New to React/Redux? Read these articles on React and watch video tutorials by Redux creator Dan Abramov.
  * Thinking in React: https://facebook.github.io/react/docs/thinking-in-react.html
  * Getting started with Redux: https://egghead.io/courses/getting-started-with-redux
  * Idiomatic Redux: https://egghead.io/courses/building-react-applications-with-idiomatic-redux
  * ES6 guide: https://github.com/lukehoban/es6features
