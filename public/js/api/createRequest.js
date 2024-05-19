/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {
	method,
	url,
	responseType,
	data,
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
	xhr.responseType = options.responseType;

	xhr.addEventListener('load', event => {
		event.preventDefault();

		if (xhr.status < 400) {
			options.callback(null, xhr.response);
		} else {
			options.callback(xhr.response, null);
		}
	});

	if (options.data) {
		xhr.send(JSON.stringify(options.data));
	} else {
		xhr.send();
	}
};
