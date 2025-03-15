lint:
	npx eslint

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

install:
	npm install

testCoverage:
	npx jest --coverage