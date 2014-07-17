cp less/variables.less node_modules/bootstrap/less

node ./node_modules/.bin/lessc --include-path=./node_modules \
    less/basic.less css/basic.css
node ./node_modules/.bin/lessc --include-path=./node_modules \
    less/glyphicons.less css/glyphicons.css
node ./node_modules/.bin/lessc --include-path=./node_modules/bootstrap/less \
    ./node_modules/bootstrap/less/normalize.less css/normalize.css
