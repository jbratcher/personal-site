---
date: 2020-03-16T22:54:32.557Z
title: C# Event Scraper
description: Scrape the web with C#
thumbnail: /images/asp-net-core-event-scraper.svg
hero: /images/asp-net-core-event-scraper.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Recently, I've been working on building a personal project that allow users to find events based on the industry and occupation they work in. There are not really any public APIs for this task that allow you to search for events so, naturally, one clear way to get this data is to scrape it from the web.

Python is currently the most popular language to use for web scraping but since I'm deep-diving into C# and .Net Core, I decided I would write my own scraper using the Microsoft stack instead.

It was surprising easily to get a scraper up and running using the [AngleSharp](https://anglesharp.github.io/) package. I bootstrapped a basic ASP.NET Core MVC app and basically just added a few methods to the controller as well as binding input fields that allowed the user to modify the location and search term.

The result is a very rudimentary web scraper that is currently limited to just one site but it works well for what it does. The scraped list needed to be pruned of duplicates as sometimes the list would contain multiples of the same event.

Also, I had to check if the event already existed in the database. I was having issues getting LINQ Enumberable.Distinct() to actually return only a distinct list of events so I used a somewhat hack-y check to see if the current event datetime and title matched any other events before adding an event to the list instead.

On the index page of the event view, I added a text input field for the location and the event type (search term). When submitted, the arguments are fed into a URL builder and a request is made to the URL. Once the request is successful, Anglesharp is used to query the list of events on the page and returns a DOM item for each event. The events are iterated through querying the DOM elements that match the model fields (datetime, URL, title, price, etc) and a list is built from this. The list is then pruned of duplicates and saved to the database. If the event already exists in the database, it is not added.

There are many things I want to add to this project, not least of which is support for multiple sites. Unfortunately, I may have to write a new scraper for each site as they tend to be fragile in that they depend on the DOM structure which can be wildly different for each site. Most sites like this also don't want to be scrapped and purposefully make it difficult to do so by obscuring information or changing content structures periodically. But this is what I must do until a better option presents itself.

[Repo](https://github.com/jbratcher/EventScraper)
