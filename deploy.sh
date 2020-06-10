#!/usr/bin/env sh

# Deploy to githubpages.io

# stash uncommitted changes to avoid publishing uncommitted updates
git stash

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

# retrieve local changes from git stash
git stash pop
