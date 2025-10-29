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

<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
  <meta charset="utf-8">
  <title>Rendezvous</title>
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="assets/css/css_hola10/base.css">
  <link rel="stylesheet" href="assets/css/css_hola10/vendor.css">
  <link rel="stylesheet" href="assets/css/css_hola10/main.css">

  <script src="assets/js/js_hola10/modernizr.js"></script>
  <script src="assets/js/js_hola10/pace.min.js"></script>
</head>

{% if page.pagination.enabled %}
  {% assign postlist = paginator.posts %}
{% else %}
  {% assign postlist = site.posts %}
{% endif %}

<body id="top">

<header class="s-header">
  <div class="header-logo">
    <a class="site-logo" href="https://jinyi.li"><em>Jinyi Li</em></a>
  </div>
  <nav class="header-nav-wrap">
    <ul class="header-nav">
      <li><a href="https://jinyi.li" title="about">about</a></li>
      <li class="current"><a href="https://jinyi.li/blog/" title="blog">blog</a></li>
      <li><a href="https://jinyi.li/publications/" title="publications">publications</a></li>
      <li><a href="https://jinyi.li/projects/" title="projects">projects</a></li>
      <li><a href="https://jinyi.li/cv/" title="cv">cv</a></li>
    </ul>
  </nav>
  <a class="header-menu-toggle" href="#0"><span>Menu</span></a>
</header>

<section class="page-header page-hero" style="background-image:url(https://jinyi.li/assets/teaching/8.jpg)">
  <div class="row page-header__content">
    <article class="col-full">
      <div class="page-header__info">
        <div class="page-header__cat">
          <a href="https://jinyi.li/ziying/">Jinyi & Ziying</a>
        </div>
        <div class="page-header__date">
          July 16, 2025
        </div>
      </div>
      <h1 class="page-header__title">
        <a href="https://jinyi.li/ziying/2025-07-17-1314/">The 1314 Anniversary.</a>
      </h1>
      <p>The story of ours.</p>
    </article>
  </div>
</section>

<section class="blog-content-wrap">
  <div class="row blog-content">
    <div class="col-full">
      <div class="blog-list block-1-2 block-tab-full">

        {% for post in postlist %}
        <article class="col-block">
          <div class="blog-date">
            <a href="{{ post.redirect | relative_url }}">{{ post.date | date: "%b %d, %Y" }}</a>
          </div>
          <h2 class="h01"><a href="{{ post.url }}">{{ post.title }}</a></h2>
          <p>{{ post.description }}</p>
          <div class="blog-cat">
            {% if tags != "" %}
              &nbsp; &middot; &nbsp;
              {% for tag in post.tags %}
              <a href="{{ tag | slugify | prepend: '/blog/tag/' | prepend: site.baseurl}}">
            {% endfor %}
          </div>
        </article>
        {% endfor %}

      </div>
    </div>
  </div>
</section>

<footer>
  <div class="row">
    <div class="col-full">
      <div class="footer-logo">
        <a class="footer-site-logo" href="https://jinyi.li">Jinyi Li</a>
      </div>
    </div>
  </div>
  <div class="row footer-bottom">
    <div class="col-twelve">
      <div class="copyright">
        <span>© Copyright Hola 2017</span>
        <span>Design by <a href="https://www.styleshout.com/">styleshout</a></span>
      </div>
      <div class="go-top">
        <a class="smoothscroll" title="Back to Top" href="#top"><i class="im im-arrow-up" aria-hidden="true"></i></a>
      </div>
    </div>
  </div>
</footer>

<script src="assets/js/js_hola10/jquery-3.2.1.min.js"></script>
<script src="assets/js/js_hola10/plugins.js"></script>
<script src="assets/js/js_hola10/main.js"></script>
</body>
</html>
