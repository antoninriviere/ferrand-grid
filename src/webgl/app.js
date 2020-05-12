import gsap from 'gsap'

import { AmbientLight } from 'three'

import SceneObj from './core/Scene.js'

import Config from './config/index.js'

import Plane from './meshes/Plane.js'

class App {
  constructor (container) {
    this.scene = new SceneObj({
      container: container,
      ...Config
    })

    this.container = container

    this.DELTA_TIME = 0
    this.LAST_TIME = Date.now()

    // this.initMeshes()
    this.initLights()
    this.addListeners()
  }

  initMeshes () {
	this.plane = new Plane()
	this.scene.add(this.plane)
  }

  initLights () {
    this.ambientLight = new AmbientLight(0xffffff, 2)
    this.scene.add(this.ambientLight)
  }

  addListeners () {
    window.addEventListener('resize', this.onResize.bind(this))
    console.log(gsap.ticker)
    gsap.ticker.add(this.update.bind(this))
  }

  update () {
    this.DELTA_TIME = Date.now() - this.LAST_TIME
    this.LAST_TIME = Date.now()

    this.scene.render()
  }

  onResize () {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.scene.resize(this.width, this.height)
  }
}

export default App
