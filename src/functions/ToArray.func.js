export class ToArray {

	static TransformToArray(obj) {

		try {

			const arr = []


			obj = obj || {false: 'Нет элементов'}

			Object.keys(obj).forEach(item => {
				obj[item].id = item
				arr.push(obj[item])		
			})

			return arr;

		} catch(e) {
			return ['Нет элементов']
		}

	}

}