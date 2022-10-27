const colors = [
    '#bf616a',
    '#a3be8c',
    '#ebcb8b',
    '#8fa1b3',
    '#b48ead',
    '#96b5b4'
]

export function getColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}