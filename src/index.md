---
layout: layouts/base.njk
title: Home
eleventyNavigation:
  key: Home
---

My handle is `terp/t3rp`. This is my homepage. Thank you for visiting.

You can read and connect on the [about](/pages/about) page.

# Recent Articles

{% assign latest_posts = collections.posts %}
{% for post in latest_posts limit:100 %}
    - [{{ post.data.title }}]({{ post.url }}) posted on {{ post.data.date | htmlDateString }}
{% endfor %}