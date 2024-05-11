/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {
	method: 'GET',
	url,
	data: {
		mail,
		password
	}
}) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(options.method, options.url, true);
		xhr.responseType = 'json';
		
		xhr.addEventListener('load', event => {
			event.preventDefault();

			if (xhr.status < 400) {
				resolve(xhr.response);
			} else {
				reject(xhr.response);
			}
		});

		if (options.data) {
			xhr.send(JSON.stringify(options.data));
		} else {
			xhr.send();
		}
	});
};
