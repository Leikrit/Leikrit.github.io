---
layout: default
permalink: /blog_new/
title: blog_new
nav: true
nav_order: 5
pagination:
  enabled: false
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---

{% include hola10/blog.liquid %}
