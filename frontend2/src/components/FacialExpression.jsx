import React, { useState,useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./facialExpression.css";
import axios from "axios";

export default function FacialExpression({ setSongs }) {
    const [detectedMood, setDetectedMood] = useState(null);

  const moodIcons = {
    happy: "😊",
    sad: "😢",
    neutral: "😐",
    surprised: "😲",
  };
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    let mostProableExpression = 0;
    let _expression = "";

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProableExpression) {
        mostProableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }
    console.log(_expression);

    /* get http://localhost:3000/songs?mood=happy */
    axios
      .get(`http://localhost:3000/songs?mood=${_expression}`)
      .then((response) => {
        console.log(response.data);
        setSongs(response.data.songs);
      });

    const simulatedMood = _expression; // Replace with real detection
    setDetectedMood(simulatedMood);
    if (onDetectMood) onDetectMood(simulatedMood);  
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="mood-section">
      <video ref={videoRef} autoPlay muted className="webcam-feed" />

      <button className="detect-button" onClick={detectMood}>
        Detect Mood
      </button>
      {detectedMood && (
        <p className="mood-display">
          Detected Mood: <span>{moodIcons[detectedMood] || "😶"} {detectedMood}</span>
        </p>
      )}
    </div>
  );
}
