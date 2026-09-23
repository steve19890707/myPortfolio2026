import { Howl, Howler } from 'howler';
import { assets, assetUrl } from './content/config';

let tracks: Record<keyof typeof assets.audio, Howl> | undefined;
let enabled = false;
export function audioStatus() {
  return { enabled, state: tracks?.bgm.state(), playing: tracks?.bgm.playing(), context: Howler.ctx?.state };
}
function init() {
  tracks ??= Object.fromEntries(Object.entries(assets.audio).map(([key, path]) => [key, new Howl({
    src: [assetUrl(path)], loop: key === 'bgm', volume: key === 'bgm' ? 0.22 : 0.3,
    preload: true,
  })])) as Record<keyof typeof assets.audio, Howl>;
  return tracks;
}
export function setAudio(value: boolean) {
  enabled = value;
  if (value) { const audio = init(); if (!audio.bgm.playing()) audio.bgm.play(); }
  else tracks?.bgm.pause();
}
export function playSound(key: 'click' | 'open' | 'close') {
  if (enabled) init()[key].play();
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) tracks?.bgm.pause();
  else if (enabled && tracks && !tracks.bgm.playing()) tracks.bgm.play();
});
