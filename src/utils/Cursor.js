export default class Cursor
{
    /**
     * Constructor
     */
    constructor()
    {
        this.x = 0
        this.y = 0

        this.fromCenter = {}
        this.fromCenter.x = 0
        this.fromCenter.y = 0

        this.ratio = {}
        this.ratio.x = 0
        this.ratio.y = 0

        this.ratio.fromCenter = {}
        this.ratio.fromCenter.x = 0
        this.ratio.fromCenter.y = 0

        this.onResize()
        
        this.addEventListeners()
    }

    addEventListeners()
    {
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this)
        this.onResize = this.onResize.bind(this)

        window.addEventListener('mousemove', this.mouseMoveHandler)
        window.addEventListener('resize', this.onResize)
    }

    removeEventListeners()
    {
        window.removeEventListener('mousemove', this.mouseMoveHandler)
        window.removeEventListener('resize', this.onResize)
    }

    destroy()
    {
        this.removeEventListeners()
    }

    /**
     * Resize
     */
    onResize()
    {
        this.winWidth = window.innerWidth
        this.winHeight = window.innerHeight
    }

    /**
     * Mouse move
     */
    mouseMoveHandler(event)
    {
        this.x = event.clientX
        this.y = event.clientY

        this.ratio.x = this.x / this.winWidth
        this.ratio.y = this.y / this.winHeight

        this.fromCenter.x = this.x - this.winWidth / 2
        this.fromCenter.y = this.y - this.winHeight / 2

        this.ratio.fromCenter.x = this.fromCenter.x / this.winWidth
        this.ratio.fromCenter.y = this.fromCenter.y / this.winHeight
    }
}
