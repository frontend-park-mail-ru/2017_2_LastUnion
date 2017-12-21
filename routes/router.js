/* global require */
/* global module */

'use strict';

import UrlCom from './urlcom';
import User from '../modules/user';

/** Class represents router in application. Allows  url routing. */
class Router {
	/**
	 * Creates Router instance
	 *
	 * @this {Router}
	 */
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


	/**
	 * Match url route with its view
	 *
	 * @param {string} url - url string
	 * @param {string} view - path to view
	 * @this {Router}
	 */
	addUrl(url, view) {
		const Url = new UrlCom(url, view);
		this.urls.push(Url);
	}

	/**
	 * Returns current path
	 *
	 * @this {Router}
	 * @return {string} Current path
	 */
	getUrl() {
		return window.location.pathname;
	}


	/**
	 * Redirect to new page
	 *
	 * @param {string} url -  url path to page
	 * @this {Router}
	 */
	go(url) {
		if (window.location.pathname === url) {
			return;
		}
		window.history.pushState({}, '', url);
		this.loadPage(url);
	}



	/**
	 * Select the view for the page and call the method of its construction
	 *
	 * @param {string} url -  url path to page
	 * @this {Router}
	 */
	loadPage(url) {
		if (!url || typeof url === 'undefined' || url == null) {
			url = this.getUrl();
		}

		if(url != '/' && url[url.length - 1] == '/') {
			url = url.substring(0, url.length - 1);
		}

		const Route = this.urls.filter(function(urlObj) {
			return (urlObj.url == url);
		})[0];

		if(this.CurrentRoute) {
			this.CurrentRoute.destroy();
			console.log('Destroyed page ' + this.CurrentRoute.url);
		}

		if(typeof Route === 'undefined' || Route === null) {
			Route = this.urls[0];
		}

		this.CurrentRoute = Route;
		console.log('Loaded new page: ' + url);
		const user = new User();
		if(typeof user.isAuth() === 'undefined') {
			user.getUser().then(function() {
				Route.load();
			});
		} else {
			Route.load();
		}
	}
}

export default Router;
