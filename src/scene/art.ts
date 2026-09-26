// Every object uses the same half-resolution raster, palette and isometric projection.
export const W = 840, H = 700;
const S = Math.sqrt(3) / 2;
type Point = [number, number];
type Ctx = CanvasRenderingContext2D;
export const project = (x: number, y: number, z = 0): Point => [420 + (x - y) * S, 278 + (x + y) / 2 - z];
const colors = { line: '#141324', top: '#9b57b8', left: '#623574', right: '#804194', cyan: '#74f1d0', pink: '#f284b3', yellow: '#edc788' };
export function raster(draw: (c: Ctx) => void, width = W, height = H) {
  const canvas = document.createElement('canvas');
  canvas.width = width / 2; canvas.height = height / 2;
  const c = canvas.getContext('2d')!; c.scale(0.5, 0.5); c.imageSmoothingEnabled = false;
  draw(c); return canvas;
}
function polygon(c: Ctx, points: Point[], fill: string, stroke = colors.line, weight = 3) {
  c.beginPath(); points.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath();
  c.fillStyle = fill; c.fill(); if (weight) { c.strokeStyle = stroke; c.lineWidth = weight; c.stroke(); }
}
function line(c: Ctx, points: Point[], color: string, weight = 2) {
  c.beginPath(); points.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.strokeStyle = color; c.lineWidth = weight; c.stroke();
}
function box(c: Ctx, x: number, y: number, z: number, w: number, d: number, h: number, top = colors.top, left = colors.left, right = colors.right) {
  polygon(c, [project(x,y,z),project(x,y+d,z),project(x,y+d,z+h),project(x,y,z+h)], left);
  polygon(c, [project(x,y+d,z),project(x+w,y+d,z),project(x+w,y+d,z+h),project(x,y+d,z+h)], right);
  polygon(c, [project(x,y,z+h),project(x+w,y,z+h),project(x+w,y+d,z+h),project(x,y+d,z+h)], top);
}
function plane(c: Ctx, x: number, y: number, z: number, w: number, d: number, color: string) {
  polygon(c, [project(x,y,z),project(x+w,y,z),project(x+w,y+d,z),project(x,y+d,z)], color);
}
function wallArt(c: Ctx, x: number, z: number, w: number, h: number, fill: string, edge = colors.line) {
  polygon(c, [project(x,2,z),project(x+w,2,z),project(x+w,2,z+h),project(x,2,z+h)], fill, edge, 4);
}
export function roomBase() {
  return raster(c => {
    // Floor thickness, a quiet ground shadow, and two true-isometric walls.
    polygon(c, [[102,470],[418,656],[747,466],[427,283]], '#0b0d15', '#0b0d15', 0);
    box(c, 0, 0, -15, 340, 340, 15, '#754193', '#38234c', '#49265f');
    polygon(c, [project(0,0),project(0,340),project(0,340,248),project(0,0,248)], '#603073');
    polygon(c, [project(0,0),project(340,0),project(340,0,248),project(0,0,248)], '#482551');
    for (let n=0;n<=340;n+=34) {
      line(c,[project(n,0,1),project(n,340,1)], '#a66bbe',1);
      line(c,[project(0,n,1),project(340,n,1)], '#a66bbe',1);
    }
    for(let n=0;n<340;n+=68) {
      line(c,[project(0,n,10),project(0,n,240)],'#7f3e91',1);
      line(c,[project(n,0,8),project(n,0,240)],'#66316f',1);
    }
    line(c,[project(0,340,245),project(0,0,245),project(340,0,245)], '#d65fb7',9);
    line(c,[project(0,340,247),project(0,0,247),project(340,0,247)], '#e5b28a',3);
    line(c,[project(0,334,8),project(0,0,8),project(333,0,8)], '#a758c8',7);
    line(c,[project(0,334,10),project(0,0,10)], '#c58cc7',2);
    line(c,[project(0,340,-10),project(340,340,-10),project(340,0,-10)], '#415962',3);
    // Window recess on the northwest wall.
    polygon(c,[project(0,286,93),project(0,48,93),project(0,48,235),project(0,286,235)],'#111627','#866d92',6);
    // Service panels and small shelves on the northeast wall.
    wallArt(c,285,172,35,43,'#33374a','#5f6574');
    for(let n=0;n<4;n++) line(c,[project(290,1,180+n*7),project(312,1,180+n*7)],'#161b2b',3);
    line(c,[project(290,0,219),project(290,0,232),project(340,0,232)],'#5e6070',4);
    box(c,131,0,163,52,14,5,'#7a6577');
    for(let n=0;n<6;n++) box(c,136+n*6,2,169,4,7,12+n%3*4,['#b78094','#628b94','#a8a788'][n%3]);
    wallArt(c,9,163,20,39,'#161d2b','#594f68');
    wallArt(c,13,170,12,3,'#72ccbe'); wallArt(c,13,178,7,3,'#72ccbe');
  });
}
export function windowFrame() {
  return raster(c=>{
    line(c,[project(1,286,96),project(1,48,96)],'#8d7697',7);
    line(c,[project(1,166,96),project(1,166,235)],'#51495f',5);
    line(c,[project(1,286,232),project(1,48,232)],'#7bd8d5',2);
    polygon(c,[project(1,280,100),project(1,200,100),project(1,255,231),project(1,280,231)],'#89d5d012','#89d5d012',0);
    box(c,0,46,89,14,243,6,'#625b78','#3e354f','#574b69');
  });
}
export function cityLayer(index: number) {
  return raster(c=> {
    if(index===0) { c.fillStyle='#182435';c.fillRect(0,0,280,145); }
    const fills=['#303252','#35334f','#292c47'];
    for(let i=0;i<12;i++) {
      const x=i*28-20+index*9, h=25+((i*37+index*43)%95), y=145-h;
      c.fillStyle=fills[index];c.fillRect(x,y,22, h);
      c.fillStyle=index===0?'#6875a5':index===1?'#72a7b2':'#92c3b3';
      for(let a=0;a<4;a++) for(let b=0;b<h/9-1;b++) if((a+b+i)%3) c.fillRect(x+3+a*5,y+6+b*9,2,3);
      if(index===1 && i%3===0) { c.fillStyle=i%2?'#ff647e':'#dd90bb';c.fillRect(x+6,y+9,5,23);c.fillStyle='#ffd0cf';for(let j=0;j<4;j++)c.fillRect(x+7,y+12+j*5,3,2); }
      if(index===0){c.fillStyle='#516575';c.fillRect(x+10,y-12,2,12);}
    }
  },280,146);
}
export function citySignal(x: number, y: number, shape: 'sign' | 'windows' | 'antenna') {
  return raster(c => {
    c.fillStyle = '#702a48';
    if (shape === 'sign') {
      c.fillRect(x-4,y-4,17,30);
      c.fillStyle = '#ff596f';c.fillRect(x,y,9,23);
      c.fillStyle = '#ffd0bd';for(let i=0;i<3;i++)c.fillRect(x+2,y+3+i*7,5,2);
    } else if (shape === 'windows') {
      for(let i=0;i<3;i++)for(let j=0;j<3;j++){
        c.fillStyle=(i+j)%2?'#ff687b':'#f77c73';
        c.fillRect(x+i*5,y+j*8,3,4);
      }
    } else {
      c.fillRect(x+4,y-13,2,15);
      c.fillStyle='#ff5e72';c.fillRect(x+1,y-15,8,4);
      c.fillStyle='#ffc1aa';c.fillRect(x+3,y-15,3,2);
    }
  },280,146);
}
export function rug() {
  return raster(c=>{
    plane(c,102,123,2,149,156,'#573063');
    plane(c,106,127,3,141,148,'#d467b2');
    plane(c,113,134,4,127,134,'#814079');
    plane(c,124,145,5,105,112,'#a8498b');
    for(let i=0;i<5;i++){
      line(c,[project(127+i*21,147,6),project(127+i*21,253,6)],'#b15d99',2);
      line(c,[project(125,149+i*25,6),project(225,149+i*25,6)],'#b15d99',2);
    }
    for(let i=0;i<12;i++) line(c,[project(106+i*12,280,2),project(106+i*12,287,2)],'#ba69a0',2);
  });
}
export function desk() {
  return raster(c=>{
    for (const [x,y] of [[17,112],[75,112],[17,225],[75,225]]) box(c,x,y,0,6,6,57,'#786d81');
    box(c,13,105,55,72,132,7,'#957c89','#66536b','#705a75');
    box(c,19,191,3,43,39,48,'#564d66');
    for(let z=16;z<47;z+=15) { line(c,[project(62,192,z),project(62,227,z)],'#aaa1ad',2); }
    // Monitor oriented toward the open room, cyan terminal pixels.
    box(c,37,143,64,17,13,6,'#22283b');
    box(c,29,146,68,5,6,13,'#8e8b9f');
    box(c,22,119,78,6,65,43,'#858499','#333247','#3b3e54');
    polygon(c,[project(29,125,83),project(29,178,83),project(29,178,115),project(29,125,115)],'#132b38','#7c989f',2);
    for(let i=0;i<6;i++) line(c,[project(30,129,109-i*4),project(30,142+i%3*10,109-i*4)],i%2?'#65c9bb':'#d1ba9a',2);
    plane(c,52,141,64,20,48,'#313245');
    for(let i=0;i<4;i++)line(c,[project(55+i*4,145,65),project(55+i*4,185,65)],'#96acae',1);
    box(c,48,211,63,12,12,14,'#d4b799','#a18179','#bea38e');
    box(c,20,111,64,18,14,9,'#af7d98');
    box(c,57,115,64,13,10,3,'#72b4b2');
    // Desk chair.
    box(c,96,153,0,7,7,31,'#48465c');
    box(c,80,137,28,35,35,9,'#686375','#363449','#514b60');
    box(c,109,138,36,7,34,34,'#777183','#38374e','#554a64');
  });
}
export function television() {
  return raster(c=>{
    box(c,155,8,3,100,35,38,'#6d596d','#362f46','#524058');
    for(let i=0;i<3;i++)box(c,162+i*30,43,11,23,2,21,'#302a3e','#302a3e','#302a3e');
    for(let i=0;i<6;i++)box(c,165+i*4,45,12,2,3,14+i%2*3,['#ac8496','#7c9c9a','#bba38a'][i%3]);
    box(c,224,45,13,22,3,16,'#1b2936');
    line(c,[project(228,49,19),project(241,49,19)],colors.cyan,2);
    box(c,192,18,42,22,17,4,'#9a8899');
    box(c,164,17,49,79,13,63,'#8e7a92','#3d3651','#665b79');
    polygon(c,[project(170,31,57),project(235,31,57),project(235,31,105),project(170,31,105)],'#193c45','#29273c',4);
    for(let z=59;z<104;z+=4)line(c,[project(172,32,z),project(233,32,z)],'#27545a',1);
    // A fictional pixel face on the CRT.
    wallFace(c,196,34,73);
    line(c,[project(174,34,61),project(183,34,61)],'#91dcc6',2);
    box(c,244,18,43,10,16,28,'#3e3a51');
    for(let z=48;z<68;z+=8)line(c,[project(246,35,z),project(251,35,z)],'#c088a3',3);
  });
}
function wallFace(c:Ctx,x:number,y:number,z:number){
  const pattern=['00111100','01111110','01222210','02222220','02333320','02333320','00222200','00022000','01111110'];
  pattern.forEach((row,j)=>[...row].forEach((v,i)=>{if(v!=='0') polygon(c,[project(x+i*2,y,z+(9-j)*2),project(x+i*2+2,y,z+(9-j)*2),project(x+i*2+2,y,z+(10-j)*2),project(x+i*2,y,z+(10-j)*2)],v==='1'?'#9f76c1':v==='2'?'#d4aa9c':'#82f1d6',undefined,0);}));
}
export function poster() {
  return raster(c=>{
    wallArt(c,35,103,66,104,'#a0778f','#13172a');
    wallArt(c,39,107,58,96,'#182636');
    wallArt(c,43,114,50,5,'#dda3ba');
    wallArt(c,45,121,18,2,'#9bbbbb');
    wallArt(c,43,136,50,61,'#394760');
    wallArt(c,72,137,4,58,'#638b98');
    wallArt(c,57,148,19,29,'#171e32');
    wallArt(c,61,175,12,12,'#bd859e');
    wallArt(c,61,179,14,3,'#82d7c4');
    wallArt(c,52,133,30,16,'#191d30');
    for(let i=0;i<5;i++)wallArt(c,46+i*9,126,5,3,'#b69cae');
  });
}
export function sofa() {
  return raster(c=>{
    for(const x of [38,143]) for(const y of [246,294])box(c,x,y,0,7,7,10,'#30263e');
    box(c,31,239,9,127,64,19,'#526769','#293b49','#3c4e58');
    box(c,32,289,28,125,13,47,'#73968a','#344a54','#45636a');
    for(let i=0;i<3;i++) {
      box(c,40+i*36,247,29,34,40,14,'#739c8b','#415f62','#4f7973');
      box(c,40+i*36,285,43,33,8,28,'#79a190','#3f6566','#648b7e');
    }
    box(c,29,239,27,13,62,31,'#8db1a0','#43676a','#63867e');
    box(c,148,239,27,13,62,31,'#8db1a0','#43676a','#63867e');
    box(c,47,272,46,24,16,19,'#b891a1','#8b687d','#a0798d');
    box(c,119,272,46,23,16,19,'#d5b48c','#927c73','#b59783');
    line(c,[project(34,304,19),project(156,304,19)],'#e6a0b6',2);
    // Folded throw.
    plane(c,89,252,45,31,40,'#b895a2');
    polygon(c,[project(89,291,45),project(120,291,45),project(120,291,25),project(89,291,25)],'#a78497');
    for(let i=0;i<5;i++)line(c,[project(92+i*6,252,46),project(92+i*6,291,46),project(92+i*6,291,24)],'#d4bac1',1);
  });
}
export function jukebox() {
  return raster(c=>{
    box(c,280,70,0,43,43,12,'#494c61');
    box(c,279,70,12,45,40,88,'#978494','#34354c','#595066');
    box(c,284,75,99,35,31,10,'#c29caa');
    polygon(c,[project(285,111,19),project(318,111,19),project(318,111,94),project(285,111,94)],'#192b38','#85d8ca',3);
    polygon(c,[project(290,113,62),project(313,113,62),project(313,113,86),project(290,113,86)],'#5c647d','#ba89b3',2);
    for(let i=0;i<5;i++)line(c,[project(290+i*5,113,24),project(290+i*5,113,53)],'#b79aad',2);
    for(let i=0;i<3;i++)line(c,[project(293+i*7,114,72),project(293+i*7,114,76+i*3)],'#81ecce',3);
    box(c,282,111,57,39,7,4,'#bf8caa');
    line(c,[project(282,112,16),project(282,112,96)],'#e6a6c2',2);
  });
}
function plant(c:Ctx,x:number,y:number,scale=1){
  box(c,x,y,2,23*scale,23*scale,22*scale,'#ad8c8b','#665c70','#897082');
  const [px,py]=project(x+11*scale,y+11*scale,24*scale);
  line(c,[[px,py],[px,py-40*scale]],'#6c9c82',4);
  for(let i=0;i<7;i++) {
    const sign=i%2?1:-1, yy=py-i*6*scale;
    polygon(c,[[px,yy],[px+sign*24*scale,yy-23*scale],[px+sign*30*scale,yy-12*scale],[px+sign*15*scale,yy+2*scale]],i%2?'#75aa8b':'#4d877b','#2e4e52',2);
  }
}
export function props() {
  return raster(c=>{
    plant(c,15,299,1.1); plant(c,312,14,0.78);
    // Floor lamp with a tapered shade, a visible socket, and a narrow stem.
    box(c,290,179,0,25,25,5,'#797082');
    box(c,302,190,5,3,3,74,'#aba0a0','#5a5066','#82768b');
    box(c,299,187,79,9,9,5,'#8d6875','#6b4c66','#79566f');
    const shadeBottom = [project(288,176,84),project(318,176,84),project(318,206,84),project(288,206,84)];
    const shadeTop = [project(296,184,108),project(310,184,108),project(310,198,108),project(296,198,108)];
    polygon(c,[shadeTop[3],shadeTop[2],shadeBottom[2],shadeBottom[3]],'#dcaa88','#50354e',2);
    polygon(c,[shadeTop[2],shadeTop[1],shadeBottom[1],shadeBottom[2]],'#f4c58f','#50354e',2);
    polygon(c,[shadeTop[0],shadeTop[1],shadeTop[2],shadeTop[3]],'#ffe7af','#50354e',2);
    line(c,[shadeBottom[3],shadeBottom[2],shadeBottom[1]],'#8e5e68',2);
    box(c,193,287,2,8,8,29,'#4b445a');
    box(c,177,273,29,40,39,7,'#b08b91','#75596c','#8e687e');
    box(c,182,279,37,20,16,3,'#73968e');
    box(c,184,282,41,18,14,3,'#c694a5');
    box(c,206,277,36,5,5,9,'#d6c0a5');
    // Low central coffee table.
    for(const [x,y]of[[168,172],[208,172],[168,211],[208,211]])box(c,x,y,2,5,5,22,'#3e334d');
    box(c,160,163,24,62,58,7,'#877080','#51415b','#654d65');
    plane(c,171,172,33,24,27,'#af8a99');
    plane(c,174,175,34,18,20,'#537475');
    box(c,207,175,32,7,7,10,'#d2b8a4');
    box(c,201,198,32,11,6,2,'#343248');
  });
}
export function neon() {
  return raster(c=>{
    line(c,[project(0,333,239),project(0,0,239)],'#f2a8c1',2);
    line(c,[project(0,0,239),project(335,0,239)],'#90d9ce',2);
    line(c,[project(166,33,53),project(240,33,53)],'#a2e0cc',2);
    line(c,[project(14,239,59),project(85,239,59)],'#7de3ca',2);
    line(c,[project(4,340,-8),project(337,340,-8)],'#af759b',2);
  });
}

export function avatarCanvas() {
  return raster(c=>{
    c.fillStyle='#282a40';c.fillRect(0,0,128,128);
    for(let i=0;i<8;i++){c.fillStyle='#354054';c.fillRect(i*18,0,2,128);c.fillRect(0,i*18,128,2);}
    const rows=['000111111000','001111111100','011111111110','011222222110','012222222210','012333333210','002333333200','002222222200','000222222000','000022220000','001144441100','011144441110','111144441111','111114411111'];
    const palette:Record<string,string>={'1':'#a47baf','2':'#d0aaa5','3':'#8ef1d6','4':'#4a536d'};
    rows.forEach((row,y)=>[...row].forEach((v,x)=>{if(v!=='0'){c.fillStyle=palette[v];c.fillRect(16+x*8,14+y*8,8,8);}}));
    c.fillStyle='#f1b7c8';c.fillRect(108,20,4,14);c.fillStyle='#90d9ce';c.fillRect(10,95,4,16);
  },128,128);
}
