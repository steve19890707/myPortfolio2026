import { Application, useApplication } from '@pixi/react';
import { Container, Graphics, Matrix, Sprite, Texture } from 'pixi.js';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { hotspots } from '../content/config';
import { useRoom } from '../store';
import { playSound } from '../audio';
import * as art from './art';

function World({ motion, ready }: { motion: boolean; ready: () => void }) {
  const { app } = useApplication();
  useEffect(() => {
    const root = new Container(); app.stage.addChild(root);
    const textures: Texture[] = [];
    function sprite(canvas: HTMLCanvasElement, parent = root) {
      const texture = Texture.from(canvas); texture.source.scaleMode = 'nearest'; textures.push(texture);
      const result = new Sprite(texture); result.scale.set(2); parent.addChild(result); return result;
    }
    sprite(art.roomBase());
    const city = new Container();
    const [wx,wy] = art.project(0,280,232);
    city.setFromMatrix(new Matrix(Math.sqrt(3)/2,-0.5,0,1,wx,wy)); root.addChild(city);
    const mask = new Graphics().rect(0,0,226,132).fill(0xffffff);city.addChild(mask);city.mask=mask;
    const buildings = [0,1,2].map(i=>sprite(art.cityLayer(i),city));
    const signals = [
      sprite(art.citySignal(20,59,'sign'),city),
      sprite(art.citySignal(69,39,'antenna'),city),
      sprite(art.citySignal(109,73,'windows'),city),
      sprite(art.citySignal(158,50,'sign'),city),
      sprite(art.citySignal(198,65,'windows'),city),
      sprite(art.citySignal(238,43,'antenna'),city),
    ];
    sprite(art.windowFrame());sprite(art.rug());sprite(art.poster());sprite(art.television());
    sprite(art.desk());sprite(art.jukebox());sprite(art.props());sprite(art.sofa());
    const glow=sprite(art.neon());
    let elapsed=0, px=0, target=0;
    const onMove = (event: PointerEvent) => { target=(event.clientX/window.innerWidth-0.5)*4; };
    window.addEventListener('pointermove',onMove,{passive:true});
    const tick=()=>{
      elapsed+=app.ticker.deltaMS/1000;
      glow.alpha=motion ? 0.7+Math.sin(elapsed*Math.PI/2)*0.16 : 0.8;
      px+=(target-px)*0.03;
      buildings.forEach((layer,i)=>{layer.x=motion ? -8+px*i+Math.sin(elapsed*0.15)*i : -8;});
      signals.forEach((signal,i)=>{
        signal.x=motion ? -8+px*1.4 : -8;
        signal.alpha=motion ? 0.55+0.35*(1+Math.sin(elapsed*2*Math.PI/(3.6+i*0.32)+i*1.7))/2 : 0.72;
      });
    };
    app.ticker.maxFPS=30;app.ticker.add(tick);
    tick();
    if(motion&&!document.hidden)app.start();else{app.stop();app.render();}
    const visibility=()=>{if(document.hidden||!motion)app.stop();else app.start();};
    document.addEventListener('visibilitychange',visibility);
    ready();
    return ()=>{
      window.removeEventListener('pointermove',onMove);document.removeEventListener('visibilitychange',visibility);
      app.ticker.remove(tick);root.destroy({children:true});textures.forEach(t=>t.destroy(true));
    };
  },[app,motion,ready]);
  return null;
}
class CanvasBoundary extends Component<{ children: ReactNode; fallback: ReactNode },{ failed:boolean }> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?this.props.fallback:this.props.children;}
}
export default function Room() {
  const { t }=useTranslation(); const { open,reducedMotion }=useRoom();
  const [loaded,setLoaded]=useState(false);
  const ready=useRef(()=>setLoaded(true)).current;
  return <div className="room-stage" aria-label="Interactive isometric room">
    <CanvasBoundary fallback={<p className="scene-fallback" role="status">{t('sceneError')}</p>}>
      <Application width={art.W} height={art.H} resolution={1} antialias={false} backgroundAlpha={0} preference="webgl">
        <World motion={!reducedMotion} ready={ready}/>
      </Application>
    </CanvasBoundary>
    {!loaded&&<p className="scene-loading">{t('loading')}</p>}
    {loaded&&<div className="hotspots">
      {hotspots.map((h,index)=><div key={h.id}>
        <button id={h.id} className={`hotspot hotspot-${h.panel}`} aria-label={t(`sections.${h.panel}`)} onClick={()=>{playSound('open');open(h.panel);}}
          style={{left:`${h.x/art.W*100}%`,top:`${h.y/art.H*100}%`,width:`${h.width/art.W*100}%`,height:`${h.height/art.H*100}%`}}>
          <span className="hotspot-marker">+</span>
        </button>
        <span className={`object-label label-${h.panel}`} style={{left:`${h.labelX/art.W*100}%`,top:`${h.labelY/art.H*100}%`}}><span>0{index+1}</span> {t(`sections.${h.panel}`)}</span>
      </div>)}
    </div>}
  </div>;
}
