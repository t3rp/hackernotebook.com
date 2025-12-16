---
title: All Tags
permalink: /tags/index.html
---

<ul>
  {%- for tag in collections.tagList -%}
    <li>
      <a href="/tags/{{ tag | slugify }}/">{{ tag }}</a>
    </li>
  {%- endfor -%}
</ul>