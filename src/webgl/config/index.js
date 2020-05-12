// import { GlitchPass } from 'postprocessing'

export default {
  debug: {
    stats: true,
    orbitControls: false
  },
  postProcessing: {
    active: false,
    passes: [
      // {
      //   name: 'glitchPass',
      //   active: true,
      //   constructor: () => {
      //     return new GlitchPass({})
      //   }
      // }
    ]
  }
}