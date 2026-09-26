export type PanelId = 'profile' | 'skills' | 'interests' | 'experience' | 'projects' | 'contact';
export const panelIds: PanelId[] = ['profile', 'skills', 'experience', 'projects', 'interests', 'contact'];
export const languages = [{ id: 'en', label: 'English' }, { id: 'zh-TW', label: '繁體中文' }, { id: 'zh-CN', label: '简体中文' }, { id: 'ja', label: '日本語' }, { id: 'ko', label: '한국어' }];

// Paths are relative to public/. Empty links are intentionally disabled.
export const assets = {
  avatar: '', resumePdf: '',
  audio: { click: 'audio/click-ui-soft.wav', open: 'audio/panel-open.wav', close: 'audio/panel-close.wav', bgm: 'audio/game-loop.wav' },
};
export const contact = { email: '', github: '', linkedin: '' };
export const projectLinks: Record<string, { demo: string; source: string; caseStudy: string }> = {
  'neon-dashboard': { demo: '', source: '', caseStudy: '' },
  'pixel-portfolio': { demo: '', source: '', caseStudy: '' },
  'api-control-room': { demo: '', source: '', caseStudy: '' },
  'game-ui': { demo: '', source: '', caseStudy: '' },
};
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

// Coordinates match the room's 840 x 700 logical canvas.
export const hotspots: { id: string; panel: PanelId; x: number; y: number; width: number; height: number; labelX: number; labelY: number }[] = [
  { id: 'tv-profile', panel: 'profile', x: 568, y: 320, width: 112, height: 100, labelX: 653, labelY: 329 },
  { id: 'desk-skills', panel: 'skills', x: 313, y: 319, width: 140, height: 110, labelX: 235, labelY: 302 },
  { id: 'sofa-interests', panel: 'interests', x: 268, y: 435, width: 156, height: 110, labelX: 218, labelY: 486 },
  { id: 'poster-experience', panel: 'experience', x: 478, y: 158, width: 62, height: 108, labelX: 487, labelY: 87 },
  { id: 'jukebox-projects', panel: 'projects', x: 601, y: 413, width: 78, height: 112, labelX: 674, labelY: 440 },
];
