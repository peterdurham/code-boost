---
templateKey: blog-post
title: Hosting Web Apps with Netlify
slug: hosting-web-apps-with-netlify
date: 2020-06-29T15:01:41.107Z
dateModified: 2020-06-29T15:01:41.811Z
description: Setup and host frontend applications for free with Netlify. Connect
  your github account and deploy automatically.
featuredPost: false
category: Tools
tags:
  - Netlify
  - Hosting
  - Tools
featuredImage: /img/hosting_netlify_sunrise.jpg
---
## What is Netlify?

![Netlify Homepage](/img/netlify_home_page.jpg)

Netlify is a *cloud hosting platform* for static websites and serverless backend services.
Netlify's workflow is extremely simple as it connects directly with your *Github*, *Gitlab*,
or *Bitbucket* account. Netlify's numerous features include (but are not limited to)

- Free Static Hosting
- Deploy logs and previews
- Serverless functions
- Netlify Identity (login)
- Netlify Forms
- A/B Testing
- Analytics

## What is a static site?
A static site is a site that is served exactly how it is stored, unaltered by the server. By contrast, a dynamic server takes input from the browser before the site is served.   
<br />
Since static sites can be pre-built, Netlify is able to grab an image of your project repositories and build it on their servers. Netlify even serves assets from your static bundle on a CDN, increasing page performance with no additional setup. 

## Deploy a static site to Netlify

In order to deploy a site first signup for _Netlify_ account. Also, make sure you have a
_Github_, _Gitlab_, or _Bitbucket_ account as well to host your application code.  
<br />
When logged into Netlify, select the `New site from git` button to build an application from an existing repo.

![Netlify New App](/img/netlify_new_site.jpg)

First select your git provider (where your code is stored) and Netlify will take you to a list of your repositories. Next select the one you want to deploy to goto a build options page. Netlify will automatically detect your project's *build command* and *publish directory* for most build tools (i.e create-react-app, Gatsby, etc). If these settings don't get detected automatically, make sure to include them based on your project settings.  
<br />
Lastly, click `Deploy site` to launch Netlify's build process and redirect to an overview of the hosted application. Netlify will provide a URL here where you can view your newly hosted application.   
<br />
This page is also where you will go to update all sorts of settings and features about your Netlify projects including:

- Site Settings
- Domain Settings
- Real-time Deploy Logs / Previews
- Identity & Access Control
- Additional Netlify Features (Forms, serverless, A/B testing)

Once your site is hosted, Netlify will continue listening to any changes you make to your code repository. When you commit changes via git, Netlify automatically rebuilds your application! This is an excellent workflow, because it allows developers to focus on their code, rather than setting up hosting for frontend applications.  
<br />
Under the *domain settings* you can also change the URL of your project if it is available. This is also where you can configure a domain name if you don't want to use a Netlify subdomain for hosting.


## Netlify Features and Options
Netlify's feature list is always expanding, and there are many free and premium features already available including the following and more:
  
### Netlify Forms
Netlify forms allows you to easily add forms to the frontend which collect submissions to be viewed in the Netlify dashboard. This feature is straightforward to setup, and you can receive up to 100 submissions a month before the service costs extra.

### Netlify Functions
Netlify also allows users to host serverside code with Netlify's serverless functions. There is a generous free tier here as well with 100 hours of runtime per month, which is plenty to develop an application on. 

### Netlify Analytics
This option is great if you need simple analytics for your site, but don't want to give up your data to google. Though it currently only a paid feature at $9/site/month, it is a great alternative option to other analytics platforms.

### Conclusion

Since 2014 when they started, Netlify has changed the landscape of modern web development
by providing an all-in-one platform for developers to host their applications. If you
haven't already, I highly recommend giving Netlify a try.
