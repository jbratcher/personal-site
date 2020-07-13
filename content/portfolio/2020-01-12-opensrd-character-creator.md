---
date: 2020-01-12T15:41:14.797Z
title: OpenSRD Character Creator
description: A character creator for open-source RPGs
thumbnail: /images/open-srd-character-creator.png
hero: /images/open-srd-character-creator.png
demo: https://jbratcher.github.io/openSRD_character_creator/
repo: https://github.com/jbratcher/openSRD_character_creator
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

## OpenSRD Character Creator

Character creator for an openSRD-based roleplaying game. Puts together all the info you need to start playing now and not have to worry about calculations for bonuses.

[Demo Page](https://jbratcher.github.io/openSRD_character_creator/)

### Version

0.0.8

### Install Dependencies

```bash
npm install
```

### Start live reload server and compile Typescript, SASS

gulp

```bash
gulp
```

### Folder and File Structure

```
/src
    /css
    styles.css
        /vendor
        /fonts
            -fontawesome-webfont.eot
            -fontawesome-webfont.svg
            -fontawesome-webfont.ttf
            -fontawesome-webfont.wotf
            -fontawesome-webfont.wotf2
            -FontAwesome.otf
        -font-awesome.min.css
    /js
        -characterImages.js
        -info.js
        -main.js
    /scss
    -styles.scss
    /ts
      -characterImages.ts
      -info.ts
      -main.ts
-gulpfile.js
-index.html
-LICENSE
-package.json
-readme.md
```

### Bulid to dist from src

```bash
gulp build
```

### Features:

- Random rolls for stats, selectable races, and classes
- Randomly selects image from array based on race, class, and gender inputs (placeholders for now)
- Generates character preview based on user inputs
- Calculates hit points, armor class, initiative, speed, and saving Throws
- Calculates hit point gain, experience for next level, and proficiency bonus on level up
- Add experience and keeps a running tottal
- Highlights chosen skills and displays calculated bonus from proficiency and ability score modifiers
- Dynamically highlights available skills on class selection
- Dynamically highlights racial bonus inputs

### Future Features:

- Display tooltips for info
- Add attack roll functionality
- better sourcing of images (replace placeholders)

### Known "bugs"

- active class on general tab not working unless clicked

#### Change Log

###### 0.0.8

- Racial ability score, and language bonuses
- Optional subraces selection
- Calculates saving throws on character creation

###### 0.0.7

- Highlight available skills dynamically on class selection

###### 0.0.6

- Added proficiency bonus logic and display to skill preview
- Added skill modifier logic to modify skill bonuses

###### 0.0.5

- Added logic for level, experience and hitpoints

###### 0.0.4

- Added tabs for character preview section (general, proficiencies, and combat

###### 0.0.3

- Added support for non-binary genders, removed placeholder default values for race, class, and alignment,

###### 0.0.2

- Added feature to generate random character image from an array based on the character's class, race and gender.

###### 0.0.1

- Initial commit, preview displays input only
