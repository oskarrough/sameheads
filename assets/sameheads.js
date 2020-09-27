const boy = document.querySelector('.Boy')

const boySrc = '/media/skid-mark-web.png'
const girlSrc = '/media/girl.png'

// gsap.from(boy, {x: '-120%', delay: 0.5})

let clicked = false
Draggable.create(boy, {
	inertia: true,
	bounds: 'body',
	dragResistance: 0.1,
	edgeResistance: 0.65,
	// type: 'rotation'
	onClick: function() {
		gsap.to(this.target, {rotate: '+=45'})
	},
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

const menu = [
	{href:"/", title: 'Sameheads'},
	{href:"music.html", title: 'Music'},
	{href:"fashion.html", title: 'Fashion'},
	{href:"residents.html", title: 'Residents'},
	{href:"archive.html", title: 'Sameheads Archive'},
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
			<nav class="Nav">
				${menu.map(m => `<a class="${isActive(m.href)}" href=${m.href}>${m.title}</a>`).join('')}
			</nav>
		`
	}
})

customElements.define('same-social', class SameheadsSocial extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class="Social">
				<a target="_blank" href="https://www.instagram.com/sameheads/">Instagram</a>
				<a target="_blank" href="https://www.facebook.com/sameheadsberlin/">Facebook</a>
				<a target="_blank" href="https://soundcloud.com/sameheads">Soundcloud</a>
				<a target="_blank" href="https://sameheads.bandcamp.com/">Bandcamp</a>
				<a href="mailto:info@sameheads.com">Email</a></li>
			</div>
		`
	}
})

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
			console.log(model)
			this.innerHTML = model.content.rendered
		})
	}
})
