async function downloadVideo() {
    const videoURL = document.getElementById('videoURL').value;
    const quality = document.getElementById('quality').value;
    const message = document.getElementById('message');

    if (!videoURL) {
        message.textContent = 'Please enter a valid YouTube video URL.';
        return;
    }

    try {
        // Fetch video info
        const backendURL = "https://youtube-downloader-backend.onrender.com"; // Replace with your Render backend URL
        const infoResponse = await fetch(`${backendURL}/video-info?url=${encodeURIComponent(videoURL)}`);
        const info = await infoResponse.json();

        if (info.error) {
            throw new Error(info.error);
        }

        // Download video
        const downloadURL = `${backendURL}/download?url=${encodeURIComponent(videoURL)}&quality=${quality}`;
        window.location.href = downloadURL;
    } catch (err) {
        message.textContent = `Error: ${err.message}`;
    }
}
