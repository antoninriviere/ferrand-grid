import { Object3D, TextureLoader, Vector2, PlaneBufferGeometry, MeshBasicMaterial, Mesh } from 'three'

import getAbsoluteBoundingRect from '../../utils/getAbsoluteBoundingRect.js'

class Plane extends Object3D {
	constructor(options)
	{
		super()

		this.$image = document.querySelector(options.selector)
		this.$image.style.opacity = 0.1

		this.loader = new TextureLoader()

		this.image = this.loader.load(this.$image.src)

		this.sizes = new Vector2()
		this.positions = new Vector2()

		this.getSizes()

		this.createMesh()
	}

	getSizes()
	{
		const imgBounds = getAbsoluteBoundingRect(this.$image)

		this.sizes.set(imgBounds.width, imgBounds.height)

		const originX = -window.innerWidth / 2 + imgBounds.width / 2
		const originY = window.innerHeight / 2 - imgBounds.height / 2

		const posX = originX + imgBounds.left
		const posY = originY - imgBounds.top

		this.positions.set(
			posX, posY
		)
	}

	createMesh()
	{
		this.geometry = new PlaneBufferGeometry(1, 1, 1)
		this.material = new MeshBasicMaterial({
			map: this.image
		})

		this.mesh = new Mesh(this.geometry, this.material)

		this.position.set(this.positions.x, this.positions.y, 0)
		this.scale.set(this.sizes.x, this.sizes.y, 1)

		this.add(this.mesh)
	}
}

export default Plane