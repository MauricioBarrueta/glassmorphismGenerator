const blurRange = document.getElementById('blurRange'), blurValue = document.getElementById('blurVal'), outlineRange = document.getElementById('outlineRange'), outlineValue = document.getElementById('outlineVal'),
    opacityRange = document.getElementById('opacityRange'), opacityValue = document.getElementById('opacityVal'), bgColor = document.getElementById('bgColor')
const effectPreview = document.querySelector('.preview'), effectOptions = document.querySelectorAll('.effect-options input'), effectCssCode = document.getElementById('css-code')

window.onload = () => {
    resetValues()
    generateEffect()
}

/* Se llama a la función cada que el valor de los input tipo 'range' y 'color' cambian */
effectOptions.forEach(element => { element.addEventListener('input', () => { generateEffect() }) });
bgColor.addEventListener('change', () => { generateEffect() })

/* Genera el efecto y el código CSS */
const generateEffect = () => {
    let blurCode = `${blurRange.value != 0 ? ` blur(${blurRange.value}px)` : ''}`
    let borderCode = `${outlineRange.value != 0 ? `${outlineRange.value}px solid ${bgColor.value}` : '' }`
    let bgColorCode = hexColorToRgba(bgColor.value, opacityRange.value)

    effectPreview.style.backdropFilter = blurCode
    effectPreview.style.background = bgColorCode
    effectPreview.style.outline = borderCode
    effectCssCode.textContent = `${blurCode != '' ? (`backdrop-filter: ${blurCode};\t-webkit-backdrop-filter: ${blurCode};`) : ''}${borderCode != '' ? `\noutline: ${borderCode};` : ''}\nbackground-color: ${bgColorCode};\n\nbox-shadow:  0px 0px 10px 0px rgba(0, 0, 0, 1); /* propiedad opcional */`
}

/* Transforma el color hexadecimal al modelo RGB */
const hexColorToRgba = (color, alpha) => {
    const r = parseInt(color.substr(1, 2), 16), g = parseInt(color.substr(3, 2), 16), b = parseInt(color.substr(5, 2), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const copyCodeBtn = document.querySelector('.copy-btn')
copyCodeBtn.addEventListener('click', () => {
    effectCssCode.select()
    effectCssCode.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(effectCssCode.value)
})

const resetValues = () => {
    blurRange.value = blurValue.value = 5
    outlineRange.value = outlineValue.value = 0
    opacityRange.value = opacityValue.value = 0.35
    bgColor.value = '#F9DC5C'
}