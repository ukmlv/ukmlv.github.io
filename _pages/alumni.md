---
layout: page
title: alumni
permalink: /alumni/
description: My PhD Students and Postdocs
nav: true
nav_order: 3
---

{%- assign all = site.data.alumni -%}
{%- assign currents = all | where: "current", true | sort: "name" -%}
{%- assign alumni = all | where_exp: "p", "p.current != true" | sort: "year" | reverse -%}
{%- assign people = currents | concat: alumni -%}

<div class="container px-0">
  {% for person in people %}
    {% include alumni-card.liquid person=person %}
  {% endfor %}
</div>