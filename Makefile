.PHONY: default
default: calendars.js calendars_worker.js

.PHONY: node_modules
node_modules:
	npm install

calendars.js: node_modules
	./node_modules/.bin/browserify \
		--ignore-missing \
		--standalone calendars \
		--transform brfs \
		./lib/index.js > ./calendars.js

calendars_worker.js: node_modules
	./node_modules/.bin/browserify \
		--ignore-missing \
		--transform brfs \
		./lib/worker/index.js > ./calendars_worker.js
