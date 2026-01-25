import { useRef } from "react";
// const API = "https://threads-73p7.onrender.com";
const API = "http://localhost:8081";

const AudioRecorder = ({ setAudioList }) => {
  const recordBtnRef = useRef(null);
  const stopBtnRef = useRef(null);
  const pauseBtnRef = useRef(null);

  const gumStreamRef = useRef(null);
  const recRef = useRef(null);
  const audioContextRef = useRef(null);

  const startRecording = async () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      gumStreamRef.current = stream;

      const input = audioContextRef.current.createMediaStreamSource(stream);

      recRef.current = new Recorder(input, { numChannels: 1 });
      recRef.current.record();

      console.log("🎙️ Recording started");
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const pauseRecording = () => {
    const rec = recRef.current;
    if (!rec) return;

    if (rec.recording) {
      rec.stop();
      pauseBtnRef.current.innerText = "Resume";
    } else {
      rec.record();
      pauseBtnRef.current.innerText = "Pause";
    }
  };

  const stopRecording = () => {
    const rec = recRef.current;
    const gumStream = gumStreamRef.current;

    if (!rec || !gumStream) return;

    rec.stop();
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(async (blob) => {
      createDownloadLink(blob);
      const audioUrl = await uploadAudio(blob);
      setAudioList((prev) => [...prev, audioUrl]);
    });

    console.log("⏹️ Recording stopped");
  };

  const createDownloadLink = (blob) => {
    const url = URL.createObjectURL(blob);

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = url;

    const link = document.createElement("a");
    link.href = url;
    link.download = `${new Date().toISOString()}.wav`;
    link.innerText = link.download;

    const li = document.createElement("li");
    li.appendChild(audio);
    li.appendChild(link);

    document.getElementById("recordingsList")?.appendChild(li);
  };

  const uploadAudio = async (blob) => {
    const formData = new FormData();

    formData.append("audio", blob, `recording-${Date.now()}.wav`);

    try {
      const res = await fetch(`${API}/upload-audio`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Upload success:", data);
      return data.file;
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <>
      <button ref={recordBtnRef} onClick={startRecording}>
        Record
      </button>

      <button ref={stopBtnRef} onClick={stopRecording}>
        Stop
      </button>

      <button ref={pauseBtnRef} onClick={pauseRecording}>
        Pause
      </button>

      <ol id="recordingsList"></ol>
    </>
  );
};

export default AudioRecorder;
