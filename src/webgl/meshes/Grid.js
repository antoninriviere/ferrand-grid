import { Object3D } from 'three'

import GUI from '../utils/GUI.js'

import Plane from './Plane.js'

class Grid extends Object3D {
	constructor()
	{
		super()

		this.initPlanes()

		this.initGUI()
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

	/**
	 * 
	 * Init GUI
	 */

	initGUI()
	{
		this.position.range = [-100, 100]

		GUI.panel
			.addSlider(this.position, 'z', 'range')
	}
}

export default Grid