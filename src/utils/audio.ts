const audioContext = new AudioContext();
let gainNode: GainNode;

export const initAudio = () => {
  gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);
};

export const playSound = async (soundName: string, volume: number) => {
  try {
    const response = await fetch(`/sounds/${soundName}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    gainNode.gain.value = volume;
    source.connect(gainNode);
    source.start();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};