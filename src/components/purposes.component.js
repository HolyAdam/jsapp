import Component from './component.js'

import { labelCheckFocus } from '../functions/intfns.func'
import { labelCheckBlur } from '../functions/intfns.func'
import { labelCheckChange } from '../functions/intfns.func'
import { firebaseNetwork } from '../network/firebase.network'
import { ToArray } from '../functions/ToArray.func'

export class PurposesComponent extends Component {
	constructor(id, { loader }) {
		super(id)

		this.loader = loader
	}


	init() {
		const input = this.$el.querySelector('.input')

		input.addEventListener('focus', labelCheckFocus)

		input.addEventListener('blur', labelCheckBlur)

		input.addEventListener('change', labelCheckChange)


		input.addEventListener('input', searchElsByInput.bind(this))

		this.$el.addEventListener('click', removeTask.bind(this))

	}

	listenerHide() {

	}

	listenerShow() {

		document.querySelector('.purposes-tasks').innerHTML = ''

		this.$el.querySelector('input').value = ''

		firebaseNetwork.getPosts()
			.then(data => {

				const arr = ToArray.TransformToArray(data)

				if (arr[0] === 'Нет элементов') {
					return Promise.reject(e)
				}



				const html = arr.reverse().map(renderPost).join("")

				this.loader.hide()

				document.querySelector('.purposes-tasks').insertAdjacentHTML('afterbegin', html)

			})	

			.catch(e => {

				this.loader.hide()

				document.querySelector('.purposes-tasks').insertAdjacentHTML('afterbegin', 'Нет текущих задач')
			})
	}


}


function renderPost(obj, i) {
	if (obj.typeName === 'habit') {
		obj.typeName = 'Привычка'
	} else {
		obj.typeName = 'Цель'
	}


	return `
		<li class="purposes-task" data-id=${obj.id}>
			<div class="purpose-top">
				<div class="purpose-text">
					<span class="purpose-num">
						${i + 1}.
					</span>
					<span class="purpose-title">
						${obj.taskName}
					</span>
				</div>
				<button class="purpose-close">
					<img src="img/close.svg" alt="Закрыть">
				</button>
			</div>
			<div class="purpose-mid">
				${obj.descrName}		
			</div>
			<div class="purpose-bottom">
				<div class="purpose-bottom__tag">
				${obj.typeName}	
				</div>
				<div class="purpose-bottom__date">
					${obj.dateName}
				</div>
			</div>
		</li>
	`
}




function searchElsByInput() {

try {
	const taskElems = document.querySelectorAll('.purposes-task')



	taskElems.forEach(item => {

		item.classList.add('hide')

		if (this.$el.querySelector('.input').value.toLowerCase() === item.querySelector('.purpose-title').textContent.trim().substr(0, this.$el.querySelector('.input').value.length).toLowerCase()) {
			
			item.classList.remove('hide')
		}
	})
} catch(e) {
		alert('Элементов нет')
}

}



function removeTask() {


	if (event.target.tagName === 'BUTTON' || event.target.tagName === 'IMG') {

		const post = event.target.closest('.purposes-task')

		firebaseNetwork.removePost(post.dataset.id)
			.then(data => {
				post.remove()

			})
			
			.then(() => {
				document.querySelector('.purposes-tasks').innerHTML = '' 
			})

			.then(() => {
				firebaseNetwork.getPosts()
					.then(data => {

						const arr = ToArray.TransformToArray(data)

						if (arr[0] === 'Нет элементов') {
							return Promise.reject('abc')
						}


						const html = arr.reverse().map(renderPost).join("")



						this.loader.hide()

						this.$el.querySelector('input').value = ''

						document.querySelector('.purposes-tasks').insertAdjacentHTML('afterbegin', html)

					})


					.catch(e => {

						this.loader.hide()

						this.$el.querySelector('input').value = ''

						document.querySelector('.purposes-tasks').innerHTML = 'Нет текущих элементов'

					})


			})






	}
}



