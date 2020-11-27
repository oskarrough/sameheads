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
	{href:"archive.html", title: 'Archive'},
	{href:"headsradio.html", title: 'Heads Radio'},
	{href:"contact.html", title: 'Contact'}
]
customElements.define('same-menu', class SameheadsMenu extends HTMLElement {
	connectedCallback() {
		const active = this.getAttribute('active')
		function isActive(href) { 
			return href.replace('.html', '') === active ? "is-active" : ''
		}
		this.innerHTML = `
			<h1 hidden>Sameheads</h1>
			<nav>
				${menu.map(m => `<a class="${isActive(m.href)}" href=${m.href}>${m.title}</a>`).join('')}
			</nav>
		`
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
