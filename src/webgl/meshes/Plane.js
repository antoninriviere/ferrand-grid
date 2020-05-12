import { Object3D, TextureLoader, Vector2, PlaneBufferGeometry, MeshBasicMaterial, Mesh } from 'three'

import getAbsoluteBoundingRect from '../../utils/getAbsoluteBoundingRect.js'

class Plane extends Object3D {
	constructor()
	{
		super()

		this.$image = document.querySelector('.grid__img__1')
		this.$image.style.opacity = 0

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
		this.positions.set(
			0, 0
		)
	}

	createMesh()
	{
		this.geometry = new PlaneBufferGeometry(1, 1, 1)
		this.material = new MeshBasicMaterial({
			map: this.image
		})

		this.mesh = new Mesh(this.geometry, this.material)

		this.mesh.position.set(this.positions.x, this.positions.y, 0)
		this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)

		this.add(this.mesh)
	}
}

export default Plane