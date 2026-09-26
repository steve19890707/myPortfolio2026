import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('../public/audio/', import.meta.url));
mkdirSync(directory, { recursive: true });
const rate = 22050;
const tau = Math.PI * 2;

function wav(name, channels, data) {
  const count = data[0].length;
  const buffer = Buffer.alloc(44 + count * channels * 2);
  buffer.write('RIFF'); buffer.writeUInt32LE(buffer.length - 8, 4);
  buffer.write('WAVE', 8); buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(channels, 22); buffer.writeUInt32LE(rate, 24);
  buffer.writeUInt32LE(rate * channels * 2, 28);
  buffer.writeUInt16LE(channels * 2, 32); buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36); buffer.writeUInt32LE(count * channels * 2, 40);
  for (let i = 0; i < count; i++) {
    for (let channel = 0; channel < channels; channel++) {
      const sample = Math.max(-1, Math.min(1, data[channel][i]));
      buffer.writeInt16LE(Math.round(sample * 32767), 44 + (i * channels + channel) * 2);
    }
  }
  writeFileSync(directory + name, buffer);
}

function effect(name, duration, sample) {
  const count = Math.round(duration * rate);
  const data = new Float32Array(count);
  for (let i = 0; i < count; i++) data[i] = sample(i / rate, duration);
  wav(name, 1, [data]);
}

effect('click-ui-soft.wav', .12, (t, d) => Math.sin(tau * (660 * t - 440 * t * t)) * Math.sin(Math.PI * t / d) ** 2 * .18);
effect('panel-open.wav', .45, (t, d) => (Math.sin(tau * (220 * t + 160 * t * t)) + .3 * Math.sin(tau * 660 * t)) * Math.sin(Math.PI * t / d) ** 2 * .1);
effect('panel-close.wav', .3, (t, d) => Math.sin(tau * (440 * t - 300 * t * t)) * Math.sin(Math.PI * t / d) ** 2 * .12);

console.log("Generated three UI sounds.");
