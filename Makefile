dependencies-windows:
	npm install -g gulp-cli
	npm install --also=dev
	gem install bundler
	bundle install

dependencies-linux:
	sudo apt update
	sudo apt install -y gulp ruby ruby-dev ruby-bundler nodejs
	sudo gem install jekyll -v 4.2.0
	sudo gem install github-pages
	sudo bundle install
	npm install --also=dev

serve:
	gulp serve

serve-jekyll:
	jekyll server
