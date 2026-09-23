import {test,expect} from '@playwright/test';
import { PNG } from 'pngjs';

test('room furniture, panels, language, keyboard, and audio',async({page})=>{
  await page.addInitScript(()=>{
    const original=AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start=function(...args:Parameters<typeof original>){
      document.documentElement.dataset.audioStarts=String(Number(document.documentElement.dataset.audioStarts??0)+1);
      return original.apply(this,args);
    };
  });
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');await expect(page.locator('#tv-profile')).toBeVisible();
  await expect(page.getByRole('button',{name:'Enable audio',exact:true})).toHaveAttribute('aria-pressed','false');
  for(const [id,title]of[['tv-profile','Behind the screen'],['desk-skills','Tools of the trade'],['sofa-interests','Off the clock'],['poster-experience','The journey so far'],['jukebox-projects','Things I have built']]){
    await page.locator(`#${id}`).click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('heading',{name:title})).toBeVisible();
    await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.locator(`#${id}`)).toBeFocused();
  }
  for(const locale of ['zh-TW','zh-CN','ja','ko','en']){await page.getByRole('combobox',{name:'Language'}).selectOption(locale);await expect(page.locator('html')).toHaveAttribute('lang',locale);}
  await page.getByRole('combobox').selectOption('ja');await page.reload();await expect(page.getByRole('combobox')).toHaveValue('ja');
  await page.locator('#quick-access').getByRole('button',{name:/Contact/}).click();await expect(page.getByRole('heading',{name:'Open a channel'})).toBeVisible();
  await page.getByRole('button',{name:'Close',exact:true}).click();
  expect(await page.locator('html').getAttribute('data-audio-starts')).toBeNull();
  await page.getByRole('button',{name:'Enable audio',exact:true}).click();await expect(page.getByRole('button',{name:'Mute audio',exact:true})).toHaveAttribute('aria-pressed','true');
  await expect.poll(()=>page.evaluate(async()=>{const path='/src/audio.ts';const audio=await import(path);return audio.audioStatus();})).toMatchObject({playing:true,state:'loaded',context:'running'});
  await page.getByRole('button',{name:'Mute audio',exact:true}).click();expect(errors).toEqual([]);
});

for(const [name,width,height]of [['desktop',1440,1000],['tablet',820,1180],['mobile',390,844],['small-mobile',320,740]] as const){
  test(`${name}: visible canvas and responsive panels`,async({page})=>{
    await page.setViewportSize({width,height});await page.goto('/');await expect(page.locator('#tv-profile')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
    await expect(page.locator('body')).toHaveCSS('background-color','rgb(16, 16, 25)');
    const canvas=page.locator('.room-stage canvas');await expect(canvas).toBeVisible();
    // Inspect composited pixels, not the discarded WebGL drawing buffer.
    const pixels=PNG.sync.read(await canvas.screenshot()).data;
    const colors=new Set<number>();
    for(let i=0;i<pixels.length;i+=64)colors.add((pixels[i]<<16)+(pixels[i+1]<<8)+pixels[i+2]);
    expect(colors.size).toBeGreaterThan(30);
    await page.screenshot({path:`test-results/${name}.png`,fullPage:true});
    await page.locator('#desk-skills').click();await expect(page.getByRole('heading',{name:'Tools of the trade'})).toBeVisible();
    const dialog=await page.getByRole('dialog').boundingBox();expect(dialog!.width).toBeLessThan(width);
    expect(await page.locator('.panel-body').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
    await page.screenshot({path:`test-results/${name}-panel.png`,fullPage:true});
  });
}

test('reduced motion is honored and quick access works',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await expect(page.locator('.app')).toHaveClass(/reduced-motion/);
  await expect(page.locator('#tv-profile')).toBeVisible();
  await page.locator('#quick-access').getByRole('button',{name:/Profile/}).click();await expect(page.getByRole('heading',{name:'Behind the screen'})).toBeVisible();
  await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(true);
});

test('scene animation changes pixels and can be paused',async({page})=>{
  await page.goto('/');await expect(page.locator('#tv-profile')).toBeVisible();
  const canvas=page.locator('.room-stage canvas');
  const before=await canvas.screenshot();
  await page.waitForTimeout(1500);
  expect(Buffer.compare(before,await canvas.screenshot())).not.toBe(0);
  await page.getByRole('button',{name:'Reduce motion',exact:true}).click();
  const still=await canvas.screenshot();
  await page.waitForTimeout(500);
  expect(Buffer.compare(still,await canvas.screenshot())).toBe(0);
});
