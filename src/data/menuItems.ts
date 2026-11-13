export interface MenuItem {
  id: string;
  title: string;
  path: string;
  subtitle: string;
  modules: string[];
  bagItemKey: 'about' | 'services' | 'experience' | 'work' | 'canvas' | 'contact';
  bagItemLabel: string;
  bagItemImage: string;
  bagItemAlt: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '01',
    title: 'ABOUT',
    path: '/about',
    subtitle: 'Editorial Biography & Creative Manifesto',
    modules: ['Profile & Philosophy', 'Creative Direction Approach', 'Press & Features'],
    bagItemKey: 'about',
    bagItemLabel: 'About',
    bagItemImage: '/assets/bag-items/item-about.png',
    bagItemAlt: 'Tortoiseshell sunglasses sticker labeled About — open About page',
  },
  {
    id: '02',
    title: 'SERVICES',
    path: '/services',
    subtitle: 'Brand Strategy, Campaigns & Visual Storytelling',
    modules: ['Creative Marketing', 'Editorial Content Production', 'Brand Collaborations'],
    bagItemKey: 'services',
    bagItemLabel: 'Services',
    bagItemImage: '/assets/bag-items/item-services.png',
    bagItemAlt: 'Red lipstick sticker labeled Services — open Services page',
  },
  {
    id: '03',
    title: 'EXPERIENCE / CV',
    path: '/experience',
    subtitle: 'Career Timeline, Roles & Academic Background',
    modules: ['Professional Roles', 'Selected Clients & Houses', 'Education & Recognition'],
    bagItemKey: 'experience',
    bagItemLabel: 'Experience / CV',
    bagItemImage: '/assets/bag-items/item-experience.png',
    bagItemAlt: 'Burgundy leather notebook sticker labeled Experience / CV — open Experience page',
  },
  {
    id: '04',
    title: 'SELECTED WORK',
    path: '/work',
    subtitle: 'Curated Campaigns, Visual Essays & Case Studies',
    modules: ['Campaign Direction', 'Editorial Shoots', 'Digital Launches'],
    bagItemKey: 'work',
    bagItemLabel: 'Selected Work',
    bagItemImage: '/assets/bag-items/item-work.png',
    bagItemAlt: 'Red Polaroid camera sticker labeled Selected Work — open Selected Work page',
  },
  {
    id: '05',
    title: 'PERSONAL CANVAS',
    path: '/canvas',
    subtitle: 'Visual Experiments, Moodboards & Scrapbook Studies',
    modules: ['Collage & Print Studies', 'Analog Photography', 'Visual Notes'],
    bagItemKey: 'canvas',
    bagItemLabel: 'Personal Canvas',
    bagItemImage: '/assets/bag-items/item-canvas.png',
    bagItemAlt: 'Pink perfume bottle sticker labeled Personal Canvas — open Personal Canvas page',
  },
  {
    id: '06',
    title: 'CONTACT',
    path: '/contact',
    subtitle: 'Inquiries, Commissions & Social Channels',
    modules: ['Direct Email & Studio Desk', 'Collaboration Briefs', 'Social Directory'],
    bagItemKey: 'contact',
    bagItemLabel: 'Contact',
    bagItemImage: '/assets/bag-items/item-contact.png',
    bagItemAlt: 'Pink flip phone sticker labeled Contact — open Contact page',
  },
];

export function findMenuItemByPath(pathname: string): MenuItem | undefined {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '').toLowerCase();
  return MENU_ITEMS.find((item) => item.path === normalized);
}
