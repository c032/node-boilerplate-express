NODE := node
NPM := npm

build: package.json package-lock.json node_modules/.timestamp
	${NPM} run build
.PHONY: build

clean:
	rm -rf dist/
.PHONY: clean

distclean:
.PHONY: clean

lint:
	${NPM} run lint
.PHONY: clean

server: dist/cli.js
	cd dist/ && ${NODE} -e 'require("./cli.js").main();'
.PHONY: server

dist/cli.js: build

node_modules/.timestamp:
	rm -rf node_modules/
	${NPM} install
	touch ${.TARGET}
