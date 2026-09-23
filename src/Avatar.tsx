import { useEffect, useRef } from 'react';
import { assets, assetUrl } from './content/config';
import { avatarCanvas } from './scene/art';

export default function Avatar() {
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{const c=ref.current?.getContext('2d');if(c){c.imageSmoothingEnabled=false;c.drawImage(avatarCanvas(),0,0,128,128);}},[]);
  return assets.avatar ? <img className="avatar" src={assetUrl(assets.avatar)} alt="Fictional cyberpunk persona"/> : <canvas ref={ref} className="avatar" width="128" height="128" role="img" aria-label="Pixel-art fictional cyberpunk persona"/>;
}
