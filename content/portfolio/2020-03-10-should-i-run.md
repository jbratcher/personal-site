---
date: 2020-03-10T21:31:08.177Z
title: Should I Run
description: Get a rating on weather conditions for outdoor activities
thumbnail: /images/should-i-run.png
hero: /images/should-i-run.png
demo: https://jbratcher.github.io/ShouldIRun
repo: https://github.com/jbratcher/should-i-run
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

## ShouldIRun

Weather conditions rated for activities fetched from location-based data.

ShouldIRun rates the current and daily weather conditions and determines how favorable they are for running.

To view the live app demo, visit the link below:

[Demo](https://jbratcher.github.io/ShouldIRun)

### Features include:

- IP localization as well as user input localities
- Temperature scale
- Warmth preference
- schedule a day to run
- Find the best day to run in the next 7 days

### Technologies used

- React
- ES2015 JavaScript
- SCSS

### APIs used

- Dark Sky Weather API
- AirVisual Air Quality API
- Google Maps JavaScript API

Bootstrapped with create-react-app

### Version

0.0.6

### Install Dependencies

```bash
npm install
```

### Compile Code and Start Live Server

```bash
npm start
```

### Features:

- Real time weather conditions
- Dynamic rating of weather conditions for outdoor acivities
- Map your location or input a city location

### Future Features:

- 7 Day Forcast

### Known "bugs"

- No default selection on page load, must select option (if default must select something else, then re-select choice)
- Warmth preference mimics temperature index

#### Change Log

###### 0.0.6

- Find best day of week in next 7 days
- Pick a day of the week to run and get a rating
- More conditional rendering

###### 0.0.5

- Weather score calculation
- 7 Day Forcast Data (Under development)
- Find best day page
- Scheduler page
- About page

###### 0.0.5

- Weather score calculation
- 7 Day Forcast Data (Under development)
- Find best day page
- Scheduler page
- About page

###### 0.0.4

- Map of user location by IP (AirVisual API get closest station coordinates, Google Maps JavaScript API to get map)
- Weather icons
- Temp, Humidity, UV index, Air Quality display
- Weather score rating calculation and display
- Color coded weather rating

###### 0.0.3

- Dynamic fetch and display of weather stations by location

###### 0.0.2

- Display city, state, and air quality data on submit of form
- Cleared inputs on submit

###### 0.0.1

- Initial commit
- Customized readme and package.json from create-react-App
- Added console log of fetch data from city and state input
