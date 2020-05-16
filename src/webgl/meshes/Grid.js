import { Object3D } from 'three'

import Cursor from '../../utils/Cursor.js'
import getAbsoluteBoundingRect from '../../utils/getAbsoluteBoundingRect.js'

import GUI from '../utils/GUI.js'

import Plane from './Plane.js'
import DragCursor from '../../utils/DragCursor.js'

class Grid extends Object3D {
	constructor()
	{
		super()

		this.addEventListeners()

		this.initGrid()

		this.initPlanes()

		this.initGUI()

		// init cursor
		this.cursor = new Cursor()

		const options = {
			elem: document.querySelector('.app'),
			direction: -1,
			height: this.gridBounds.height,
			width: this.gridBounds.width,
		}
		this.dragCursor = new DragCursor(options)
	}

	/**
	 * 
	 * Event listeners
	 */

	addEventListeners()
	{
		// this.onScroll = this.onScroll.bind(this)
		// document.addEventListener('scroll', this.onScroll)
	}

	/**
	 * 
	 * Remove Event listeners
	 */

	removeEventListeners()
	{

	}

	/**
	 * 
	 * Init grid elem and webgl
	 */

	initGrid()
	{
		this.$grid = document.querySelector('.grid')
		this.gridBounds = getAbsoluteBoundingRect(this.$grid)
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

	/**
	 * 
	 * Events
	 */

	// onScroll(ev)
	// {
	// 	console.log(window.pageXOffset, window.pageYOffset)

	// 	this.position.x = -window.pageXOffset
	// 	this.position.y = window.pageYOffset
	// }

	onResize()
	{

	}

	onTick()
	{
		this.dragCursor.onTick()

		this.position.x = -this.dragCursor.drag.x
		this.position.y = this.dragCursor.drag.y
	}
}

export default Grid