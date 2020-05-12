const getAbsoluteBoundingRect = ((el) =>
{

    const doc  = document
    const win  = window
    const body = doc.body

    let offsetX = win.pageXOffset !== undefined ? win.pageXOffset : (doc.documentElement || body.parentNode || body).scrollLeft

    let offsetY = win.pageYOffset !== undefined ? win.pageYOffset : (doc.documentElement || body.parentNode || body).scrollTop

    const rect = el.getBoundingClientRect()

    if(el !== body && el.parent != null)
    {
        let parent = el.parentNode

        while(parent !== body)
        {
            offsetX += parent.scrollLeft
            offsetY += parent.scrollTop
            parent = parent.parentNode
        }
    }

    return {
        bottom: rect.bottom + offsetY,
        height: rect.height,
        left  : rect.left + offsetX,
        right : rect.right + offsetX,
        top   : rect.top + offsetY,
        width : rect.width
    }
})

module.exports = getAbsoluteBoundingRect
