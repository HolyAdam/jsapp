import Component from './component.js'

export class TabsComponent extends Component {
	constructor(id, tabs, sections) {
		super(id)

		this.tabs = tabs

		this.sections = sections
	}

	init() {
		this.$el.addEventListener('click', tabsHandlerClick.bind(this))
	}
}


function tabsHandlerClick(e) {
	if (e.target.dataset.tab) {
		this.tabs.forEach(tab => tab.classList.remove('sect-tabs__link--active'))

		e.target.classList.add('sect-tabs__link--active')

		for (const section in this.sections) {
			this.sections[section].hide()
		}  

		this.sections[e.target.dataset.tab].show()



	}
}