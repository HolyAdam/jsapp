import { setMiniLabel } from './setlabel.func'

export function labelCheckFocus() {

	setMiniLabel.call(this)
}


export function labelCheckBlur() {

	if (this.value === '' && this.value.trim() === '') {
		this.parentElement.querySelector('label').classList.remove('active')

		return;
	}
}


export function labelCheckChange() {

	if (this.value === '' && this.value.trim() === '') {
		this.parentElement.querySelector('label').classList.remove('active')

		return;
	}
}
