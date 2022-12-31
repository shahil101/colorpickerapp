/**
 * Date : 31/12/22
 * Author: FreelancerShakil
 * Freelancer.com : https://www.freelancer.com/u/developersshakil
*/

// Globals
let toastContainer = null;

const defaultColor = {
	red: 221,
	green: 222,
	blue: 238
}

// Step 1 - create onload handler
window.onload = () => {
	main();
	updateColorCodeToDom(defaultColor)
};

// Main or boot function this function will take care of getting all the DOM reference
function main() {
	// DOM References
	const generateRandomColorBtn = document.getElementById('generate-random-color')
	const colorModeHexInp = document.getElementById('input-hex')
	const colorSliderRed = document.getElementById('color-slider-red')
	const colorSliderGreen = document.getElementById('color-slider-green')
	const colorSliderBlue = document.getElementById('color-slider-blue')
	const copyToClipboardBtn = document.getElementById('copy-to-clipboard')
	

	// Events Listers
	generateRandomColorBtn.addEventListener('click', handleGenerateRandomColor);
	colorModeHexInp.addEventListener('keyup', handleColorModeHexInp);
	colorSliderRed.addEventListener('change', handeColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue))

	colorSliderGreen.addEventListener('change', handeColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue))

	colorSliderBlue.addEventListener('change', handeColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue))

	copyToClipboardBtn.addEventListener('click', handleCopyToClipboardBtn)
	

	// copyBtn.addEventListener('click', function () {
	// 	navigator.clipboard.writeText(`#${output.value}`);
	// 	if (div !== null) {
	// 		div.remove();
	// 		div = null;
	// 	}
	// 	if (isValidHex(output.value)) {
	// 		generateToastMessage(`#${output.value} copied`);
	// 	} else {
	// 		alert('Invalid Color Code');
	// 	}
	// });

	// copyBtn2.addEventListener('click', function(){
	// 	navigator.clipboard.writeText(output2.value)
	// 	generateToastMessage(`${output2.value} copied!`)
	// })

	
}


// event handler
function handleGenerateRandomColor() {
		const color = generateColorDecimal()
		updateColorCodeToDom(color)
	}

function handleColorModeHexInp(e){
	const hexColor = e.target.value;
		if (hexColor) {
			this.value = hexColor.toUpperCase();
			console.log(hexColor)
			if (isValidHex(hexColor)) {
				const colorDecimal = hexToDecimalsColor(hexColor)
				updateColorCodeToDom(colorDecimal)
			}else if(hexColor.length > 6){
				alert("Please Don't Type Anything Else!")
			}
		}
}

function handeColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue){
		return function(){
			const color = {
			red: parseInt(colorSliderRed.value),
			green: parseInt(colorSliderGreen.value),
			blue: parseInt(colorSliderBlue.value)
		}
		updateColorCodeToDom(color)
		}
	}

	function handleCopyToClipboardBtn(){
		const colorModeRadios = document.getElementsByName('color-mode')
		const mode = getCheckedValuesFormRadios(colorModeRadios)
		if(mode == null){
			throw new Error('Invalid Radio Input')
		}
		if (toastContainer !== null) {
			toastContainer.remove();
			toastContainer = null;
		}
		if(mode == 'hex'){
			const hexColor = document.getElementById('input-hex').value
			if(isValidHex(hexColor)){
				navigator.clipboard.writeText(`#${hexColor}`);
				generateToastMessage(`#${hexColor} copied!`)
			}else{
				alert('Invalid Hex Code!')
			}
			
		}else{
			const rgbColor = document.getElementById('input-rgb').value
			if(rgbColor){
				navigator.clipboard.writeText(rgbColor);
				generateToastMessage(`${rgbColor}`)
			}else{
				alert('Invalid RGB Color!')
			}
		}
	
	}
// DOM functions

// step 2 - Toast message generator function

function generateToastMessage(msg) {
	toastContainer = document.createElement('div');
	toastContainer.innerText = msg;
	toastContainer.className = 'toast-message toast-message-slide-in';

	toastContainer.addEventListener('click', function () {
		toastContainer.classList.remove('toast-message-slide-in');
		toastContainer.classList.add('toast-message-slide-out');

		toastContainer.addEventListener('animationend', function () {
			toastContainer.remove();
			toastContainer = null;
		});
	});

	document.body.appendChild(toastContainer);
}

/**
 * Find the checked elements form a list of radios
 * @param {Array} nodes 
 * @returns {string / null}
 */
function getCheckedValuesFormRadios(nodes){
	let checkedValue = null;
	for(let i = 0; i < nodes.length; i++){
		if(nodes[i].checked){
			checkedValue = nodes[i].value
			break
		}
	}
	return checkedValue;
}

/**
 * Update Dom element with calculate color values
 * @param {object} color 
 */
function updateColorCodeToDom(color){
	const hexColor = `${generateHexColor(color)}`
	const rgbColor = generateRGBColor(color)
	
	document.getElementById('input-rgb').value = rgbColor
	document.getElementById('input-hex').value = hexColor
	document.getElementById('color-display').style.backgroundColor = `#${hexColor}`
	document.getElementById('color-slider-red').value = color.red
	document.getElementById('color-slider-red-label').innerText = color.red
	document.getElementById('color-slider-green').value = color.green
	document.getElementById('color-slider-green-label').innerText = color.green
	document.getElementById('color-slider-blue').value = color.blue
	document.getElementById('color-slider-blue-label').innerText = color.blue

	


}


// utils function


/**
 * generate and returns an object of three color decimals values
 * @returns {object}
 */
function generateColorDecimal(){
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return{
		red, 
		green, 
		blue
	}
}


/**
 * Take color object of three decimal values and return a hexadecimal color code
 * @param {color} 
 * @returns {string}
 */
function generateHexColor({red, green, blue}) {
	
	const getTwoCode = (value) =>{
		const hex = value.toString(16)
		return hex.length == 1 ? `0${hex}` : hex
	}

	return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}

/**
 * covnert hex color to three decimals values an object
 * @param {color} 
 * @returns {object}
 */
function hexToDecimalsColor(hex){
	const red = parseInt(hex.slice(0, 2), 16)
	const green = parseInt(hex.slice(2, 4), 16)
	const blue = parseInt(hex.slice(4), 16)

	return {
		red,
		green,
		blue
	}
}


// generate RGB color function
function generateRGBColor({red, green, blue}){
	return `rgb(${red}, ${green}, ${blue})`
}


/**
 * validate hex color code
 * @param {string} color  ;
 * @returns {boolean}
 */
function isValidHex(color) {
	if (color.length !== 6) return false;
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}
