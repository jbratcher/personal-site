---
date: 2020-05-15T16:08:09.879Z
title: Simplify Deployments With NPM Scripts
description: Workflow automation to merge, release, and deploy
thumbnail: /images/devops.svg
hero: /images/devops.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

I typically work out of a `dev` branch when developing a new feature or a bug fix. When I'm ready to add this code to my repo, I'll add and commit in the `dev` branch and merge the code to both a `master` and `staging` branch. `master` for a root branch and `staging` as a pre-deployment branch. When I'm ready to deploy, I'll merge `staging` to each deployment branch (`server` and `client` in a monorepo) and push the changes to a cloud service that runs build and deploy scripts.

Using Git in the command line, this can result in a lot of typing especially since I'm a fan of smaller commits and frequent deployments. To save my self some time and sanity, I created a set of scripts in `package.json` which boil down a handful or commands to a single command.

###### Note that this workflow omits linting and testing steps as I do this in the `dev` branch before releasing code. If your workflow is different, it should be easy to add or modify these steps to include other commands.

To begin, I broke down the steps I took every time I wanted to take a simple action that required multiple typed commands.

For example, when completing a new feature in my `dev` branch, I want to merge the branch with my `master` branch when I want to store the code and to my `staging` branch for when that feature is ready to be released.

To do this I have to:

- checkout the `master` branch,
- merge the `dev` branch to `master`,
- push the changes to `origin/master`,
- checkout the `staging` branch,
- merge the `dev` branch to `staging`
- push the changes to `origin/staging`,

It becomes apparent that automating this process with a single command is needed when you do this task frequently. Note that I am adding, committing and pushing the code from the `dev` branch manually before any of these commands are run.

In `package.json`:

```json
{
  "name": "nuxt-deploy-workflow",
  "version": "4.1.0",
  "adonis-version": "4.1.0",
  "description": "Better manage your deployment workflow using scripts",
  "scripts": {
    "_comment": "merge commands",
    "merge-dev:master": "git checkout master && git merge dev && git push origin master",
    "merge-dev:staging": "git checkout staging && git merge dev && git push origin staging",
    "merge-dev:release": "npm run merge-dev:master && npm run merge-dev:staging",
    "merge-staging:heroku": "git checkout heroku && git merge staging",
    "merge-staging:netlify": "git checkout netlify && git merge staging",
    "merge-staging:release": "npm run merge-staging:heroku && npm run merge-staging:netlify"
  },
  "author": "Your Name",
  "license": "MIT",
  "private": false
}
```

Now if I run `merge-staging:release` from the command line using `npm run`, the script will sequentially run each command merging the new feature to each branch and pushing the update to the online repo.

The scripts for the deployment are similar to the merge commands.

To deploy code to both Heroku and Netlify:

- run all merge commands
- push `heroku` to `heroku/master`
- checkout `staging` branch
- push `netlify` to `origin/netlify`
- checkout `staging` branch

I'm checking the `staging` branch after each command for cases where I run them individually.

In `package.json`:

```json
    "release:heroku": "git subtree push --prefix server heroku master && git checkout staging",
    "release:netlify": "git push origin netlify && git checkout staging",
    "deploy:client": "npm run merge-dev:release && npm run merge-staging:netlify && npm run release:netlify",
    "deploy:server": "npm run merge-dev:release && npm run merge-staging:heroku && npm run release:heroku",
    "deploy:all": "npm run deploy:client && npm run deploy:server"
```

The deploy commands are building on top of the merge and release commands. `deploy:all` will run all of the commands allowing me to merge, push and deploy a new feature with one command from the `dev` branch.

Putting this all together, in `package.json`:

```json
{
  "name": "nuxt-deploy-workflow",
  "version": "4.1.0",
  "adonis-version": "4.1.0",
  "description": "Better manage your deployment workflow using scripts",
  "scripts": {
    "_comment": "merge commands",
    "merge-dev:master": "git checkout master && git merge dev && git push origin master",
    "merge-dev:staging": "git checkout staging && git merge dev && git push origin staging",
    "merge-dev:release": "npm run merge-dev:master && npm run merge-dev:staging",
    "merge-staging:heroku": "git checkout heroku && git merge staging",
    "merge-staging:netlify": "git checkout netlify && git merge staging",
    "merge-staging:release": "npm run merge-staging:heroku && npm run merge-staging:netlify",
    "release:heroku": "git subtree push --prefix server heroku master && git checkout staging",
    "release:netlify": "git push origin netlify && git checkout staging",
    "deploy:client": "npm run merge-dev:release && npm run merge-staging:netlify && npm run release:netlify",
    "deploy:server": "npm run merge-dev:release && npm run merge-staging:heroku && npm run release:heroku",
    "deploy:all": "npm run deploy:client && npm run deploy:server"
  },
  "author": "Your Name",
  "license": "MIT",
  "private": false
}
```
