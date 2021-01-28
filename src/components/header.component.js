import Component from './component.js'

export class HeaderComponent extends Component {
	constructor(id) {
		super(id)
	}

	init() {

		if (localStorage.getItem('notFirstVisit')) {
			this.hide()

			document.querySelector('.sect').classList.remove('hide')
		}

		const btn = document.querySelector('.header-content__btn')

		btn.addEventListener('click', btnHandlerBegin.bind(this))
	}
}


function btnHandlerBegin() {

	localStorage.setItem('notFirstVisit', true)

	this.hide()

	document.querySelector('.sect').classList.remove('hide')

}