---
date: 2020-03-04T18:40:31.898Z
title: External API Requests with ASP.NET Core 3.1
description: 3rd-party API consumption example
thumbnail: /images/asp-net-core-identity-config.svg
hero: /images/asp-net-core-identity-config.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Using external APIs is so commonplace in web development it is high on the list of necessary skills and skills to learn in any tech stack. Since I've been building things with ASP.NET Core, I wanted to figure out how to work with 3rd-party APIs as soon as possible. I've used these in the past for several projects including [VoteInfo](https://www.jeremybratcher.com/portfolio/2020-01-10-voteinfo) and [ShouldIRun](https://www.jeremybratcher.com/portfolio/2020-01-10-should-i-run) as public APIs are easy to use and provide powerful data to work with for web applications.

Coming from the JavaScript world, simple API requests to retrieve and work with JSON boil down to just a handful of lines of code. Using ASP.NET Core, much more code is required for even simple request but the benefits of using a robust ecosystem, enterprise support and explicit typing outweigh the extra set up time.

Below is a copy of the repo's readme file which walks you though how to set up a simple http request to an external API with the response being saved to the database and displayed on the page.

# ASP.NET Core 3.1 External API Request

A simple MVC app to show examples of how to consume an external API using ASP .NET Core 3.1

Features:

- Fetch data with a simple Http request
- Fetch data using authorization
- Display data on a Razor page
- Save data using EFCore

## A simple request

The [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API allows for rapid prototyping against a fake online REST API. This example uses the Photos endpoint provided by the API.

An onine service [json2csharp](http://json2csharp.com/) allows for easy creation of a C# model from the JSON data. JSON data can simply be copy/pasted into a field and a C# model will be generated that represents the data.

Steps:

- Create an ASP.NET Core MVC app using Visual Studio template
- Add EFCore and SQL Server to project via Nuget Package Manager
- Add Photo.cs to the Models folder
- Add the following code to Photo.cs

```cs
namespace ASPNETCoreExternalAPIRequest.Models
{
    public class Photo
    {
        public class RootObject
        {
            public int albumId { get; set; }
            public int id { get; set; }
            public string title { get; set; }
            public string url { get; set; }
            public string thumbnailUrl { get; set; }
        }

    }
}
```

- Add a Data folder
- In the Data folder, add a file named ApplicationDbContext.cs
- Add the following code to ApplicationDbContext.cs

```cs
using Microsoft.EntityFrameworkCore;
using ASPNETCoreExternalAPIRequest.Models;
...
namespace ASPNETCoreExternalAPIRequest.Data
{
    public class ApplicationDbContext : DbContext

    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Photo> Photos{ get; set; }
    }
}
```

The ApplicationDbContext will inherit from the base DbContext.\
DbSet<Photo> will hold a list of Photos from the database.

- Add the following code to Startup.cs

```cs
using ASPNETCoreExternalAPIRequest.Data;
using Microsoft.EntityFrameworkCore;
...
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
            Configuration.GetConnectionString("DefaultConnection")));
}
```

- Add the following code to appsettings.json

```cs
ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ASPNETCoreExternalAPIRequest-1;Trusted_Connection=True;MultipleActiveResultSets=true"
}
```

- Scaffold a MVC controller with CRUD pages
- Add New Scaffolded Item -> MVC Controller with Views, using Entity Framework -> enter the model -> enter the database context -> Add
- Run the initial migration
- From the Package Manager Console:
- Add-Migration InitialCreate
- Update-Database
- In Shared/\_Layout.cshtml, add a link to the photos index page

```html
<li class="nav-item">
  <a
    class="nav-link text-dark"
    asp-area=""
    asp-controller="Photos"
    asp-action="Index"
    >Photos</a
  >
</li>
```

- Install Newtonsoft.Json and Microsoft.AspNetCore.Mvc.NewtonsoftJson via the Nuget Package Manager
- Update Startup.ConfigureServices to call AddNewtonsoftJson.

```cs
    services.AddMvc().AddNewtonsoftJson();
```

- In the PhotosController, add the following using statements and a new method to fetch the data

```cs
using System.Net.Http;
using Newtonsoft.Json.Linq;
...
public async Task<IActionResult> FetchPhotos()
{

    using (var client = new HttpClient())
    {
        // build request
        client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com/");
        client.DefaultRequestHeaders.Add("Accept", "application/json");
        var response = await client.GetAsync($"/photos?_start=0&_limit=10");
        response.EnsureSuccessStatusCode();

        // convert request to list of Photos
        var photos = await response.Content.ReadAsStringAsync();
        JArray photoSearch = JArray.Parse(photos);
        IList<JToken> results = photoSearch.Children().ToList();
        IList<Photo> searchResults = new List<Photo>();

        // update photo or add if not exists
        foreach (JToken result in results)
        {
            // JToken.ToObject is a helper method that uses JsonSerializer internally
            Photo searchResult = result.ToObject<Photo>();
            searchResults.Add(searchResult);

            if (!PhotoExists(searchResult.Id))
            {
                _context.Add(searchResult);
            }
            else
            {
                _context.Update(searchResult);
            }

            // since id is being set by api call need to toggle identity on before saving
            _context.Database.OpenConnection();

            try
            {
                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Photos ON");
                _context.SaveChanges();
                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Photos OFF");
            }
            finally
            {
                _context.Database.CloseConnection();
            }

            await _context.SaveChangesAsync();
        }

        return Redirect("/Photos");

    }
}
```

There is a lot going on here so let's break it down.

- Using HttpClient, we set the base url and accept header.
- Then we make the request (notice the start and limit query parameters) and ensure it is a valid response code.
- Next we take the response string (which is a Json Array in string format) and convert it to a Json array.
- Set the resulting Json array to a JTokens list which captures each object in the Json array as a seperate item.
- Also set a List of Photos variable to hold the list in the next step
- Next iterate over each item in the json array, convert it to a Photo C# object and add it to list we are building.
- upsert function to check if item is already in database.
- Identity insert used since Id is not being set by EF Core but the incoming json (https://entityframeworkcore.com/saving-data-identity-insert).

Once these steps are completed, build the project and navigate to the Photos page and click on the Update Photos link. This will call the API and upsert the results into to the database. Then the page is redirected to the Photos page for a refresh and the Photo objects will be displayed.
