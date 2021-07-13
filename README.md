# thomasascioglu.com - Made with Jekyll

## Overview
* Website is built with [Jekyll](https://jekyllrb.com/)
* Hosted on [github pages](https://pages.github.com/)
* Assets are managed and optimized with [gulp](https://gulpjs.com/)
* Based on [Massively html5 template](https://html5up.net/massively)
* Background made with [nacker.io](https://app.naker.io/?href=Top6)
* Using [Font Awesome Icons](https://fontawesome.com/icons?d=gallery) (Check for all available icons).
* Using [Carousel](https://jekyllcodex.org/without-plugin/slider/#) for portfolio.
* Using [Pixi.js v2.2.5](https://cdnjs.cloudflare.com/ajax/libs/pixi.js/2.2.5/pixi.js) and [this template](https://codepen.io/enricotoniato/pen/gbzJYO) for particle 404 page.
* Using jekyll pagination for the main blog '/blog/' but not for the sub blogs for different categories since multiple paginations are not supported by github pages.
* Using [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) for generating a sitemap.org compliant sitemap in `/sitemap.xml`
* Using [jekyll-feed](https://github.com/jekyll/jekyll-feed) for generate an Atom (RSS-like) feed of my posts in `/feed.xml`
* Sitemap is set [on Google](https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Athomasascioglu.com&hl=en)
* [Pixlee for Instagram feed](https://socialfeed.pixlee.com/)

### Gihtub pages info

* Github pages only supports [these plugins](https://pages.github.com/versions/)
* Github pages needs all plugins to be mentioned in _config.yml -> plugins (that's why they are there and in Gemfile)

## Local Development prerequisites
* Ruby bundler
* NodeJs

### Windows
Install dev dependencies
* [Ruby bundler](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_install_jekyll_on_windows.html)


### Linux
1. Install Jekyll and plug-ins in one fell swoop.
```
sudo apt install ruby ruby-dev
sudo gem install github-pages
```

## Local Development
Change source files and add assets as you like.
The site is generated and updated automatically (jekyll triggers gulp pipeline) while serving via:

```
make serve
```
