// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // Wait to get past race condition when
  // populating voices
  setTimeout(function () {
    populateVoices();
    pressToTalkButtonEvent();
  }, 100);
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
    const textValue = document.getElementById('text-to-speak').value;

    const voiceDropdown = document.getElementById('voice-select');
    if (voiceDropdown.value == 'select' || textValue == '') {
      return;
    }
    
    const voiceDropdownIndex = voiceDropdown.selectedOptions[0].getAttribute('data-index');

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