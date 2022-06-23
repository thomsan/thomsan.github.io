dependencies-windows:
	npm install -g gulp-cli
	npm install --also=dev
	gem install bundler
	bundle install

dependencies-linux:
	sudo apt install ruby-bundler nodejs gulp
	sudo bundle install
	npm install --also=dev

serve:
	gulp serve

serve-jekyll:
	jekyll server
