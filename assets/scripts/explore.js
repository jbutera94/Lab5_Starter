// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  populateVoices();
  pressToTalkButtonEvent();
}

function populateVoices() {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const voiceDropdown = document.getElementById('voice-select');

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    option.value = voices[i].name;
    voiceDropdown.appendChild(option);
    option.setAttribute('data-index', i);
  }
}

function pressToTalkButtonEvent() {
  const pressToTalkButton = document.querySelector('button');
  pressToTalkButton.addEventListener('click', function () {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    const voiceDropdownIndex = document.getElementById('voice-select').selectedOptions[0].getAttribute('data-index');
    const textValue = document.getElementById('text-to-speak').value;

    const utterThis = new SpeechSynthesisUtterance(textValue);
    utterThis.voice = voices[voiceDropdownIndex];


    const imageElement = document.querySelector('img');
    imageElement.setAttribute('src','assets/images/smiling-open.png');

    utterThis.addEventListener('end', function () {
      const imageElement = document.querySelector('img');
      imageElement.setAttribute('src','assets/images/smiling.png');

    });

    synth.speak(utterThis);
  });
  
}