/* global require */
/* global module */

'use strict';

const UrlCom = require('./urlcom');

class Router {

	constructor() {
		if(Router._instance) {
			return Router._instance;
		}

		if(window.location.protocol != 'https:') {
			//location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
		}

		Router._instance = this;
		this.urls = [];

		const _this = this;
		window.addEventListener('popstate', function() {
			_this.loadPage(location.pathname);
		}, false);
	}

	addUrl(url, view) {
		const Url = new UrlCom(url, view);
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
		if (!url || typeof url === 'undefined' || url == null) {
			url = this.getUrl();
		}

		if(url != '/' && url[url.length - 1] == '/') {
			url = url.substring(0, url.length - 1);
		}

		const Route = this.urls.filter(function(urlObj) {
			// later better use regular expression
			// but here we just compare 2 strings
			// console.log(urlObj.url, url, urlObj.url == url);
			return (urlObj.url == url);
		})[0];

		if(this.CurrentRoute) {
			this.CurrentRoute.destroy();
			console.log('Destroyed page ' + this.CurrentRoute.url);
		}
		this.CurrentRoute = Route;
		console.log('Loaded new page: ' + url);
		Route.load();
	}
}

module.exports = Router;
