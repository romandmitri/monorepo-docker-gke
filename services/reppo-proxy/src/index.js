class Utility {

	/**
	 * @param {string} tag
	 * @param {HTMLElement} target
	 * @returns {HTMLElement}
	 */
	static element(tag = 'div', target) {
		const element = document.createElement(tag)
		target && target.appendChild(element)
		return element
	}

	/**
	 * Checks if specified URL exists.
	 * @param {string} url The absolute and/or relative url to check, ie: /api, http://localhost:2000/api
	 * @param {function} callback Logic to call once response is determined.
	 */
	static isUrlExists(url, callback) {

		const request = new XMLHttpRequest();

		request.onload = () => {
			callback(request);
		};

		request.open('GET', url, true);
		request.send();
	}

	/**
	 * Checks status of given service (by id) and updates UI accordingly.
	 * @param {string} serviceId The service name (and ID) to check/update.
	 */
	static ComponentServiceStatus(serviceId) {

		const elementRoot = document.getElementById(serviceId);
		const elementHeader = elementRoot.querySelector('h2');

		new ServiceStatusComponent({
			target: elementHeader,
		});
	}
}

$E = Utility.element;

class ServiceListComponent {

	/**
	 * @param {ServiceEntity[]} options.services
	 * @param {HTMLElement} options.target
	 */
	constructor(options) {
		this._root = $E('ul', options.target);
		this._services = options.services.map(serviceEntity => {
			return new ServiceComponent({
				target: this._root,
				serviceEntity: serviceEntity,
			});
		});
	}
}

class ServiceEntity {

	/**
	 * @param {object} options
	 * @param {string} options.name Service name, ie: "reppo-api"
	 * @param {string} options.url Relative root URL of the service, ie: "/api"
	 * @param {string} [options.urlGo] Alternative URL for accessing service, ie: "/api/routes"
	 * @param {string} [options.urlPing] Alternative URL for health checks, ie: "/api/probe"
	 */
	constructor(options) {
		this.name = options.name;
		this.url = options.url;
		this.urlGo = options.urlGo || this.url;
		this.urlPing = options.urlPing || this.urlGo;
	}
}

class ServiceComponent {

	/**
	 * @param {object} options
	 * @param {HTMLElement} options.target
	 * @param {ServiceEntity} options.serviceEntity
	 */
	constructor(options) {

		// Options.
		this._serviceEntity = options.serviceEntity;

		this._root = $E('li', options.target);
		this._root.className = "service"

		this._header = $E('h2', this._root);
		this._headerAnchor = $E('a', this._header);
		this._headerAnchor.href = this._serviceEntity.urlGo;
		this._headerAnchor.innerText = this._serviceEntity.url;

		new ServiceStatusComponent({
			target: this._header,
			url: this._serviceEntity.urlPing,
		})
	}
}

class ServiceStatusComponent {

	/**
	 * @param {object} options
	 * @param {HTMLElement} options.target
	 * @param {string} options.url Relative URL, ie: "/api"
	 */
	constructor(options) {

		// Options.
		this._target = options.target;
		this._url = options.url;

		// Elements.
		this._root = $E('div', options.target);
		this._root.className = "status";

		this.checkUrlExists()
	}

	/**
	 * @param {XMLHttpRequest} request
	 */
	set request(request) {

		if (request.status === 200) {
			this._root.classList.add("isOk")
			this._root.classList.remove("isError")
		} else {
			this._root.classList.add("isError")
			this._root.classList.remove("isOk")
		}

		this._root.innerHTML = `${request.status} ${request.statusText}`
	}

	/**
	 * Checks if URL exists, on repeat...
	 */
	checkUrlExists() {

		Utility.isUrlExists(this._url, (request) => {
			this.request = request;
		});

		window.setTimeout(this.checkUrlExists.bind(this), 5000)
	}
}
