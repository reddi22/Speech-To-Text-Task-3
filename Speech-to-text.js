const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn');
const outputDiv = document.getElementById('output');
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

recognition.interimResults = true;
recognition.continuous = true;

startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startBtn.textContent = 'Recording...';
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
    stopBtn.disabled = true;
    startBtn.disabled = false;
    startBtn.textContent = 'Start Recording';
});

recognition.onresult = event => {
    const result = event.results[event.results.length - 1][0].transcript;
    outputDiv.textContent = result;
};

recognition.onend = () => {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    startBtn.textContent = 'Start Recording';
};

recognition.onerror = event => {
    console.error('Speech recognition error:', event.error);
};

recognition.onnomatch = () => {
    console.log('No speech was recognized.');
};