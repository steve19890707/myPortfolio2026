import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Volume2, VolumeX, Globe2, Pause, Play, UserRound, Code2, BriefcaseBusiness, Disc3, Heart, Mail } from 'lucide-react';
import { languages, panelIds, type PanelId } from './content/config';
import { useRoom } from './store';
import { playSound,setAudio,setMusicPaused } from './audio';
import Panel,{ResumeLink} from './Panel';
import CityBackdrop from './scene/CityBackdrop';

const Room=lazy(()=>import('./scene/Room'));
const icons={profile:UserRound,skills:Code2,experience:BriefcaseBusiness,projects:Disc3,interests:Heart,contact:Mail};
export default function App(){
  const {t,i18n}=useTranslation();const {panel,open,sound,setSound,reducedMotion,toggleMotion}=useRoom();
  const show=(id:PanelId)=>{playSound('open');open(id);};
  return <div className={`app ${reducedMotion?'reduced-motion':''}`}>
    <a className="skip-link" href="#quick-access">{t('quickAccess')}</a>
    <header className="site-header"><a href="#" className="brand" aria-label={t('name')}><span className="brand-mark">{t('brand')}<i/></span><span className="brand-word">{t('world')}<small>{t('edition')}</small></span></a>
      <div className="header-controls"><div className="language-control"><Globe2 size={15}/><select value={i18n.language} aria-label={t('language')} onChange={event=>{void i18n.changeLanguage(event.target.value);playSound('click');}}>{languages.map(l=><option value={l.id} key={l.id}>{l.label}</option>)}</select></div>
        <span className="control-divider"/>
        <button className="icon-button" title={t(sound?'soundOn':'soundOff')} aria-label={t(sound?'soundOn':'soundOff')} aria-pressed={sound} onClick={()=>{setAudio(!sound);setSound(!sound);}}>{sound?<Volume2 size={18}/>:<VolumeX size={18}/>}</button>
        <button className="icon-button motion-button" title={t(reducedMotion?'motionOff':'motionOn')} aria-label={t(reducedMotion?'motionOff':'motionOn')} aria-pressed={!reducedMotion} onClick={()=>{setMusicPaused(!reducedMotion);toggleMotion();}}>{reducedMotion?<Play size={17}/>:<Pause size={17}/>}</button>
      </div>
    </header>
    <main>
      <div className="main-layout">
        <CityBackdrop/>
        <section className="intro"><div className="availability"><span/>{t('availability')}</div><p className="eyebrow intro-code">HELLO WORLD / 001</p><h1>{t('firstName')}<br/>{t('lastName')}<span className="name-dot">.</span></h1><h2>{t('role')}<br/><span>{t('roleSecond')}</span></h2><p className="intro-description">{t('introduction')}</p>
          <button className="nes-btn is-primary primary-cta" onClick={()=>show('projects')}>{t('enter')}<ArrowUpRight size={18}/></button>
          <ResumeLink/>
          <div className="coordinates"><span className="crosshair">+</span><span>{t('location')}<small>25.0330° N / 121.5654° E</small></span></div>
        </section>
        <section className="scene-section" aria-label={t('room')}><div className="scene-heading"><span><i/>{t('roomNumber')} <span className="muted">/ {t('room')}</span></span><span className="room-time">23:48 <span className="muted">/ {t('roomStatus')}</span></span></div>
          <Suspense fallback={<div className="room-stage"><p className="scene-loading">{t('loading')}</p></div>}><Room/></Suspense>
          <div className="scene-caption"><span className="scene-caption-line"/><span>01 / THE NEON ROOM</span><span className="scene-caption-line"/></div>
        </section>
      </div>
      <nav id="quick-access" className="quick-access" aria-label={t('quickAccess')}><span className="dock-title">{t('quickAccess')}<span>INDEX / 06</span></span><div className="dock-items">{panelIds.map((id,i)=>{const Icon=icons[id];return <button key={id} className={`dock-item ${panel===id?'active':''}`} onClick={()=>show(id)}><span className="dock-number">0{i+1}</span><Icon size={20}/><span>{t(`sections.${id}`)}</span><span className="dock-indicator"/></button>;})}</div></nav>
    </main>
    <footer className="site-footer"><span>{t('copyright')}</span><span>{t('footer')}</span><button onClick={()=>show('contact')} className="text-button">{t('contactCta')} <ArrowUpRight size={14}/></button></footer>
    {panel&&<Panel id={panel}/>}
  </div>;
}
