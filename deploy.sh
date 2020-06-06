#!/usr/bin/env sh

# Deploy to githubpages.io

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

echo 'bitonproject.org' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:bitonproject/bitonproject.github.io.git master

cd -
