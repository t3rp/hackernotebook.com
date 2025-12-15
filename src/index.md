---
layout: layouts/base.njk
title: Home
eleventyNavigation:
  key: Home
---

# Recent Articles

{% assign latest_posts = collections.posts %}
{% for post in latest_posts limit:100 %}
    - [{{ post.data.title }}]({{ post.url }}) posted on {{ post.data.date | htmlDateString }}
{% endfor %}