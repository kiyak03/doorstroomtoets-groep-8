// public/js/speech.js - Nederlandse Voorleesfunctie (Web Speech API)
(function () {
  let synth = window.speechSynthesis;
  let nlVoice = null;
  let isSpeaking = false;

  function loadVoices() {
    if (!synth) return;
    const voices = synth.getVoices();
    // Prioritize Dutch voice
    nlVoice = voices.find(v => v.lang.startsWith('nl') || v.lang.includes('Dutch')) || null;
  }

  if (synth) {
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }

  function cleanText(text) {
    if (!text) return '';
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\[\d+\]/g, '') // remove paragraph markers like [1]
      .replace(/÷/g, 'gedeeld door')
      .replace(/×/g, 'maal')
      .replace(/m²/g, 'vierkante meter')
      .replace(/m³/g, 'kubieke meter')
      .replace(/km\/u/g, 'kilometer per uur')
      .trim();
  }

  function speak(text, callback) {
    if (!synth) {
      alert('Voorlezen wordt helaas niet ondersteund door deze browser.');
      return;
    }

    if (synth.speaking) {
      synth.cancel();
      isSpeaking = false;
      if (callback) callback(false);
      return;
    }

    const cleaned = cleanText(text);
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = 'nl-NL';
    utterance.rate = 0.95; // slightly calm pace for learning
    utterance.pitch = 1.0;

    if (nlVoice) {
      utterance.voice = nlVoice;
    }

    utterance.onstart = () => {
      isSpeaking = true;
      if (callback) callback(true);
    };

    utterance.onend = () => {
      isSpeaking = false;
      if (callback) callback(false);
    };

    utterance.onerror = () => {
      isSpeaking = false;
      if (callback) callback(false);
    };

    synth.speak(utterance);
  }

  function stop() {
    if (synth && synth.speaking) {
      synth.cancel();
      isSpeaking = false;
    }
  }

  window.Voorlezer = {
    speak,
    stop,
    isSpeaking: () => isSpeaking
  };
})();
