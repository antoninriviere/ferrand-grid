import * as Hammer from 'hammerjs'

import MathUtils from './MathUtils.js'

export default class DragCursor
{
	constructor(options)
	{
		const winWidth = window.innerWidth
		const winHeight = window.innerHeight

		const baseOptions = {
			force: 1.5,
			interpolation: 0.1,
			direction: -1,
			width: winWidth,
			height: winHeight
		}

		this.options = Object.assign({}, baseOptions, options)

		this.force = this.options.force
		this.interpolation = this.options.interpolation

		this.limits = {}

		this.setLimits(this.options.width, this.options.height, winWidth, winHeight)

		this.drag = {
			dragging: false,
			x: 0,
			y: 0,
			start: {
				x: 0,
				y: 0
			},
			target: {
				x: 0,
				y: 0
			}
		}

		this.initHammer()

		this.addEventListeners()
	}

	/**
	 * 
	 * Events
	 */

	addEventListeners()
	{
		this.manager.on('pan', (ev) => 
		{
			this.onPan(ev)
		})

		this.manager.on('panstart', (ev) => 
		{
			this.onPanStart(ev)
		})
	}

	removeEventListeners()
	{
		this.manager.off('pan', (ev) => 
		{
			this.onPan(ev)
		})

		this.manager.off('panstart', (ev) => 
		{
			this.onPanStart(ev)
		})
	}

	/**
	 * 
	 * Init Hammer
	 */

	initHammer()
	{
		this.manager = new Hammer.Manager(this.options.elem)
    	this.manager.add(new Hammer.Pan({ threshold: 0, pointers: 0 }))
	}

	/**
	 * 
	 * Limits
	 */
	setLimits(containerWidth, containerHeight, winWidth, winHeight)
	{
		this.limits.left = 0
		this.limits.right = containerWidth - winWidth
		this.limits.top = 0
		this.limits.bottom = containerHeight - winHeight
	}

	/**
	 * 
	 * Setters
	 */

	setForce(newForce)
	{
		this.force = newForce
	}

	setInterpolation(newInterpolation)
	{
		this.interpolation = newInterpolation
	}

	/**
	 * 
	 * Events
	 */

	onResize(containerWidth, containerHeight, winWidth, winHeight)
	{
		this.setLimits(containerWidth, containerHeight, winWidth, winHeight)
	}

	onPanStart(ev)
	{
		this.drag.dragging = true
		this.drag.start.x = (ev.deltaX + this.drag.x) * this.options.direction
		this.drag.start.y = (ev.deltaY + this.drag.y) * this.options.direction
	}

	onPan(ev)
	{
		let xVal = (this.drag.start.x + ev.deltaX * this.force) * this.options.direction
		let yVal = (this.drag.start.y + ev.deltaY * this.force) * this.options.direction

		xVal = MathUtils.clamp(xVal, this.limits.left, this.limits.right)
		yVal = MathUtils.clamp(yVal, this.limits.top, this.limits.bottom)
  
		this.drag.target.x = xVal
		this.drag.target.y = yVal
  
        if(ev.isFinal)
        {
          this.drag.dragging = false
        }
	}

	onTick()
	{
		this.drag.x = MathUtils.lerp(this.drag.x, this.drag.target.x, this.interpolation)
		this.drag.x = Math.round(this.drag.x * 1000) / 1000

		this.drag.y = MathUtils.lerp(this.drag.y, this.drag.target.y, this.interpolation)
		this.drag.y = Math.round(this.drag.y * 1000) / 1000
	}
}