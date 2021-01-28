import { loader } from '../index.js'

class FirebaseNetwork {
	constructor(url) {
		this.url = url
	}

	createPosts(obj) {
		return fetch(this.url + '/posts.json', {
			method: 'post',
			body: JSON.stringify(obj)
		})
	}

	getPosts() {
		loader.show()
		return fetch(this.url + '/posts.json')
			.then(data => {
				return data.json()
			})
			.then(response => {
				return response
			})

	}


	removePost(id) {
		return fetch(this.url + `/posts/${id}.json`, {
			method: 'delete'
		})
	}

}


export const firebaseNetwork = new FirebaseNetwork('https://todo-js-2021-default-rtdb.firebaseio.com')