import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDownToLine, ArrowUpRight, X, Code2, Gamepad2, Layers, Terminal, Mail, Github, Linkedin } from 'lucide-react';
import { assets, assetUrl, contact, panelIds, projectLinks, type PanelId } from './content/config';
import type { en } from './content/en';
import { useRoom } from './store';
import { playSound } from './audio';
import Avatar from './Avatar';

export default function Panel({id}:{id:PanelId}) {
  const {t}=useTranslation();const {open,reducedMotion}=useRoom();const ref=useRef<HTMLDialogElement>(null);
  const close=()=>{playSound('close');open(null);};
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement|null;
    const dialog=ref.current!;dialog.showModal();
    const old=document.body.style.overflow;document.body.style.overflow='hidden';
    return ()=>{dialog.close();document.body.style.overflow=old;previous?.focus();};
  },[]);
  const data=t(id,{returnObjects:true}) as (typeof en)[typeof id];
  return <dialog ref={ref} className="resume-dialog" aria-labelledby="panel-title" onCancel={event=>{event.preventDefault();close();}} onClick={event=>{if(event.target===event.currentTarget)close();}}>
    <motion.div className="panel-shell" initial={reducedMotion?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.18}}>
      <header className="panel-top"><span><i/> {t('panelCode')} / 0{panelIds.indexOf(id)+1}</span><button className="icon-button" aria-label={t('close')} title={t('close')} onClick={close}><X size={20}/></button></header>
      <div className="panel-body">
        <p className="eyebrow mint">{data.subtitle}</p><h2 id="panel-title">{data.title}</h2>
        <p className="demo-note"><span>{t('placeholder')}</span> {t('placeholderNote')}</p>
        <PanelContent id={id}/>
      </div>
      <footer className="panel-footer"><span>ZL / {t(`sections.${id}`).toUpperCase()}</span><button className="text-button" onClick={()=>{playSound('click');open(panelIds[(panelIds.indexOf(id)+1)%panelIds.length]);ref.current?.querySelector('.panel-body')?.scrollTo(0,0);}}>{t('next')} <ArrowUpRight size={16}/></button></footer>
    </motion.div>
  </dialog>;
}

function PanelContent({id}:{id:PanelId}) {
  const {t}=useTranslation();
  if(id==='profile'){
    const profile=t('profile',{returnObjects:true}) as typeof en.profile;
    return <><div className="profile-identity"><Avatar/><div><h3>{t('name')}</h3><p>{t('role')}</p><span className="small muted">{t('location')}</span></div></div>
      <div className="prose">{profile.paragraphs.map(p=><p key={p}>{p}</p>)}</div>
      <div className="tags">{profile.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
      <ResumeLink/>
    </>;
  }
  if(id==='skills'){
    const skills=t('skills',{returnObjects:true}) as typeof en.skills;
    const icons=[Code2,Gamepad2,Terminal,Layers];
    return <><p className="panel-intro">{skills.intro}</p><div className="skill-groups">{skills.groups.map((g,index)=>{const Icon=icons[index];return <section className="skill-group" key={g.name}><h3><Icon size={18}/> {g.name}</h3><div className="skill-list">{g.items.map((item,i)=><div className="skill-item" key={item}><span className={`skill-symbol symbol-${index}`}>{item.slice(0,2).toUpperCase()}<i style={{width:`${8+i%3*4}px`}}/></span><span>{item}</span></div>)}</div></section>;})}</div></>;
  }
  if(id==='experience'){
    const experience=t('experience',{returnObjects:true}) as typeof en.experience;
    return <div className="timeline">{experience.jobs.map(job=><section className="job" key={job.company}><p className="small mint">{job.period}</p><h3>{job.role}</h3><p className="company">{job.company}</p><ul>{job.points.map(point=><li key={point}>{point}</li>)}</ul></section>)}</div>;
  }
  if(id==='interests'){
    const interests=t('interests',{returnObjects:true}) as typeof en.interests;
    return <><p className="panel-intro">{interests.intro}</p>{interests.items.map((item,i)=><section className="interest" key={item.title}><span className="pixel-number">0{i+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></section>)}</>;
  }
  if(id==='projects'){
    const projects=t('projects',{returnObjects:true}) as typeof en.projects;
    return <><p className="panel-intro">{projects.intro}</p><div className="projects-grid">{projects.items.map((project,i)=><article className="project" key={project.id}>
      <div className={`project-art art-${project.art}`} aria-hidden="true"><span className="project-code">0{i+1}</span><div className="mini-screen"><i/><i/><i/><b/><b/></div></div>
      <div className="project-info"><p className="eyebrow">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div>
      <div className="project-links">{(['demo','source','caseStudy'] as const).map(key=>projectLinks[project.id]?.[key]?<a key={key} href={projectLinks[project.id][key]} target="_blank" rel="noreferrer">{projects[key]} <ArrowUpRight size={14}/></a>:null)}{!Object.values(projectLinks[project.id]??{}).some(Boolean)&&<span className="muted small">{projects.pending}</span>}</div></div>
    </article>)}</div></>;
  }
  const copy=t('contact',{returnObjects:true}) as typeof en.contact;
  return <><p className="panel-intro">{copy.intro}</p><div className="contact-links">{(['email','github','linkedin']as const).map((key,i)=>{const Icon=[Mail,Github,Linkedin][i];return contact[key]?<a className="contact-link" key={key} href={key==='email'?`mailto:${contact[key]}`:contact[key]}><Icon size={22}/><span>{copy[key]}</span><ArrowUpRight size={18}/></a>:<div className="contact-link unavailable" key={key}><Icon size={22}/><span>{copy[key]}</span><span className="small">{t('projects.pending')}</span></div>;})}</div><p className="small muted">{copy.pending}</p></>;
}

export function ResumeLink(){const {t}=useTranslation();return assets.resumePdf?<a className="text-button resume-link" href={assetUrl(assets.resumePdf)} download><ArrowDownToLine size={16}/>{t('resume')}</a>:<button className="text-button resume-link" disabled title={t('resumePending')}><ArrowDownToLine size={16}/>{t('resumePending')}</button>;}
