'use strict';

const urlcom = require('./urlcom');

class Router {

	constructor() {
		if(Router._instance) {
			return Router._instance;
		}
		Router._instance = this;
		this.urls = [];

		const _this = this;
		window.addEventListener("popstate", function(e) {
			_this.loadPage(location.pathname);
		}, false)
	}

	addUrl(url, view) {
		const Url = new urlcom(url, view);
		this.urls.push(Url);
	}

	getUrl() {
		return window.location.pathname;
	}

	go(url) {
		if (window.location.pathname === url) {
            return;
        }
        window.history.pushState({}, '', url);
        this.loadPage(url);
	}

	loadPage(url) {
		if (!url || typeof url === 'undefined')
			url = null;
		if(url == null) {
			url = this.getUrl();
		}

		if(url != '/' && url[url.length - 1] == '/') {
			url = url.substring(0, url.length - 1);
		}

		const route = this.urls.filter(function(urlObj) {
			// later better use regular expression
			// but here we just compare 2 strings
			// console.log(urlObj.url, url, urlObj.url == url);
			return (urlObj.url == url);
		})[0];

		if(this.CurrentRoute) {
			this.CurrentRoute.Destroy();
			console.log('Destroyed page ' + this.CurrentRoute.url);
		}
		this.CurrentRoute = route;
		console.log('Loaded new page: ' + url);
		route.Load();
	}
}

module.exports = Router;
