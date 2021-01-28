import Component from './component'

import { labelCheckFocus } from '../functions/intfns.func'
import { labelCheckBlur } from '../functions/intfns.func'
import { labelCheckChange } from '../functions/intfns.func'
import { firebaseNetwork } from '../network/firebase.network'

export class FormComponent extends Component {
	constructor(id) {
		super(id)
	}


	init() {

		this.$el.elements.name.addEventListener('focus', labelCheckFocus)

		this.$el.elements.name.addEventListener('blur', labelCheckBlur)

		this.$el.elements.name.addEventListener('change', labelCheckChange)

		this.$el.elements.descr.addEventListener('focus', labelCheckFocus)

		this.$el.elements.descr.addEventListener('blur', labelCheckBlur)

		this.$el.elements.descr.addEventListener('change', labelCheckChange)

		this.$el.elements.btn.addEventListener('click', btnHandler.bind(this))

	}

}



function btnHandler() {

	let trueInt1 = false, trueInt2 = false

	event.preventDefault()

	clearError.call(this)

	if (this.$el.elements.name.value.length < 2) {
		setError.call(this, this.$el.elements.name)

		trueInt1 = true

	}

	if (this.$el.elements.descr.value.length < 4) {
		setError.call(this, this.$el.elements.descr)

		trueInt2 = true
	}

	if (trueInt1 || trueInt2) {
		return 'Ошибка'
	}

	const obj = {
		taskName: this.$el.elements.name.value,
		descrName: this.$el.elements.descr.value,
		typeName: this.$el.elements.std.value,
		dateName: new Date().toLocaleDateString()
	}


	firebaseNetwork.createPosts(obj)
		.then(data => {
			clearForm.call(this)

			this.$el.querySelectorAll('label').forEach(item => {
				item.classList.remove('active')
			})	
		})
		.catch(e => {
			alert('Ошибка')
		})


}


function setError(int) {
	int.classList.add('error')
	int.previousElementSibling.classList.add('error')
}

function clearError() {
	document.querySelectorAll('.error').forEach(item => {
		item.classList.remove('error')
	})
}


function clearForm() {
	this.$el.elements.name.value = ''
	this.$el.elements.descr.value = ''
}






