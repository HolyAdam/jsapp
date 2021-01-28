export default class Component {
	constructor(id) {
		this.$el = document.getElementById(id)

		this.init()
	}

	init() {
		
	}


	hide() {
		this.$el.classList.add('hide')

		this.listenerHide()
	}

	show() {
		this.$el.classList.remove('hide')

		this.listenerShow()
	}

	listenerShow() {
		
	}

	listenerHide() {
		
	}

}