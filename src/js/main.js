const blurRange = document.getElementById('blurRange'), blurValue = document.getElementById('blurVal'), borderRange = document.getElementById('outlineRange'), borderValue = document.getElementById('outlineVal'),
    opacityRange = document.getElementById('opacityRange'), opacityValue = document.getElementById('opacityVal'), radiusRange = document.getElementById('radiusRange'), radiusValue = document.getElementById('radiusVal'),
    bgColor = document.getElementById('bgColor'), borderColor = document.getElementById('borderColor')

const offsetX = document.getElementById('hShadow'), offsetY = document.getElementById('vShadow'), blurRadius = document.getElementById('bShadow'), spreadRadius = document.getElementById('sShadow'), bsColor = document.getElementById('dsColor'), opacityShadow = document.getElementById('oShadow')

const effectPreview = document.querySelector('.preview'), effectOptions = document.querySelectorAll('.effect-options input'), effectCssCode = document.getElementById('css-code')

window.onload = () => {
    resetValues()
    generateEffect()
}

/* Se llama a la función cada que el valor de los input tipo 'range' y 'color' cambian */
effectOptions.forEach(element => { element.addEventListener('input', () => { generateEffect() }) });
bgColor.addEventListener('change', () => { generateEffect() })
borderColor.addEventListener('change', () => { generateEffect() })

/* Genera el efecto y el código CSS */
const generateEffect = () => {
    let blurCode = `${blurRange.value != 0 ? `blur(${blurRange.value}px)` : ''}`
    let borderCode = `${borderRange.value != 0 ? `${borderRange.value}px solid ${borderColor.value.toUpperCase()}` : '' }`
    let bgColorCode = hexColorToRgba(bgColor.value, opacityRange.value)
    let radiusCode = `${radiusRange.value != 0 ? `${radiusRange.value}%` : ''}`
    let bsCode = ( offsetX.value != 0 || offsetY.value != 0 || blurRadius.value != 0 || spreadRadius.value != 0 ) 
        ? `${offsetX.value}px ${offsetY.value}px ${blurRadius.value}px ${spreadRadius.value}px ${hexColorToRgba(bsColor.value, opacityShadow.value)}` : ''

    effectPreview.style.backdropFilter = blurCode
    effectPreview.style.background = bgColorCode
    effectPreview.style.border = borderCode
    effectPreview.style.borderRadius = radiusCode

    effectPreview.style.boxShadow = bsCode

    const lines = []

    if (blurCode) lines.push(`backdrop-filter: ${blurCode}; -webkit-backdrop-filter: ${blurCode};`)
    lines.push(`background-color: ${bgColorCode};`) 
    
    if (borderCode) lines.push(`border: ${borderCode};`)    
    
    if(radiusCode) lines.push(`\nborder-radius: ${radiusCode}; //opcional`)    

    if(bsCode) lines.push(`box-shadow: ${offsetX.value}px ${offsetY.value}px ${blurRadius.value}px ${spreadRadius.value}px ${hexColorToRgba(bsColor.value, opacityShadow.value)}; // opcional`) //! aqui van los valores de los input de box-shadow y van en 1 if

    effectCssCode.textContent = lines.join('\n')
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
    blurRange.value = blurValue.value = radiusRange.value = radiusValue.value = 5
    borderRange.value = borderValue.value = offsetX.value = offsetY.value = spreadRadius.value = 0
    blurRadius.value = 10
    opacityShadow.value = 1
    opacityRange.value = opacityValue.value = 0.35    
    bgColor.value = borderColor.value = '#F9DC5C'
    bsColor.value = "#000"
    
}