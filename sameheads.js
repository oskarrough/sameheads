const boy = document.querySelector('.Boy')

// gsap.from(boy, {x: '-120%', delay: 0.5})

Draggable.create(boy, {
	inertia: true,
	// bounds: '.Header',
	dragResistance: 0.1,
	onClick: function() {
		gsap.to(this.target, {rotate: 'random(0, 360)'})
		// gsap.to(this.target, {rotate: '+=45'})
	}
	,onDrag() {
		if (this.hitTest('.Figma')) {
			gsap.to(this.target, {autoAlpha: 0.25})
		} else {
			gsap.to(this.target, {autoAlpha: 1})
		}
	}
	// edgeResistance: 0.65,
	// type: 'rotation'
})

// interact(boy)
//   .draggable({
//     inertia: true
//   })
//   .resizable({
//     inertia: {
//       resistance: 30,
//       minSpeed: 200,
//       endSpeed: 100
//     }
//   })

// const position = {x: 0, y: 0}
// interact(boy).draggable({
// 	inertia: true,
// cursorChecker: (action, interactable, element, interacting) => {
// 	switch (action.axis) {
// 		case 'x': return 'ew-resize'
// 		case 'y': return 'ns-resize'
// 		default: return interacting ? 'grabbing' : 'grab'
// 	}
// }
// 	modifiers: [
// 		interact.modifiers.restrictRect({
// 			restriction: 'parent'
// 		})
// 	],
//   listeners: {
//     // start (event) {
//     //   console.log(event.type, event.target)
//     // },
//     move (event) {
//       position.x += event.dx
//       position.y += event.dy
//       event.target.style.transform =
//         `translate(${position.x}px, ${position.y}px)`
//     },
//   }
// })
