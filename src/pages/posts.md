---
title: All Posts
permalink: /posts/index.html
eleventyNavigation:
  key: Posts
  order: 2
---

<ul>
{% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <!-- <span class="post-author">posted by {{ metadata.author.name }}</span> --> 
    <span class="post-meta">posted on <time datetime="{{ post.data.date | htmlDateString }}">{{ post.data.date | htmlDateString }}</time></span>
  </li>
{% endfor %}
</ul>