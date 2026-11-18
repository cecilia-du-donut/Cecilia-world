export interface WorkSkeletonProject {
  id: '01' | '02' | '03' | '04' | '05';
  code: string;
  label: string;
  fullTitle: string;
  editionTag: string;
  /** Exact square frame border color inspired by the vinyl reference */
  frameColor: string;
  coverArt: {
    bg: string;
    primary: string;
    secondary: string;
    ink: string;
    motif: 'arch' | 'wave' | 'star' | 'halo' | 'portrait-abstract';
  };
}

export const SELECTED_WORK_INTRO = {
  titlePrimary: 'SELECTED WORK',
  titleSecondary: 'THE CREATIVE ARCHIVE',
  subtitle: 'A collection of ideas, stories and experiments.',
};

export const WORK_SKELETON_PROJECTS: WorkSkeletonProject[] = [
  {
    id: '01',
    code: 'SIDE A · 01',
    label: 'PROJECT ONE',
    fullTitle: '01 — PROJECT ONE',
    editionTag: 'ARCHIVE ISSUE 01',
    frameColor: '#EE9BE8', // Soft Bubblegum Lilac-Pink Border
    coverArt: {
      bg: '#F8EFF6',
      primary: '#EE9BE8',
      secondary: '#F261A6',
      ink: '#481A34',
      motif: 'portrait-abstract',
    },
  },
  {
    id: '02',
    code: 'SIDE A · 02',
    label: 'PROJECT TWO',
    fullTitle: '02 — PROJECT TWO',
    editionTag: 'ARCHIVE ISSUE 02',
    frameColor: '#F5EF8E', // Pastel Lemon-Yellow Border
    coverArt: {
      bg: '#23497D',
      primary: '#F5EF8E',
      secondary: '#8CC4A8',
      ink: '#FFF8DF',
      motif: 'wave',
    },
  },
  {
    id: '03',
    code: 'SIDE A · 03',
    label: 'PROJECT THREE',
    fullTitle: '03 — PROJECT THREE',
    editionTag: 'ARCHIVE ISSUE 03',
    frameColor: '#B5A6F7', // Periwinkle Lavender Border
    coverArt: {
      bg: '#B89574',
      primary: '#F261A6',
      secondary: '#F8EFE6',
      ink: '#2C151E',
      motif: 'star',
    },
  },
  {
    id: '04',
    code: 'SIDE B · 04',
    label: 'PROJECT FOUR',
    fullTitle: '04 — PROJECT FOUR',
    editionTag: 'ARCHIVE ISSUE 04',
    frameColor: '#9BCBF8', // Baby Sky-Blue Border
    coverArt: {
      bg: '#38342E',
      primary: '#F2DF98',
      secondary: '#9BCBF8',
      ink: '#FFF7E8',
      motif: 'halo',
    },
  },
  {
    id: '05',
    code: 'SIDE B · 05',
    label: 'PROJECT FIVE',
    fullTitle: '05 — PROJECT FIVE',
    editionTag: 'ARCHIVE ISSUE 05',
    frameColor: '#B9ECA4', // Fresh Pistachio-Mint Border
    coverArt: {
      bg: '#8C3B78',
      primary: '#F7C9B6',
      secondary: '#B9ECA4',
      ink: '#FFF4EE',
      motif: 'arch',
    },
  },
];

export const WORK_DETAIL_SECTIONS = [
  {
    key: 'overview',
    heading: 'Project Overview',
    placeholder:
      'Placeholder container for project context, background, and objective summary.',
  },
  {
    key: 'strategy',
    heading: 'The Creative Idea / Strategy',
    placeholder:
      'Placeholder container for creative concept, strategic framing, or narrative angle.',
  },
  {
    key: 'role',
    heading: 'My Role',
    placeholder:
      'Placeholder container for responsibilities, direction scope, and execution notes.',
  },
  {
    key: 'results',
    heading: 'Results',
    placeholder:
      'Placeholder container for verified outcomes, impact notes, or deliverables.',
  },
] as const;
