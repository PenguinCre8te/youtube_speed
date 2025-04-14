// Get the slider and speed value display
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

// Update the display and execute in console when slider changes
speedSlider.addEventListener('input', () => {
    const playbackRate = speedSlider.value;
    speedValue.textContent = playbackRate + 'x';

    // Execute this in the context of the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (rate) => {
                document.querySelectorAll('video').forEach(video => {
                    video.playbackRate = rate;
                });
            },
            args: [parseFloat(playbackRate)]
        });
    });
});