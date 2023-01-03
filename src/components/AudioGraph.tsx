import React, { useRef, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function AudioGraph() {
  const audioElement = useRef(null);
  const [data, setData] = useState({});

  useEffect(() => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function getAudioData() {
      requestAnimationFrame(getAudioData);
      analyser.getByteTimeDomainData(dataArray);
      setData({
        labels: Array.from({ length: analyser.frequencyBinCount }, (_, i) => i),
        datasets: [
          {
            data: dataArray,
            borderColor: "rgb(255, 99, 132)",
            fill: false,
          },
        ],
      });
    }

    audioElement.current.srcObject = audioContext.createMediaStreamSource(
      audioElement.current
    );
    audioElement.current.connect(analyser);
    getAudioData();

    return () => {
      audioElement.current.srcObject = null;
      audioElement.current.disconnect(analyser);
      audioContext.close();
    };
  }, []);

  return (
    <div>
      <audio ref={audioElement} />
      <Line data={data} />
    </div>
  );
}

export default AudioGraph;
