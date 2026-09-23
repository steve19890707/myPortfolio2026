import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Deterministic synthesized placeholders, not output from an AI music service.
const directory=fileURLToPath(new URL('../public/audio/',import.meta.url));
mkdirSync(directory,{recursive:true});
const rate=22050;
function wav(name,duration,sample){
  const count=Math.round(duration*rate),buffer=Buffer.alloc(44+count*2);
  buffer.write('RIFF');buffer.writeUInt32LE(buffer.length-8,4);buffer.write('WAVE',8);
  buffer.write('fmt ',12);buffer.writeUInt32LE(16,16);buffer.writeUInt16LE(1,20);
  buffer.writeUInt16LE(1,22);buffer.writeUInt32LE(rate,24);buffer.writeUInt32LE(rate*2,28);
  buffer.writeUInt16LE(2,32);buffer.writeUInt16LE(16,34);buffer.write('data',36);buffer.writeUInt32LE(count*2,40);
  for(let i=0;i<count;i++)buffer.writeInt16LE(Math.round(Math.max(-1,Math.min(1,sample(i/rate,duration)))*32767),44+i*2);
  writeFileSync(directory+name,buffer);
}
const tau=2*Math.PI;
wav('click-ui-soft.wav',.12,(t,d)=>Math.sin(tau*(660*t-440*t*t))*Math.sin(Math.PI*t/d)**2*.18);
wav('panel-open.wav',.45,(t,d)=>(Math.sin(tau*(220*t+160*t*t))+.3*Math.sin(tau*660*t))*Math.sin(Math.PI*t/d)**2*.1);
wav('panel-close.wav',.3,(t,d)=>Math.sin(tau*(440*t-300*t*t))*Math.sin(Math.PI*t/d)**2*.12);
// Integer cycle frequencies and periodic envelopes keep the 64-second loop seamless.
wav('room-bgm-loop.wav',64,(t,d)=>{
  let value=0;
  [65.406,130.813,155.563,195.998,261.626].forEach((frequency,i)=>{
    const f=Math.round(frequency*d)/d;
    const envelope=.5+.5*Math.sin(tau*t/(i%2?32:64)+i*1.2);
    value+=Math.sin(tau*f*t)*envelope*(i===0?.09:.025);
  });
  const beat=t%4,envelope=Math.sin(Math.PI*beat/4)**6;
  value+=Math.sin(tau*(Math.round(523.251*d)/d)*t)*envelope*.012;
  return value;
});
console.log('Generated 4 replaceable audio placeholders. BGM: 64 seconds, mono PCM WAV.');
