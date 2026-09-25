---
layout: page
permalink: /teaching/
title: teaching
description: Courses taught at the University of Wisconsin–Madison.
nav: true
nav_order: 4
---

{% assign courses = site.teachings | sort: "semester_sort" | reverse %}
{% assign current_semester = "" %}

{% for course in courses %}
{% if course.semester_id != current_semester %}
{% unless current_semester == "" %}
<br>
{% endunless %}
<h5 class="mt-4 mb-3">
<span class="badge" style="background-color:#303abf;color:#fff;">{{ course.semester_id }}</span>
</h5>
{% assign current_semester = course.semester_id %}
{% endif %}

<div class="mb-4">
<h5 class="mb-1">
<a href="{{ course.url | relative_url }}">{{ course.title }}</a>
</h5>
{% if course.course %}
<p class="mb-1"><strong>{{ course.course }}</strong> · {{ course.institution }}</p>
{% else %}
<p class="mb-1">{{ course.institution }}</p>
{% endif %}
<p>{{ course.description }}</p>
</div>
{% endfor %}