import { mkdirSync, writeFileSync } from 'node:fs';

// Original score; the supplied recording is used only as a tempo reference.
const rate = 32000;
const bpm = 112;
const beat = 60 / bpm;
const bars = 24;
const count = Math.round(bars * 4 * beat * rate);
const channels = [new Float64Array(count), new Float64Array(count)];
const tau = Math.PI * 2;
const frequency = note => 440 * 2 ** ((note - 69) / 12);
const smooth = x => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
let seed = 9262026;
const noise = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 2147483648 - 1; };

function event(position, duration, volume, pan, sample) {
  const start = Math.round(position * beat * rate);
  const length = Math.round(duration * rate);
  const gains = [Math.sqrt((1 - pan) / 2) * volume, Math.sqrt((1 + pan) / 2) * volume];
  for (let i = 0; i < length; i++) {
    const value = sample(i / rate, duration);
    // Wrap release tails across the loop boundary, including delay reflections.
    const index = (start + i) % count;
    channels[0][index] += value * gains[0];
    channels[1][index] += value * gains[1];
  }
}

function note(pitch, position, beats, volume, kind = 'lead', pan = 0) {
  const f = frequency(pitch);
  const duration = beats * beat + 0.12;
  event(position, duration, volume, pan, (t, d) => {
    const envelope = smooth(t / 0.018) * smooth((d - t) / 0.14);
    const phase = tau * f * t;
    if (kind === 'bass') return envelope * Math.exp(-t * 1.4) * (Math.sin(phase) + 0.12 * Math.sin(phase * 2));
    if (kind === 'keys') return envelope * Math.exp(-t * 2.1) * (Math.sin(phase) + 0.18 * Math.sin(phase * 2) + 0.04 * Math.sin(phase * 3));
    // Finite harmonics give a rounded console-like voice without aliased square-wave edges.
    return envelope * Math.exp(-t * 1.1) * (Math.sin(phase) - Math.sin(phase * 3) / 9 + Math.sin(phase * 5) / 25);
  });
}

function kick(position, volume) {
  event(position, 0.24, volume, 0, (t, d) => smooth(t / .004) * smooth((d - t) / .04) * Math.exp(-t * 18) * Math.sin(tau * (48 * t + 38 * .025 * (1 - Math.exp(-t / .025)))));
}
function snare(position) {
  let low = 0;
  event(position, .16, .07, -.08, (t, d) => {
    low += .18 * (noise() - low);
    return smooth(t / .003) * smooth((d - t) / .035) * Math.exp(-t * 25) * (low * 1.8 + Math.sin(tau * 175 * t) * .3);
  });
}
function hat(position, accent) {
  let low = 0;
  event(position, .055, accent ? .021 : .012, .23, (t, d) => {
    low += .25 * (noise() - low);
    return low * smooth(t / .002) * smooth((d - t) / .015) * Math.exp(-t * 55);
  });
}

const harmony = [
  { bass: 41, notes: [57, 60, 64, 67] },
  { bass: 43, notes: [55, 59, 62, 64] },
  { bass: 40, notes: [55, 59, 62, 64] },
  { bass: 45, notes: [57, 60, 64, 67] },
  { bass: 38, notes: [53, 57, 60, 64] },
  { bass: 43, notes: [53, 55, 59, 62] },
  { bass: 36, notes: [55, 59, 60, 64] },
  { bass: 43, notes: [55, 60, 62, 65] },
];
const phrases = [
  [[0,64,.65],[1,67,.4],[1.75,69,.7],[3,67,.65]],
  [[.5,62,.4],[1.25,64,.45],[2,67,1.3]],
  [[0,64,.6],[1,62,.4],[2,59,.7],[3.25,62,.35]],
  [[0,60,.65],[1.5,64,.45],[2.25,67,.45],[3,64,.65]],
  [[.5,65,.6],[1.5,64,.35],[2.25,62,1]],
  [[0,62,.45],[.75,59,.45],[1.5,57,.35],[2.25,59,1]],
  [[0,60,1.2],[1.75,64,.45],[2.5,67,.8]],
  [[.5,65,.55],[1.5,62,.55],[2.5,60,.5],[3.25,62,.4]],
];
for (let bar = 0; bar < bars; bar++) {
  const chord = harmony[bar % 8];
  const start = bar * 4;
  const bridge = bar >= 8 && bar < 16;
  for (const offset of [0, 1.5, 2.75]) {
    chord.notes.forEach((pitch, index) => note(pitch, start + offset + index * .012, .8, .032, 'keys', index % 2 ? .4 : -.4));
  }
  for (const [offset, pitch, length] of [[0,chord.bass,.85],[1.5,chord.bass,.4],[2,chord.bass+7,.65],[3.25,chord.bass,.45]]) {
    note(pitch, start + offset, length, .15, 'bass');
  }
  if (bridge) {
    [2, 1, 0, 1].forEach((degree, i) => note(chord.notes[degree], start + i + .5, .55, .085, 'lead', -.12));
  } else {
    phrases[bar % 8].forEach(([offset, pitch, length]) => note(pitch, start + offset, length, .12, 'lead', .08));
  }
  kick(start, .23);
  kick(start + 2, .19);
  if (bar % 2) kick(start + 3.5, .1);
  snare(start + 1); snare(start + 3);
  for (let step = 0; step < 8; step++) hat(start + step * .5, step % 2 === 0);
}

const dry = channels.map(channel => channel.slice());
for (let i = 0; i < count; i++) {
  const echo = (i - Math.round(beat * .75 * rate) + count) % count;
  channels[0][i] += dry[1][echo] * .1;
  channels[1][i] += dry[0][echo] * .1;
}
// Periodic filter warm-up avoids an abrupt change between the final and first samples.
const alpha = 1 - Math.exp(-tau * 3600 / rate);
channels.forEach(channel => {
  let low = 0;
  for (const sample of channel) low += alpha * (sample - low);
  for (let i = 0; i < count; i++) { low += alpha * (channel[i] - low); channel[i] = low; }
});
let peak = 0, energy = 0;
for (let i = 0; i < count; i++) for (const channel of channels) {
  peak = Math.max(peak, Math.abs(channel[i])); energy += channel[i] ** 2;
}
const rms = Math.sqrt(energy / (count * 2));
const gain = Math.min(.82 / peak, .13 / rms);
const buffer = Buffer.alloc(44 + count * 4);
buffer.write('RIFF'); buffer.writeUInt32LE(buffer.length - 8, 4);
buffer.write('WAVEfmt ', 8); buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20); buffer.writeUInt16LE(2, 22);
buffer.writeUInt32LE(rate, 24); buffer.writeUInt32LE(rate * 4, 28);
buffer.writeUInt16LE(4, 32); buffer.writeUInt16LE(16, 34);
buffer.write('data', 36); buffer.writeUInt32LE(count * 4, 40);
for (let i = 0; i < count; i++) for (let c = 0; c < 2; c++) buffer.writeInt16LE(Math.round(channels[c][i] * gain * 32767), 44 + i * 4 + c * 2);
const directory = new URL('../public/audio/', import.meta.url);
mkdirSync(directory, { recursive: true });
writeFileSync(new URL('game-loop.wav', directory), buffer);
console.log(JSON.stringify({ bpm, seconds: count / rate, peak: peak * gain, rms: rms * gain, boundaryJump: channels.map(c => Math.abs(c[0] - c[count - 1]) * gain) }));
