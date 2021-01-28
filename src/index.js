import { HeaderComponent } from './components/header.component.js'
import { TabsComponent } from './components/tabs.component.js'
import { FormComponent } from './components/form.component.js'
import { PurposesComponent } from './components/purposes.component.js'
import { LoaderComponent } from './components/loader.component.js'
import './styles/main.sass'


const data = document.querySelector('.sect__data span')

data.textContent = new Date().toLocaleDateString()


const header = new HeaderComponent('header')

const form = new FormComponent('form')

export const loader = new LoaderComponent('loader')

const purposes = new PurposesComponent('purposes', {loader})

const tabs = new TabsComponent('tabs', [...document.querySelectorAll('[data-tab]')], {
	form,
	purposes
})


const select = document.querySelector('.form-control--selected')

