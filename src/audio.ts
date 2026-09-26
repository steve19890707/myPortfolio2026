import { Howl, Howler } from 'howler';
import { assets, assetUrl } from './content/config';

let tracks: Record<keyof typeof assets.audio, Howl> | undefined;
let enabled = false;
let musicPaused = false;
function syncMusic() {
  if (!tracks) return;
  if (!enabled || musicPaused || document.hidden) tracks.bgm.pause();
  else if (!tracks.bgm.playing()) tracks.bgm.play();
}
export function setMusicPaused(value: boolean) {
  musicPaused = value;
  syncMusic();
}
export function audioStatus() {
  return { enabled, state: tracks?.click.state(), musicState: tracks?.bgm.state(), playing: tracks?.bgm.playing() ?? false, context: Howler.ctx?.state };
}
function init() {
  tracks ??= Object.fromEntries(Object.entries(assets.audio).map(([key, path]) => [key, new Howl({
    src: [assetUrl(path)], loop: key === 'bgm', volume: key === 'bgm' ? 0.5 : 0.3,
    preload: true,
  })])) as Record<keyof typeof assets.audio, Howl>;
  return tracks;
}
export function setAudio(value: boolean) {
  enabled = value;
  if (value) {
    init();
    syncMusic();
  }
  else Object.values(tracks ?? {}).forEach(track => track.stop());
}
export function playSound(key: 'click' | 'open' | 'close') {
  if (enabled && !document.hidden) init()[key].play();
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) Object.values(tracks ?? {}).forEach(track => track.pause());
  else syncMusic();
});
