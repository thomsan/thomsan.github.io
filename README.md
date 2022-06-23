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

## Local Development & adding Content
The build flow is as follows:
Gulp is used to optimize the source files in [./_app](./_app/) and output them to [./](./) where Jekyll takes over.
Together with all other source files present in [./](./) jekyll processes everything and puts the final static website into [./_site](./_site).


Source files are splitted as follows:
* [./_app](./_app/): Everything that needs gulp optimization (assets/fonts/images/js scripts/(s)css styles)
* [./](.//): Website base files (.html, .md, .htaccess, CNAME, ...)
Hint: To only see source files that can be edited inside [./](.//) (excluding the gulp optimized files from [./_app](./_app/) run `gulp clean`


There are two ways to serve the site during development:

1. Serving with gulp detects changes in [./_app](./_app/) but is slow.
Use this if developing new functionality (changing .js) files.
```
make serve-gulp
```
Hint: If there are gem file dependency issues, run `sudo bundle clean --force`

2. Serving with jekyll does not detect changes in [./_app](./_app/) but is fast.
Use this for new blog posts.

```
make serve
```
Hint: If new assets/fonts/images/scripts/styles/... are added, run `gulp build` before serving.

## Deployment
Since github pages will run `jekyll build` based on the files present in [./](.//), everything relevant must be inside. Meaning that the gulp output files must be pushed in order for jekyll deployment to take over on github.

To deploy the site run the following command and push everything inside [./](.//):
```
gulp build
```

### Prerequisites
* Ruby bundler
* NodeJs

#### Windows
Install dev dependencies
* [Ruby bundler](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_install_jekyll_on_windows.html)


#### Linux
1. Install Jekyll and plug-ins in one fell swoop.
```
sudo apt update
sudo apt install -y ruby ruby-dev nodejs
sudo gem install jekyll -v 4.2.0
sudo gem install github-pages
```
