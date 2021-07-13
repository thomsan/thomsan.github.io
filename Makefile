dependencies-windows:
	npm install -g gulp-cli
	npm install --also=dev
	gem install bundler
	bundle install

dependencies-linux:
	sudo apt install ruby-bundler nodejs
	sudo bundle install
	npm install --also=dev

serve:
	jekyll server
