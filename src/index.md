---
layout: layouts/base.njk
title: Home
eleventyNavigation:
  key: Home
---

<ul class="post-list retro">
{% assign latest_posts = collections.posts | reverse %}
{% for post in latest_posts limit:100 %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <!-- <span class="post-author">posted by {{ metadata.author.name }}</span> --> 
    <span class="post-meta">posted on <time datetime="{{ post.data.date | htmlDateString }}">{{ post.data.date | htmlDateString }}</time></span>
  </li>
{% endfor %}
</ul>