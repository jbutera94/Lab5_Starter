// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const jsConfetti = new JSConfetti();

  setVolume(50);
  hornImageEvent();
  volumeSliderEvent();
  playSoundEvent(jsConfetti);
}

function hornImageEvent() {
  const hornDropdown = document.getElementById('horn-select');

  hornDropdown.addEventListener('change', function (event) {
    setHorn(event.target.value);
  });
}

function setHorn(hornName) {
  const imageUrl = `assets/images/${hornName}.svg`;
  const audioUrl = `assets/audio/${hornName}.mp3`;

  // Set image
  const imageElement = document.querySelector('header + img');
  imageElement.setAttribute('src', imageUrl);

  // Set audio source
  const audioElement = document.querySelector('audio');
  audioElement.setAttribute('src', audioUrl);
}

function volumeSliderEvent() {
  const volumeSlider = document.getElementById('volume');

  volumeSlider.addEventListener('input', function (event) {
    const volumeSliderValue = event.target.value; // out of 100
    let volumeSliderLevel = '0';

    if (volumeSliderValue > 0 && volumeSliderValue < 33) {
      volumeSliderLevel = '1';
    } else if (volumeSliderValue >= 33 && volumeSliderValue < 67) {
      volumeSliderLevel = '2';
    } else if (volumeSliderValue >= 67) {
      volumeSliderLevel = '3';
    }

    const volumeImageUrl = `assets/icons/volume-level-${volumeSliderLevel}.svg`;
    const volumeImage = document.querySelector('#volume-controls img');
    volumeImage.setAttribute('src', volumeImageUrl);

    setVolume(volumeSliderValue);
  });
}

function setVolume(volumeLevel) {
  const volumeLevelDecimal = volumeLevel / 100;
  
  // Set audio volume level
  const audioElement = document.querySelector('audio');
  audioElement.volume = volumeLevelDecimal;
}

function playSoundEvent(jsConfetti) {
  const playSoundButton = document.querySelector('button');
  
  playSoundButton.addEventListener('click', function () {
    const audioElement = document.querySelector('audio');
    if (audioElement.getAttribute('src') != '') {
      audioElement.play();
    }

    const hornDropdownValue = document.getElementById('horn-select').value;
    if (hornDropdownValue == 'party-horn' && audioElement.volume > 0) {
      jsConfetti.addConfetti();
    }
  });
}