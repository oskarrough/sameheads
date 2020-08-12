const boy = document.querySelector('#boy')

Draggable.create(boy, {
	inertia: true,
	bounds: 'body',
	dragResistance: 0.2,
	// edgeResistance: 0.65,
	// type: 'rotation'
})
