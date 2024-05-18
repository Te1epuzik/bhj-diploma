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
	},
	callback: (err, response) => {
		if (err) {
			console.log(err);
			return;
		}

		console.log(response);
	}
}) => {
	const xhr = new XMLHttpRequest();
	xhr.open(options.method, options.url, true);
	xhr.responseType = 'json';

	xhr.addEventListener('load', event => {
		event.preventDefault();

		if (xhr.status < 400) {
			callback(null, xhr.response);
		} else {
			callback(xhr.response, null);
		}
	});

	if (options.data) {
		xhr.send(JSON.stringify(options.data));
	} else {
		xhr.send();
	}
};
