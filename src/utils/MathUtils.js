const MathUtils = {

    clamp(value, min, max)
    {
        return Math.max(min, Math.min(max, value))
    },

    lerp(x, y, t)
    {
        return (1 - t) * x + t * y
    },

    linearRange(oldVal, oldMin, oldMax, newMin, newMax)
    {
        return (((oldVal - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin
    }
}

export default MathUtils