// import lazysizes from 'https://cdn.skypack.dev/lazysizes';
// import quicklink from 'https://cdn.skypack.dev/quicklink';
// import gsap from 'https://cdn.skypack.dev/gsap';
// import Draggable from 'https://cdn.skypack.dev/gsap/Draggable';

window.addEventListener('load', () => {
	quicklink.listen()
})

const boySrc = '/media/skid-mark-web.png'
const girlSrc = '/media/girl.png'

const boy = document.querySelector('.Boy')
gsap.to(boy, {duration: 0.5, scale: 1.1, repeat: 2, delay: 1, repeatDelay: 0, yoyo: true})

let clicked = false
Draggable.create(boy, {
	inertia: true,
	bounds: 'body',
	dragResistance: 0.1,
	edgeResistance: 0.65,
	// type: 'rotation'
	// onClick: function() {
	// 	gsap.to(this.target, {rotate: '+=45'})
	// },
	onDrag() {
		if (this.hitTest('iframe', '50%')) {
			gsap.to(this.target, {autoAlpha: 0.25})
		} else {
			gsap.to(this.target, {autoAlpha: 1})
		}
	},
	onRelease() {
		gsap.to(this.target, {rotate: 'random(180, 360)'})
		this.target.src = clicked ? girlSrc : boySrc
		clicked = !clicked
	},
	onThrowComplete() {
	}
})

// Displays the menu and uses the URL to toggle active state.
const menu = [
	{href:"/", title: 'Sameheads'},
	{href:"music.html", title: 'Music'},
	{href:"fashion.html", title: 'Fashion'},
	{href:"residents.html", title: 'Residents'},
	{href:"video-art.html", title: 'Video Art'},
	{href:"headsradio.html", title: 'Heads Radio'},
	{href:"archive.html", title: 'Archive'},
	{href:"contact.html", title: 'Contact'}
]
customElements.define('same-menu', class SameheadsMenu extends HTMLElement {
	connectedCallback() {
		const active = this.getAttribute('active')
		function activeClass(href) { 
			return href.replace('.html', '') === active ? "is-active" : ''
		}
		this.innerHTML = `
			<h1 hidden>Sameheads</h1>
			<same-menu-button></same-menu-button>
			<nav>
				${menu.map(m => `<a class="${activeClass(m.href)}" href=${m.href}>${m.title}</a>`).join('')}
			</nav>
		`
	}
})

customElements.define('same-menu-button', class SameheadsMenuButton extends HTMLElement {
	handleClick(event) {
		event.preventDefault()
		const menu = this.nextElementSibling
		this.parentElement.classList.toggle('is-open')
	}
	connectedCallback() {
		this.addEventListener('click', this.handleClick.bind(this))
		this.innerHTML = `<button aria-label="Toggle Menu">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M598.07 11.93c-20.1 7.64-34.57 20.5-41 36.58-1.81 4.42-25.12 76.77-51.85 160.77L456.59 362l-34.56.6-34.57.4v96.46h-48.24v64.31H162.38v32.16h64.3v337.62h80.38V990h32.16v-96.46h144.7V990h32.16v-96.46h144.7V990h32.16v-96.46h80.38V555.92h64.3v-32.16H660.78v-64.3h-48.24V363h-20.1c-11.05 0-20.1-.4-20.1-1.21 0-.6 22.51-59.08 50.04-130.02 51.44-132.23 56.27-147.1 53.66-165.99-2.81-20.7-19.09-42.2-38.79-50.84-11.85-5.22-29.54-6.43-39.18-3.01zm32.35 33.15c10.85 5.83 14.67 14.87 13.67 31.55-.8 12.66-6.03 27.73-53.66 150.12L537.38 363h-23.71c-23.91 0-23.91 0-22.51-4.62 1.81-6.03 90.83-286.17 93.45-294.41 2.61-7.84 11.05-18.29 16.68-20.5 7.43-3.01 22.1-2.2 29.13 1.61zM443.73 395.76c0 .2-5.43 5.83-12.06 12.46l-12.06 11.86v-24.92h12.06c6.63 0 12.06.2 12.06.6zm49.24 31.55l-32.15 32.15h-34.16l32.14-32.15 32.15-32.15h34.16l-32.14 32.15zm87.41-19.69v12.66l-19.49 19.49-19.69 19.69h-34.16l32.15-32.15c22.51-22.51 33.36-32.15 36.58-32.15 4.21 0 4.61.8 4.61 12.46zm48.23 100.08v16.08H371.39v-32.16h257.22v16.08zM307.08 668.46V781h48.24v48.24h96.46V781H548.23v48.24h96.46V781h48.24V555.92h48.24v305.46H258.85V555.92h48.24v112.54zm353.69-16.07v96.46H339.23V555.93h321.54v96.46zM419.62 789.04v8.04h-32.16V781h32.16v8.04zm192.92 0v8.04h-32.16V781h32.16v8.04z"/></svg>
		</button>`
	}
})

// <a href="/"><img class="Logo" src="/media/logo-sameheads.png" alt="Sameheads"></a>

// Just the social links..
customElements.define('same-social', class SameheadsSocial extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<a target="_blank" rel="noopener" href="https://www.instagram.com/sameheads/">Instagram</a>
			<a target="_blank" rel="noopener" href="https://www.facebook.com/sameheadsberlin/">Facebook</a>
			<a target="_blank" rel="noopener" href="https://soundcloud.com/sameheads">Soundcloud</a>
			<a target="_blank" rel="noopener" href="https://sameheads.bandcamp.com/">Bandcamp</a>
			<a href="mailto:info@sameheads.com">Email</a></li>
		`
	}
})

// Give it a Wordpress REST API endpoint and it'll return the content for that post.
customElements.define('wp-content', class WpContent extends HTMLElement {
	constructor() {
		super()
		this.endpoint = 'https://cms.sameheads.com/wp-json/wp/v2/'
		this.url = this.endpoint + this.getAttribute('src')
	}
	model() {
		return fetch(this.url).then(res => res.json())
	}
	connectedCallback() {
		// this.textContent = `Loading ${this.url}`
		this.model().then(model => {
			// console.log(model)
			this.innerHTML = model.content.rendered
		})
	}
})


customElements.define('figma-image', class WpContent extends HTMLElement {
	constructor() {
		super()
	}
	model() {
		const url = 'https://api.figma.com/v1/images/' + this.getAttribute('src')
		return fetch(url, {
			headers: {
		  	'X-FIGMA-TOKEN': '141542-baf47717-5d1c-42e6-b918-c3ab6f45bf0b'
			}
		}).then(res => res.json())
	}
	connectedCallback() {
		// this.textContent = `Loading ${this.url}`
		this.model().then(model => {
			// console.log(model)
			const src = Object.values(model.images)[0]
			this.innerHTML = `<img src="${src}" alt="">`
		})
	}
})
