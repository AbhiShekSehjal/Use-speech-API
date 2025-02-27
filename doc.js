function startSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support Speech Recognition. Please try a modern browser like Chrome.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const textarea = document.getElementById('textarea');
    const button = document.querySelector('button');

    // Disable button during recognition
    button.disabled = true;
    button.textContent = "Listening...";

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        textarea.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error(`Error occurred: ${event.error}`);
        if (event.error === 'aborted') {
            alert("Speech recognition was interrupted. Please try again.");
        }
    };

    recognition.onend = () => {
        // Re-enable the button when recognition ends
        button.disabled = false;
        button.textContent = "Click to Speak";
    };
}