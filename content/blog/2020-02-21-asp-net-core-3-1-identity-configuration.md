---
date: 2020-02-21T21:36:57.927Z
title: ASP.NET Core 3.1 Identity Configuration
description: A starter project with user authentication pre-configured
thumbnail: /images/asp-net-core-identity-config.svg
hero: /images/asp-net-core-identity-config.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

One technology I wanted to learn more about this year is .NET Core specifically for web app development. Microsoft has made some large strides over the few years with .NET Core such as Razor Pages and, now, Blazor. The maturity of the ecosystem and speed of development are a big draw as well as the large available standard library.

With ASP.NET Core templates, you can quickly bootstrap a web API, MVC based web app, or a static site in Visual Studio. The first thing I generally do when learning a new stack is to create a starter template to abstract away some of the tedious configurations that would be standard to nearly any web application. Often, the first aspect of this that I consider is user authentication and authorization.

Most web apps need to provide a service that allows a user to register and login/logout. Also, most web apps will guard certain CRUD routes like Create, Edit, and Delete and leave others open like Index and Read. All these things can be configured generally to provide a better base starting point that the default templates.

ASP.NET Core comes with Identity with can be used for both local users and windows login users. For a web app, local users is used which has settings for development and production. This can be set up when creating the project from a template in Visual Studio by selecting "Change" under "Authentication" and then selecting "Individual User Accounts" in the "Change Authentication" menu.

Once the application is created, the Identity module contents will be in the Areas directory. You can use the "Scaffold New Item" function with Identity to override any/all pages, create/set a new database context, and create/set a new user model.

By default the user model and application context is created in the Identity directory. I wanted a structure that had only one main application context and also a single models directory so I modified the application context used for Identity and moved the user model to the top-level models directory. The required several global variable name changes and using calls to be modified including all the generated page views from Identity. There are a few other changes outline in the repository's documentation so I won't duplicate steps here.

You can see the final product by visiting the link below.

[Repo](https://github.com/jbratcher/ASP-NET-Core-3.1-Identify-Starter)
