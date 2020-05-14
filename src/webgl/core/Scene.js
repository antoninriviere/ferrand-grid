import {Scene, PerspectiveCamera, WebGLRenderer, Vector3} from 'three'

import Stats from 'stats-js'

import OrbitControls from 'orbit-controls'

import { EffectComposer, RenderPass } from 'postprocessing'

class SceneObj extends Scene {
  constructor (options) {
    super()

    const defaultOptions = {
      camera: {
        perspective: 800,
        near: 1,
        far: 1000
      },
      renderer: {
        antialias: false,
        alpha: true
      },
      debug: {
        stats: true,
        orbitControls: false
      },
      postProcessing: {
        active: false
      }
    }

    this.options = {...defaultOptions, ...options}

    this.container = this.options.container

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.renderer = new WebGLRenderer(this.options.renderer)

    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.container.appendChild(this.renderer.domElement)

    this.initCamera()

    if (this.options.postProcessing) {
      this.initPostProcessing()
    }

    if (this.options.debug.stats) {
      this.initStats()
    }

    if (this.options.debug.orbitControls) {
      this.initControls()
    }
  }

  initCamera()
  {
    const fov = (180 * (2 * Math.atan(this.height / 2 / this.options.camera.perspective))) / Math.PI

    this.camera = new PerspectiveCamera(fov, this.width / this.height, this.options.camera.near, this.options.camera.far)
    this.camera.position.set(0, 0, this.options.camera.perspective)
  }

  initControls()
  {
    this.controls = new OrbitControls({
      position: this.camera.position.toArray(),
      parent: this.renderer.domElement
    })
    this.target = new Vector3()
    this.camera.lookAt(this.target)
  }

  initStats()
  {
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.left = '0px'
    this.stats.domElement.style.top = '0px'

    this.container.appendChild(this.stats.domElement)
  }

  initPostProcessing () {
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this, this.camera))

    this.passes = []

    this.options.postProcessing.passes.map(pass => {
      if (pass.active) {
        const passObject = pass.constructor()
        passObject.renderToScreen = pass.active
        this.composer.addPass(passObject)
      }
    })
  }

  render () {
    if (this.options.debug.orbitControls) {
      this.controls.update()
      this.camera.position.fromArray(this.controls.position)
      this.camera.up.fromArray(this.controls.up)
      this.camera.lookAt(this.target.fromArray(this.controls.direction))
    }

    if (this.options.postProcessing.active) {
      this.composer.render()
    } else {
      this.renderer.render(this, this.camera)
    }

    if (this.options.debug.stats) {
      this.stats.update()
    }
  }

  resize (newWidth, newHeight) {
    this.camera.aspect = newWidth / newHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(newWidth, newHeight)

    if (this.composer) {
      this.composer.setSize(newWidth, newHeight)
    }
  }
}

export default SceneObj