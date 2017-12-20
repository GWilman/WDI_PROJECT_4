![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-30 Project 4 - The Vince Grid

Each year my friends and I get together and participate in a year-long sports predictions game using a giant spreadsheet, created by someone I don’t know named Vince. Players pick winners of categories comprising everything from the Premier League to Aussie rules and the Daytona 500. Points are scored according to the real-life results and the league table is updated regularly.

I decided it would be cool to create a miniature online version of the game, in this instance focusing only on the 2018 Champions League knockout stages. Players make their picks using a live draft client, therefore retaining some of the excitement of the draft but removing geographic proximity as a barrier to participation. With the app, it's possible for leagues to exist between friends who live in different cities or countries.

The Vince Grid is a MERN stack application which implements WebSockets for the live draft client, JWT/bcrypt authentication, and football team/player data seeded from an external API (https://api.football-data.org). The app is tested with mocha, chai and enzyme.

##### [Visit website](https://vincegrid.herokuapp.com/)

---

<p align="center"><img src="https://imgur.com/J9SDcxI.jpg" width="700"></p>

###### For my initial planning, I spent a lot of time thinking about what would constitute my MVP. I really wanted to create a live draft client in order to replicate the drafting experience as closely as possible. Many things, such as a team/player only being able to be selected by one user, don't really work with an asynchronous drafting approach. However, as I had no previous experience with WebSockets, I first set out to make a simpler version of the app, where users could make their picks at whatever time after joining a league. Once this was completed, I had enough time to implement Socket.IO and create the live draft client. I used sketch to produce some wireframes for my app.

<p align="center"><img src="https://imgur.com/komgoSe.pngg" width="700"></p>

###### Once registered/logged in, users are free to create or join leagues. When creating a new league, the name, stake and draft time are specified. The creating user is immediately entered into the league and redirected to the league hub. A random 3 or 4 digit code is generated behind the scenes and displayed on the league hub page - the league owner can then give this code to friends when inviting them to join a league. I wanted to avoid people being able to join any league as the app is made primarily for friends to play with each other. Users cannot join a league with an invalid code.

<p align="center"><img src="https://imgur.com/MHpnJkV.jpg" width="700"></p>
<p align="center"><img src="https://imgur.com/jApmkol.jpg" width="700"></p>

###### Users must navigate to their league hub ahead of the draft. When the countdown hits zero, the draft begins automatically. Here I faced a big issue: if a league had 4 members, but only 3 were online in time for the draft, then the draft would stall at the point of the missing player's turn. In order to fix this, I was able to associate WebSocket connections with users ahead of the draft starting. Then, at the point of rendering the live draft client, I filter the league members leaving only those able to take part.

<p align="center"><img src="https://imgur.com/ET8JpWX.jpg" width="700"></p>

###### Implementing the turn-based logic was a real challenge. WebSocket emissions are used to notify the players whose turn it is, enable/disable input the correct input fields, update the grid with team/player selections, update the available selections for other players and affect the turn/round cycle. When making a selection, users can begin typing and choose as the autosuggest filters down possible answers, or select from a dropdown.

<p align="center"><img src="https://imgur.com/k78hEKk.jpg" width="700"></p>

###### At the end of the draft, when the final pick has been made, the live draft client is replaced with the grid, which also functions as a dynamic league table. Here players can view the results of the draft and, when real-life results begin to come in, see how they are faring in the league. The league owner is responsible for updating the scores (instructions provided). The table is ordered by total points so may change after each update.

<p align="center"><img src="https://imgur.com/86452Pn.jpg" width="700"></p>
<p align="center"><img src="https://imgur.com/mcmBMn0.jpg" width="700"></p>
<p align="center"><img src="https://imgur.com/8IHOm2E.jpg" width="700"></p>

---

The Vince Grid was the most complex development project I have tackled to date and I am delighted with what I was able to achieve. Working with WebSockets for the first time opened up massive new functionality but brought challenges with it as well. Coordinating the game logic, affecting state and updating my database in a real-time, multi-user environment was really challenging but a lot of fun.

I plan to rebuild this app in React Native in order to get some experience with this technology, however, things I would love to work on with the Vince Grid include:
- Give the live draft client a more professional look and feel.
- Allow the league owner to set the order of the draft (good for repeat leagues).
- Grow the datasets to include other sports and competitions, working towards the year-long multi-sport version that inspired the app in the first place.
- Allow owners to customise their league by selecting only the categories they want.
