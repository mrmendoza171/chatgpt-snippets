import React, { useState, useEffect } from "react";
import "./App.css";
import MusicPlayer from "./components/MusicPlayer";
import AudioVisualizer from "./components/AudioVisualizer";
import QRWidget from "./components/QRWidget";
import AudioGraph from "./components/AudioGraph";

// Prices are per 1,000 tokens. You can think of tokens as pieces of words,
// where 1,000 tokens is about 750 words. This paragraph is 35 tokens.


import { Configuration, OpenAIApi } from "openai";
// const { Configuration, OpenAIApi } = import("openai");
const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "simple html boilerplate code",
  max_tokens: 400,
  temperature: 0,
});
console.log(response.data);
console.log(response.data.choices[0].text);


function App() {

  return (
    <div className="App">
      {/* <MusicPlayer /> */}
      {/* <AudioVisualizer /> */}
      <QRWidget />
      {/* <AudioGraph /> */}
    </div>
  );
}

export default App;





