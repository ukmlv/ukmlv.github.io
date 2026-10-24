---
layout: post
title: Blog Post Template
date: 2026-10-23
description: A template demonstrating al-folio blog post features.
tags: [template, formatting]
categories: []
math: true # NO EFFECT in this theme: math is switched on site-wide by enable_math in _config.yml
bibliography: papers.bib # NO EFFECT here: only the distill layout reads it; posts always cite from _bibliography/papers.bib
---

{% comment %}
How to use this template: copy this file to `_posts/YYYY-MM-DD-your-title.md` and edit the front matter above.
Posts dated in the future are not published until that date. Each tag and category gets an archive page
under `/blog/tag/` or `/blog/category/`.

The `math` and `bibliography` keys above do nothing in this theme, so do not rely on them:

- Math: MathJax is loaded on every page when `enable_math: true` is set in `_config.yml` (it is on now).
  If it is ever set to `false`, the equations below will show as raw LaTeX; turn it back on to render them.
- Citations: the cite and bibliography tags always use the file set by `scholar: bibliography:` in
  `_config.yml` (`papers.bib`). A per-post `bibliography:` key is only read by the distill layout.

Explanations like this one sit inside Liquid comment blocks, which are left out of the published page.

{% endcomment %}

This post shows the main building blocks of an al-folio blog post. Copy it as a starting point for new posts.

{% comment %}
Text formatting: standard Markdown. Use ## for sections and ### for subsections (the post title is the page's H1).
{% endcomment %}

## Text formatting

Text can be **bold**, _italic_, or **_both_**.

### Lists

- Bullet lists start each line with a dash
- Indent by two spaces to nest
  - like this

1. Numbered lists start each line with a number
2. The numbers are renumbered automatically

### Quotes and dividers

> Blockquotes start each line with `>`. Use them for quotations or to set a remark apart.

A horizontal rule (three dashes on their own line) separates sections:

---

{% comment %}
Links: external links use the full URL. Internal links use relative_url so they keep working if the site moves;
change '/publications/' to the permalink of any page on this site.
{% endcomment %}

## Links

Read more about [Jekyll](https://jekyllrb.com/), or see the [publications page]({{ '/publications/' | relative_url }}).

{% comment %}
Code: wrap code in three backticks and name the language (python, bash, c++, ...) for syntax highlighting.
Use single backticks for code inside a sentence.
{% endcomment %}

## Code

Inline code looks like `numpy.linalg.norm(x)`. A code block with syntax highlighting:

```python
import numpy as np


def soft_threshold(x, tau):
    """Proximal operator of the l1 norm."""
    return np.sign(x) * np.maximum(np.abs(x) - tau, 0.0)


print(soft_threshold(np.array([-2.0, 0.5, 3.0]), 1.0))
```

{% comment %}
Math: MathJax renders LaTeX. Inside a sentence, $$ ... $$ gives inline math. On its own paragraph, $$ ... $$ gives
a displayed equation.
{% endcomment %}

## Math

Inline math sits inside a sentence, like $$ y = Ax + e $$ for a linear measurement model.

A displayed equation goes in its own paragraph:

$$
\hat{x} = \arg\min_{x} \left\{ \frac{1}{2} \|y - Ax\|_2^2 + \lambda \|x\|_1 \right\}
$$

{% comment %}
Image: figure.liquid adds responsive WebP versions, lazy loading and an optional caption.
path is relative to the site root, and alt describes the image for screen readers.
Change the col-sm-6 class to make the image wider or narrower.
Add zoomable=true to let readers click to enlarge it.
{% endcomment %}

## Image

<div class="row justify-content-sm-center">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/kamilov.jpg" class="img-fluid rounded z-depth-1" alt="Portrait of Ulugbek Kamilov" caption="A figure with a caption, added with figure.liquid." %}
  </div>
</div>

{% comment %}
Table: separate columns with | and put a row of dashes under the header. Colons in that row set alignment
(:--- left, :---: center, ---: right).
{% endcomment %}

## Table

| Method   |   Type    | Year |
| :------- | :-------: | ---: |
| ISTA     | Iterative | 2004 |
| ADMM     | Iterative | 2011 |
| PnP-ADMM |  Learned  | 2013 |

{% comment %}
Citation: the cite tag below inserts an in-text citation for an entry in `_bibliography/papers.bib`; replace
`Park.etal2026` with any BibTeX key from that file. The bibliography tag with --cited, under References,
lists every entry cited in this post.
{% endcomment %}

## Citation

Measurement score-based diffusion models are introduced in {% cite Park.etal2026 %}.

## References

<div class="publications">
{% bibliography --cited %}
</div>
