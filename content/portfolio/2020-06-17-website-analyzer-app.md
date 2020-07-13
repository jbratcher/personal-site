---
date: 2020-06-17T15:23:23.132Z
title: Website Analyzer App
description: Analyze and produce reports for website optimization using Google Lighthouse automation.
thumbnail: /images/website-analyzer-app.png
hero: /images/website-analyzer-app.png
demo: https://thirsty-lumiere-cb2cbe.netlify.app/
repo: https://github.com/jbratcher/website-analyzer-app
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Lighthouse audits are generated and processed to display opportunities for website optimization and plain speak fixes for the issues.

[Demo](https://thirsty-lumiere-cb2cbe.netlify.app/)

Repo split into server and client

Stack: Adonis, Nuxt Hosting: Heroku, Netlify

Features:

- Dashboard

  - User Auth functions
  - Run an audit by project name and website URL
  - List of audits performed showing info in table format
  - Report view showing
    - general report info
    - categorical scores
    - failed audit and their details

- Node commands to automatically run a lighthouse audit for one website and generate a raw report, an analyzed report, and an 'action-step' list.
  - The raw report is lighthouse report for the URL.
  - The analyzed report has normalized data from the raw report and includes failing audit and their scores.
  - The action steps list describes the remedies for the failing audits in low tech terms.
  - The action steps are designed for the average computer-literate person to be able to complete.

Road map:

- Write 'action steps' for each reported issue from Google Lighthouse reports Create dashboard to view report data and complete action steps.
- User stories for dashboard refinement
