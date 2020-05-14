import { Object3D } from 'three'

import Plane from './Plane.js'

class Grid extends Object3D {
	constructor()
	{
		super()

		this.initPlanes()
	}

	/**
	 * 
	 * Init planes with images
	 */

	initPlanes()
	{
		this.planes = []

		const gridImages = document.querySelectorAll('.grid__img')

		for(let i = 1; i <= gridImages.length; i++)
		{
			const opt = {
				selector: `.grid__img__${i}`
			}
			const plane = new Plane(opt)
			this.add(plane)

			this.planes.push(plane)
		}
	}
}

export default Grid