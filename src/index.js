import App from './webgl/app.js'

const initApp = () => {
	const $el = document.querySelector('.app')
	const app = new App($el)
}

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))
{
	initApp()
}
else 
{
	document.addEventListener("DOMContentLoaded", initApp)
}