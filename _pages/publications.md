---
layout: page
permalink: /publications/
title: publications
description: A list of my publications.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

A complete list is available on [Google Scholar](https://scholar.google.com/citations?user=3qYUSDwAAAAJ&hl=en).

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

<section class="pub-section" id="preprints">
<h2 class="pub-section-title">Preprints</h2>

{% bibliography --query @article[abbr=arXiv] --group_by none %}

</section>

<section class="pub-section" id="published">
<h2 class="pub-section-title">Published</h2>

{% bibliography --query @*[abbr!=arXiv] %}

</section>

<section class="pub-section" id="theses">
<!-- Add theses here when ready -->
</section>

</div>
