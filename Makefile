
.PHONY: help

APP_VSN ?= `grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[ ",]//g' | sed 's/version\://g'`
BUILD ?= `git rev-parse --short HEAD`

help:
		@echo "cgrates_web_frontend:$(APP_VSN)"
		@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build the Docker image
		ember b -prod && docker build -t maxkonin/cgrates_web_frontend:$(APP_VSN) -t maxkonin/cgrates_web_frontend:latest .
