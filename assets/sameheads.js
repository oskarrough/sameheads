const boy = document.querySelector('.Boy')

const boySrc = 'media/skid-mark-web.png'
const girlSrc = 'media/girl.png'

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
