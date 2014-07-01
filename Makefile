JS := $(shell find lib/ -name "*.js")

default: calendars.js

clean:
	rm -f calendars.js

calendars.js: $(JS) node_modules
	./node_modules/.bin/browserify \
		--standalone calendars \
		--transform brfs \
		--transform workerify \
		./lib/index.js > ./calendars.js

.PHONY: ci
ci: lint coverage

.PHONY: coverage
coverage: test
	find coverage/ -name "*.info" -exec cat {} \; | ./node_modules/.bin/coveralls
	rm -rf ./coverage

.PHONY: lint
lint:
	./node_modules/.bin/jshint lib/ test/

node_modules: package.json
	npm install

.PHONY: test
test: calendars.js node_modules
	./node_modules/karma/bin/karma start
