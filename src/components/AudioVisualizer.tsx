import React, { useRef, useEffect } from "react";

export default function AudioVisualizer() {
  const audioElement = useRef(null);
  const canvas = useRef(null);
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let canvasCtx = null;
  let source = null;
  let analyser = null;

  useEffect(() => {
    canvasCtx = canvas.current.getContext("2d");
  }, []);

  useEffect(() => {
    if (source) {
      source.disconnect();
    }
    source = audioCtx.createMediaElementSource(audioElement.current);
    analyser = audioCtx.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const renderFrame = () => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      // Use the dataArray to draw your visualizations
      // ...

      requestAnimationFrame(renderFrame);
    };

    audioElement.current.addEventListener("play", () => {
      renderFrame();
    });

    return () => {
      audioElement.current.removeEventListener("play", renderFrame);
      source.disconnect();
      analyser.disconnect();
    };
  }, []);

  return (
    <div>
      <audio ref={audioElement} src="your-audio-file.mp3" />
      <canvas ref={canvas} width="600" height="200" />
    </div>
  );
}
