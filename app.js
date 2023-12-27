/**
 * Date: 26/12/2023
 * Author: Md Ataullah
 * Description: Color picker application with DOM functionalities.
 */

// Golobal

const randomColorButtonSound = new Audio('./bgaudio.wav');
const copyColorButtonSound = new Audio('./copyaudio.wav');
const wrongInpSound = new Audio('./wronganswer.mp3');
wrongInpSound.volume = 0.4;
randomColorButtonSound.volume = 0.2;
copyColorButtonSound.volume = 0.2;

// Onload Function

window.onload = () => {
  main();
};

// Main Function
function main() {
  //  DOM refarences
  const ranndomeColorBtnClick = document.querySelector('.random_click');
  const ranndomeColorBtnClickBTM = document.querySelector('.random_color');

  const hexInp = document.getElementById('hex-color-code');

  const redRGBrange = document.getElementById('red-rgb-range');
  const greenRGBrange = document.getElementById('green-rgb-range');
  const blueRGBrange = document.getElementById('blue-rgb-range');

  const hexAndRgbRadio = document.getElementsByName('color_mode');

  const copyBtn = document.getElementById('copy-btn');
  copyBtn.style.width = '160px';
  copyBtn.style.textAlign = 'center';

  // Event Listeners
  ranndomeColorBtnClick.addEventListener('click', btnEventcall);
  copyBtn.innerText = 'Copy To Clipboard';
  ranndomeColorBtnClickBTM.addEventListener('click', btnEventcall);

  hexInp.addEventListener('keyup', hexCodeKeyupInput);

  redRGBrange.addEventListener(
    'change',
    colorRangeProgress(redRGBrange, greenRGBrange, blueRGBrange)
  );
  greenRGBrange.addEventListener(
    'change',
    colorRangeProgress(redRGBrange, greenRGBrange, blueRGBrange)
  );
  blueRGBrange.addEventListener(
    'change',
    colorRangeProgress(redRGBrange, greenRGBrange, blueRGBrange)
  );

  copyBtn.addEventListener('click', function () {
    const node = radioCheckedFunc(hexAndRgbRadio);
    if (node === null) {
      throw new Error('Invalid Radio Input');
    }
    if (node === 'hex') {
      const hexCode = document.getElementById('hex-color-code').value;
      if (hexCode && isValidHexCode(hexCode)) {
        navigator.clipboard.writeText(`#${hexCode}`);
      } else {
        alert(
          'Hey There, Please Input a Valid Hex Code !' + wrongInpSound.play()
        );
      }
    } else {
      const hexCode = document.getElementById('hex-color-code').value;

      const rgbCode = document.getElementById('rgb-color-code').value;

      if (hexCode && isValidHexCode(hexCode)) {
        navigator.clipboard.writeText(rgbCode);
      } else {
        alert(
          'Hey there, Please input a valid Hex color code, then copy the RGB color code !' +
            wrongInpSound.play()
        );
      }
    }
    copyBtn.style.backgroundColor = '#36687B';
    copyBtn.style.color = '#ffffff';
    copyBtn.innerText = 'Copied to clipboard';
    copyColorButtonSound.play();
  });
}

// Event Handlers

function btnEventcall() {
  const hexColor = genaretDacimalFunc();
  updateColorCodeToDOM(hexColor);
  randomColorButtonSound.play();
  const copyBtn = document.getElementById('copy-btn');
  copyBtn.innerText = 'Copy to clipboard';
  copyBtn.style.background = 'none';
  copyBtn.style.color = 'tomato';
}

function hexCodeKeyupInput(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    this.value = hexColor;
    if (isValidHexCode(hexColor)) {
      const color = hexToDacimal(hexColor);
      updateColorCodeToDOM(color);
    }
  }
}

function colorRangeProgress(redRGBrange, greenRGBrange, blueRGBrange) {
  return function () {
    const colorRange = {
      red: parseInt(redRGBrange.value),
      green: parseInt(greenRGBrange.value),
      blue: parseInt(blueRGBrange.value),
    };
    updateColorCodeToDOM(colorRange);
  };
}

// DOM Function

function updateColorCodeToDOM(color) {
  const hexColor = genaretHexColor(color);
  const RGBColor = genaretRGBColor(color);
  document.querySelector('.color').style.backgroundColor = `#${hexColor}`;
  document.getElementById('hex-color-code').value = hexColor;
  document.getElementById('rgb-color-code').value = RGBColor;
  document.getElementById('red-range-value').innerText = color.red;
  document.getElementById('red-rgb-range').value = color.red;
  document.getElementById('green-range-value').innerText = color.green;
  document.getElementById('green-rgb-range').value = color.green;
  document.getElementById('blue-range-value').innerText = color.blue;
  document.getElementById('blue-rgb-range').value = color.blue;
}

/**
 * Find the checked value from a list of radio input.
 * @param {Array} nodes
 * @returns {string / null}
 */
function radioCheckedFunc(nodes) {
  let radioCheckedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      radioCheckedValue = nodes[i].value;
      break;
    }
  }
  return radioCheckedValue;
}

// Utils Function

/**
 * Genaret and Return an object Dacimal color Values.
 * @returns {object}
 */
function genaretDacimalFunc() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return {
    red,
    green,
    blue,
  };
}

/**
 * Genaret Valid Hex Color Value
 *
 * @param {String} color
 *
 */
function genaretHexColor({ red, green, blue }) {
  const towcode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `${towcode(red)}${towcode(green)}${towcode(blue)}`;
}

/**
 * Genaret Valid RGB Volor value
 */

function genaretRGBColor({ red, green, blue }) {
  return `rgb(${red},${green},${blue})`;
}

/**
 *
 * Convert Hex To Dacimal Color code value
 * @param {string} hex
 * @returns {object}
 */

function hexToDacimal(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return {
    red,
    green,
    blue,
  };
}

/**
 *Validate Hex Color code Value
 * @param {string} color
 * @returns {boolean}
 */
function isValidHexCode(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
