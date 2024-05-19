/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
	static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
		Cookies.set(
			'currentUser',
			JSON.stringify(user),
			{expires: 30}
		);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
		Cookies.remove('currentUser');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
		return JSON.parse(Cookies.get('currentUser'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
		createRequest({
			method: 'GET',
			url: User.URL + '/current',
			responseType: 'json',
			callback: (err, response) => {
				if (response?.user) {
					User.setCurrent(response.user);
				} else if (!err?.success) {
					User.unsetCurrent();
				}
				callback(err, response);
			}
		});
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
			method: 'POST',
      url: User.URL + '/login',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response?.user) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
		createRequest({
			method: 'POST',
			url: User.URL + '/register',
			responseType: 'json',
			data: data,
			callback: (err, response) => {
				if (response?.success) {
					User.setCurrent(response.user);
				}
				callback(err, response);
			}
		});
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
		createRequest({
			method: 'POST',
			url: User.URL + '/logout',
			responseType: 'json',
			data: User.current,
			callback: (err, response) => {
				if (response?.success) {
					User.unsetCurrent();
				}
				callback(err, response);
			}
		});
  }
}
