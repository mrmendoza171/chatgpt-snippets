
import React, { useState, useRef } from 'react';
import AudioPlayer from 'react-audio-player';

const MusicPlayer = (props: any) => {
  // Load the image into an Image object
  const image = new Image();
  image.src = "./src/components/image.jpg";

  // Create a canvas element and get its 2D context
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // When the image has finished loading, draw it to the canvas
  // and calculate the dominant color
  image.onload = function () {
    // Set the canvas size to the same as the image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image to the canvas
    ctx.drawImage(image, 0, 0);

    // Get the image data from the canvas
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const pixels = imageData.data;

    // Store the RGB values of the dominant color
    let dominantColor = { r: 0, g: 0, b: 0 };
    let dominantCount = 0;

    // Iterate through all the pixels and find the dominant color
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      // Ignore transparent pixels
      if (a === 0) {
        continue;
      }

      // Update the dominant color and its count if necessary
      const count = [r, g, b].reduce((acc, val) => acc + val, 0);
      if (count > dominantCount) {
        dominantCount = count;
        dominantColor = { r, g, b };
      }
    }

    console.log(dominantColor); // { r: 255, g: 0, b: 0 } (for example)
  };


  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audio = useRef(null);

  const songEx = "../src/data/songs/test.mp3";

  const handlePlay = () => {
    setPlaying(true);
    audio.current.play();
  };

  const handlePause = () => {
    setPlaying(false);
    audio.current.pause();
  };

  const handleSkip = (direction) => {
    let time = currentTime;
    if (direction === "backward") {
      time = Math.max(0, time - 10);
    } else {
      time = Math.min(duration, time + 10);
    }
    setCurrentTime(time);
    audio.current.currentTime = time;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audio.current.duration);
  };

  return (
    <div>
      <AudioPlayer
        src={songEx}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        ref={audio}
      />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={() => handleSkip("backward")}>Rewind</button>
      <button onClick={() => handleSkip("forward")}>Fast Forward</button>
      <div>
        {currentTime} / {duration}
      </div>
    </div>
  );
}

export default MusicPlayer;