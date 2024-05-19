"use strict";

class Cookies {
	static set(key, value, options = {
		expires: null,
		secure: false,
		path: null,
		domain: null,
	}) {
		document.cookie = key
			+ '='
			+ encodeURIComponent(value)
			+ Cookies.paryOptions(options);
	}

	static get(key) {
		const cookie = document.cookie
			.split('; ')
			.find(cookie => cookie.startsWith(key + '='));

		if (!cookie) {
			return null;
		}

		return cookie.substring(key.length + 1);
	}

	static remove(key) {
		document.cookie = key + `=;expires=${new Date(0)}`;
	}
	
	static paryOptions(options) {
		const date = new Date();
		const msInDay = 1000 * 3600 * 24;
		let expiresInner = '';
		let secureInner = '';
		let pathInner = '';
		let domainInner = '';
		if (options.expires && !isNaN(+options.expires)) {
			expiresInner = `;expires=${new Date(+options.expires * msInDay + date.getTime())}`;
		}
		if (options.secure) { secureInner = ';secure' }
		if (options.path && options.path instanceof String) { pathInner = `;path=${options.path}` }
		if (options.domain && options.domain instanceof String) { domainInner = `;domain=${options.domain}` }
		return expiresInner + secureInner + pathInner + domainInner;
	}
}