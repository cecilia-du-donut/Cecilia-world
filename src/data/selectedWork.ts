export interface PlatformStat {
  label: string;
  value: string;
}

export interface PlatformPerformance {
  id: 'douyin' | 'xiaohongshu';
  name: string;
  accentColor: string;
  stats: PlatformStat[];
  screenshotSrc: string;
  screenshotAlt: string;
  screenshotCaption: string;
}

export interface ExternalPlatformLink {
  label: string;
  url: string;
}

export interface RichWorkProjectDetail {
  videoSrc: string;
  posterSrc: string;
  title: string;
  subtitle: string;
  introParagraphs: string[];
  creativeApproachParagraphs: string[];
  myRole: string;
  platforms: PlatformPerformance[];
  audienceResponse: {
    lead: string;
    quote: string;
  };
  externalLinks: ExternalPlatformLink[];
}

export interface RestaurantAudienceResponse {
  leadCopy: string;
  screenshotSrc: string;
  screenshotAlt: string;
  screenshotCaption: string;
  excerpts: {
    speaker: string;
    quote: string;
  }[];
  contextNote: string;
}

export interface RestaurantCollabCase {
  id: '01' | '02';
  slug: string;
  title: string;
  collaborationType: string;
  platform: 'Xiaohongshu';
  summary: string;
  scopeOfWork: string;
  coverSrc: string;
  coverAlt: string;
  videoSrc: string;
  stats: PlatformStat[];
  screenshotSrc: string;
  screenshotAlt: string;
  screenshotCaption: string;
  audienceResponse?: RestaurantAudienceResponse;
  externalUrl: string;
  externalLabel: string;
}

export type LocalDiscoveryCategorySlug =
  | 'restaurants'
  | 'vintage-shopping'
  | 'beauty-wellness-local-finds'
  | 'barcelona-rental-guide';

export interface LocalDiscoveryCategoryPlaceholderSlot {
  slotCode: string;
  title: string;
  description: string;
  formatLabel: string;
}

export interface ImageCollabCase {
  id: '01' | '02' | '03';
  slug: string;
  title: string;
  collaborationType: 'Commercial Collaboration';
  formatLabel: string;
  platform: 'Xiaohongshu';
  topicTitle: string;
  focusLabel: string;
  summary: string;
  scopeOfWork: string;
  screenshotSrc: string;
  screenshotAlt: string;
  screenshotCaption: string;
  analyticsNote: string;
  externalUrl: string;
  externalLabel: string;
}

export interface IndependentDiscoveryCase {
  slug: string;
  projectType: 'INDEPENDENT PROJECT';
  platform: 'Xiaohongshu';
  locationFeatured: string;
  title: string;
  subtitle: string;
  coverSrc: string;
  videoSrc: string;
  projectOverview: string;
  creativeApproach: string;
  myRole: string;
  stats: PlatformStat[];
  screenshotSrc: string;
  screenshotAlt: string;
  screenshotCaption: string;
  externalUrl: string;
  externalLabel: string;
}

export interface RentalGuideCase {
  id: '01' | '02';
  slug: string;
  title: string;
  contentType: 'INDEPENDENT CONTENT CREATION';
  platform: 'Xiaohongshu';
  subtitle: string;
  summary: string;
  highlightsLabel: string;
  highlights: string[];
  projectOverview: string;
  creativeApproach: string;
  myRole: string;
  coverSrc: string;
  coverAlt: string;
  coverCaption: string;
  stats: PlatformStat[];
  screenshotSrc: string;
  screenshotAlt: string;
  screenshotCaption: string;
  externalUrl: string;
  externalLabel: string;
}

export interface LocalDiscoveryCategory {
  id: '01' | '02' | '03' | '04';
  slug: LocalDiscoveryCategorySlug;
  title: string;
  classification:
    | 'Commercial Collaborations'
    | 'Independent Project'
    | 'Independent Content Creation';
  isCommercial: boolean;
  overviewDescription: string;
  statusLabel: string;
  coverSrc?: string;
  coverAlt?: string;
  breadcrumb: string;
  editorialSubtitle?: string;
  editorialIntro: string;
  /** Only populated for Restaurants right now */
  restaurants?: RestaurantCollabCase[];
  /** Commercial image-based content series (e.g., Beauty, Wellness & Local Finds) */
  imageCollabs?: ImageCollabCase[];
  /** Dedicated single-case independent project detail (e.g., Vintage Shopping) */
  independentCase?: IndependentDiscoveryCase;
  /** Independent short-form video guide series (e.g., Barcelona Rental Guide) */
  rentalGuides?: RentalGuideCase[];
  /** Structural archive slots for independent categories awaiting real media */
  placeholderSlots?: LocalDiscoveryCategoryPlaceholderSlot[];
}

export interface LocalDiscoveryCollection {
  overviewCrumb: string;
  overviewKicker: string;
  overviewTitle: string;
  overviewDescription: string;
  categories: LocalDiscoveryCategory[];
}

export interface BeautyStyleSubProject {
  id: '01' | '02';
  slug: 'the-retro-perm' | 'beauty-review';
  code: string;
  title: string;
  fullTitle: string;
  categoryTag: string;
  formatTag: string;
  subtitle: string;
  cardSummary: string;
  coverStatus: string;
  videoStatus: string;
  overview: string;
  myRole: string;
  performanceMetricsLabels: string[];
  performanceNote: string;
  externalPlatformLabel: string;
  externalStatusNote: string;
  accentBg: string;
  accentPrimary: string;
}

export interface BeautyPersonalStyleCollection {
  overviewCrumb: string;
  overviewKicker: string;
  overviewTitle: string;
  overviewSubtitle: string;
  overviewDescription: string;
  subProjects: BeautyStyleSubProject[];
}

export interface WorkSkeletonProject {
  id: '01' | '02' | '03' | '04';
  code: string;
  label: string;
  coverTitle?: string;
  fullTitle: string;
  summarySubtitle?: string;
  editionTag: string;
  /** Exact square frame border color inspired by the vinyl reference */
  frameColor: string;
  coverImage?: string;
  coverCaption?: {
    title: string;
    subtitle: string;
    imagePosition?: string;
  };
  coverCollage?: {
    primarySrc: string;
    secondarySrc?: string;
    title: string;
    subtitle: string;
  };
  coverArt: {
    bg: string;
    primary: string;
    secondary: string;
    ink: string;
    motif: 'arch' | 'wave' | 'star' | 'halo' | 'portrait-abstract';
  };
  detail?: RichWorkProjectDetail;
  collection?: LocalDiscoveryCollection;
  styleCollection?: BeautyPersonalStyleCollection;
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
    label: 'FOOD · VINTAGE · LOCAL LIFE',
    fullTitle: '01 — Barcelona Local Discovery',
    editionTag: 'ARCHIVE ISSUE 01',
    frameColor: '#EE9BE8', // Soft Bubblegum Lilac-Pink Border
    coverCollage: {
      primarySrc: '/assets/aistudio/xiaohongshu_screeshot_01_season_tapas_e0082b76.jpg',
      title: 'BARCELONA LOCAL DISCOVERY',
      subtitle: 'FOOD · VINTAGE · LOCAL LIFE',
    },
    coverArt: {
      bg: '#F8EFF6',
      primary: '#EE9BE8',
      secondary: '#F261A6',
      ink: '#481A34',
      motif: 'portrait-abstract',
    },
    collection: {
      overviewCrumb: '01 / SELECTED WORK · BARCELONA LOCAL DISCOVERY',
      overviewKicker: '01 / SERIES ARCHIVE · BARCELONA',
      overviewTitle: 'BARCELONA LOCAL DISCOVERY',
      overviewDescription:
        'A collection of local discoveries, independent guides and commercial collaborations created in Barcelona for Chinese-speaking audiences.',
      categories: [
        {
          id: '01',
          slug: 'restaurants',
          title: 'RESTAURANTS',
          classification: 'Commercial Collaborations',
          isCommercial: true,
          overviewDescription:
            'Commercial collaborations with local restaurants. Currently includes Season Tapas and Bodega Joan.',
          statusLabel: '02 COLLABORATIONS',
          coverSrc: '/assets/aistudio/cover_01_season_tapas_107e3b9f.jpg',
          coverAlt: 'Restaurants category cover featuring Season Tapas',
          breadcrumb: 'BARCELONA LOCAL DISCOVERY / RESTAURANT COLLABORATIONS',
          editorialIntro:
            'Commercial short-form collaborations created in partnership with local Barcelona restaurants — covering creative direction, filming, on-camera presentation, editing, and publishing on Xiaohongshu.',
          restaurants: [
        {
          id: '01',
          slug: 'season-tapas',
          title: 'Season Tapas',
          collaborationType: 'Commercial Collaboration',
          platform: 'Xiaohongshu',
          summary:
            'A commissioned dining feature created in partnership with Season Tapas in Barcelona, spotlighting their signature tapas, cozy interior atmosphere, and dining experience for Chinese-speaking local food explorers.',
          scopeOfWork:
            'Brand / restaurant collaboration covering creative concept, filming, on-camera hosting, editing, and Xiaohongshu publishing.',
          coverSrc: '/assets/aistudio/cover_01_season_tapas_107e3b9f.jpg',
          coverAlt: 'Season Tapas commercial collaboration cover',
          videoSrc: '/assets/aistudio/season_tapas_web.mp4',
          stats: [
            { value: '17.6K', label: 'Views' },
            { value: '524', label: 'Likes' },
            { value: '1,099', label: 'Saves' },
            { value: '32', label: 'Comments' },
          ],
          screenshotSrc: '/assets/aistudio/xiaohongshu_screeshot_01_season_tapas_e0082b76.jpg',
          screenshotAlt: 'Season Tapas Xiaohongshu performance screenshot',
          screenshotCaption: 'Xiaohongshu · Season Tapas (17.6K Views / 1,099 Saves)',
          audienceResponse: {
            leadCopy: 'Beyond views and engagement, the video inspired real-world action.',
            screenshotSrc: '/assets/aistudio/comments_a98c0d89.jpg',
            screenshotAlt: 'Season Tapas viewer comment screenshot with table photo on Xiaohongshu',
            screenshotCaption: 'Xiaohongshu · Real Viewer Comment Thread (Season Tapas)',
            excerpts: [
              {
                speaker: 'Viewer comment (shared with photo from Season Tapas)',
                quote: '“Eating here right now — delicious, recommended.”',
              },
              {
                speaker: 'Follow-up reply',
                quote:
                  '“I saw the video just as I was heading out to eat — two metro stops from Sagrada Família, so I came straight over.”',
              },
            ],
            contextNote: 'English translation of a real individual viewer response on Xiaohongshu.',
          },
          externalUrl: 'https://xhslink.cn/o/4Y9D8R8q0gd',
          externalLabel: 'VIEW ON XIAOHONGSHU',
        },
        {
          id: '02',
          slug: 'bodega-joan',
          title: 'Bodega Joan',
          collaborationType: 'Commercial Collaboration',
          platform: 'Xiaohongshu',
          summary:
            'A commercial storytelling feature produced in collaboration with traditional Barcelona eatery Bodega Joan, highlighting classic Catalan dishes, local neighborhood atmosphere, and authentic dining moments.',
          scopeOfWork:
            'Local hospitality collaboration spanning concept development, filming, on-camera presentation, editing, and Xiaohongshu publishing.',
          coverSrc: '/assets/aistudio/cover_02_bodega_joan_481ff380.jpg',
          coverAlt: 'Bodega Joan commercial collaboration cover',
          videoSrc: '/assets/aistudio/bodega_joan_web.mp4',
          stats: [
            { value: '~2.4K', label: 'Views' },
            { value: '48', label: 'Likes' },
            { value: '58', label: 'Saves' },
            { value: '2', label: 'Comments' },
          ],
          screenshotSrc: '/assets/aistudio/xiaohongshu_screeshot_02_bodega_joan_827b2c0a.PNG',
          screenshotAlt: 'Bodega Joan Xiaohongshu performance screenshot',
          screenshotCaption: 'Xiaohongshu · Bodega Joan (~2.4K Views / 58 Saves)',
          externalUrl: 'https://xhslink.cn/o/8Hvj2Dcq0TG',
          externalLabel: 'VIEW ON XIAOHONGSHU',
        },
          ],
        },
        {
          id: '02',
          slug: 'vintage-shopping',
          title: 'VINTAGE SHOPPING',
          classification: 'Independent Project',
          isCommercial: false,
          overviewDescription:
            "Independent content exploring Barcelona's vintage and second-hand shopping scene.",
          statusLabel: '01 PROJECT',
          coverSrc: '/assets/aistudio/cover_998d8198.jpg',
          coverAlt: 'Vintage Shopping category cover featuring Barcelona Vintage Hunt at HUMANA Vintage',
          breadcrumb: 'BARCELONA LOCAL DISCOVERY / VINTAGE SHOPPING',
          editorialIntro:
            "Exploring affordable vintage shopping in Barcelona, featuring a €25 Burberry find at HUMANA Vintage.",
          independentCase: {
            slug: 'barcelona-vintage-hunt',
            projectType: 'INDEPENDENT PROJECT',
            platform: 'Xiaohongshu',
            locationFeatured: 'HUMANA Vintage, Barcelona',
            title: 'BARCELONA VINTAGE HUNT',
            subtitle: 'Exploring affordable vintage shopping in Barcelona, featuring a €25 Burberry find.',
            coverSrc: '/assets/aistudio/cover_998d8198.jpg',
            videoSrc: '/assets/aistudio/barcelona_vintage_web.mp4',
            projectOverview:
              "An independently created local discovery video exploring Barcelona's vintage shopping scene. Featuring HUMANA Vintage, the video highlighted affordable second-hand fashion and an unexpected designer find — a Burberry piece for just €25.",
            creativeApproach:
              'The video combined a recognizable local shopping destination, an affordable-price angle and a personal on-camera experience to make vintage shopping more approachable and appealing to Chinese-speaking audiences.',
            myRole:
              'Independently handled the entire creative process, including concept development, location selection, filming, on-camera presentation, editing and publishing.',
            stats: [
              { value: '8,573', label: 'Views' },
              { value: '238', label: 'Likes' },
              { value: '330', label: 'Saves' },
              { value: '13', label: 'Comments' },
              { value: '133', label: 'Shares' },
            ],
            screenshotSrc: '/assets/aistudio/screenshot_d46f311c.jpg',
            screenshotAlt: 'Barcelona Vintage Hunt Xiaohongshu performance screenshot',
            screenshotCaption: 'Xiaohongshu · Barcelona Vintage Hunt (8,573 Views / 330 Saves)',
            externalUrl: 'https://xhslink.cn/o/AssttTBjXch',
            externalLabel: 'VIEW ON XIAOHONGSHU',
          },
        },
        {
          id: '03',
          slug: 'beauty-wellness-local-finds',
          title: 'BEAUTY, WELLNESS & LOCAL FINDS',
          classification: 'Commercial Collaborations',
          isCommercial: true,
          overviewDescription:
            'Commercial image-based content collaborations featuring local Spanish beauty, skincare and lifestyle products for Chinese-speaking audiences.',
          statusLabel: '03 COLLABORATIONS',
          coverSrc: '/assets/aistudio/_____e19d8067.PNG',
          coverAlt: 'Beauty, Wellness & Local Finds category cover featuring Spanish Pharmacy Finds',
          breadcrumb: 'BARCELONA LOCAL DISCOVERY / BEAUTY, WELLNESS & LOCAL FINDS',
          editorialIntro:
            'Commercial image-based content collaborations featuring local Spanish beauty, skincare and lifestyle products for Chinese-speaking audiences.',
          imageCollabs: [
            {
              id: '01',
              slug: 'spanish-pharmacy-finds',
              title: 'Spanish Pharmacy Finds',
              collaborationType: 'Commercial Collaboration',
              formatLabel: 'IMAGE POST',
              platform: 'Xiaohongshu',
              topicTitle: '第一次来西班牙，伴手礼别只会买火腿了！',
              focusLabel: 'Local Barcelona Pharmacy Collaboration',
              summary:
                'A commercial image-based collaboration promoting a local pharmacy in Barcelona, spotlighting practical Spanish dermo-cosmetic and skincare gift picks beyond traditional food souvenirs.',
              scopeOfWork:
                'Commercial image-carousel collaboration on Xiaohongshu covering creative framing, in-store photography, Chinese editorial copywriting, product selection curation, and publishing.',
              screenshotSrc: '/assets/aistudio/_____e19d8067.PNG',
              screenshotAlt: 'Spanish Pharmacy Finds original Xiaohongshu post screenshot',
              screenshotCaption: 'Xiaohongshu · Spanish Pharmacy Finds (Original Post Screenshot)',
              analyticsNote:
                'Analytics screenshot slot reserved — verified performance data will be added once an insights screenshot is provided.',
              externalUrl: 'https://xhslink.cn/o/3SzdAJLhqNH',
              externalLabel: 'VIEW ON XIAOHONGSHU',
            },
            {
              id: '02',
              slug: 'spanish-gift-edit',
              title: 'Spanish Gift Edit',
              collaborationType: 'Commercial Collaboration',
              formatLabel: 'IMAGE POST',
              platform: 'Xiaohongshu',
              topicTitle: '西班牙伴手礼清单｜朋友都夸我很会买！',
              focusLabel: 'Local Skincare & Fragrance Concept Store',
              summary:
                'A commercial image-based collaboration showcasing a local skincare and fragrance multi-brand boutique in Barcelona, curated as a thoughtful gift edit for travelers and Chinese-speaking shoppers.',
              scopeOfWork:
                'Commercial image-carousel collaboration on Xiaohongshu spanning store photography, visual collage direction, gift-guide copywriting, and publishing.',
              screenshotSrc: '/assets/aistudio/____ba77c8c9.PNG',
              screenshotAlt: 'Spanish Gift Edit original Xiaohongshu post screenshot',
              screenshotCaption: 'Xiaohongshu · Spanish Gift Edit (Original Post Screenshot)',
              analyticsNote:
                'Analytics screenshot slot reserved — verified performance data will be added once an insights screenshot is provided.',
              externalUrl: 'https://xhslink.cn/o/4SaBCcjEHUM',
              externalLabel: 'VIEW ON XIAOHONGSHU',
            },
            {
              id: '03',
              slug: 'skincare-in-spain',
              title: 'Skincare in Spain',
              collaborationType: 'Commercial Collaboration',
              formatLabel: 'IMAGE POST',
              platform: 'Xiaohongshu',
              topicTitle: '我是怎么在西班牙把皮肤养好的。',
              focusLabel: 'Local Spanish Dermo-Skincare Brand',
              summary:
                'A commercial image-based collaboration featuring a local Spanish pharmacy skincare brand, framed through a personal skincare routine story tailored for Chinese-speaking audiences.',
              scopeOfWork:
                'Commercial image-carousel collaboration on Xiaohongshu covering lifestyle visual storytelling, personal skincare narrative, Chinese editorial writing, and publishing.',
              screenshotSrc: '/assets/aistudio/pharmacy_dc9e4beb.PNG',
              screenshotAlt: 'Skincare in Spain original Xiaohongshu post screenshot',
              screenshotCaption: 'Xiaohongshu · Skincare in Spain (Original Post Screenshot)',
              analyticsNote:
                'Analytics screenshot slot reserved — verified performance data will be added once an insights screenshot is provided.',
              externalUrl: 'https://xhslink.cn/o/8i0KmuCU1gL',
              externalLabel: 'VIEW ON XIAOHONGSHU',
            },
          ],
        },
        {
          id: '04',
          slug: 'barcelona-rental-guide',
          title: 'BARCELONA RENTAL GUIDE',
          classification: 'Independent Content Creation',
          isCommercial: false,
          overviewDescription:
            'An independently produced short-form video series sharing personal rental experiences and practical housing advice in Barcelona.',
          statusLabel: '02 PROJECTS',
          coverSrc: '/assets/aistudio/cover_1_2ba6fbc3.jpg',
          coverAlt:
            'Barcelona Rental Guide category cover featuring From €800 to a Gaudí-designed Home',
          breadcrumb: 'BARCELONA LOCAL DISCOVERY / BARCELONA RENTAL GUIDE',
          editorialSubtitle: 'From Personal Experience to Practical Advice',
          editorialIntro:
            'An independently produced short-form video series sharing my personal rental journey in Barcelona and practical advice for navigating the local housing market — from finding a home and understanding rental platforms to spotting potential scams.',
          rentalGuides: [
            {
              id: '01',
              slug: 'from-800-to-gaudi-home',
              title: 'From €800 to a Gaudí-designed Home',
              contentType: 'INDEPENDENT CONTENT CREATION',
              platform: 'Xiaohongshu',
              subtitle:
                'A real Barcelona rental journey — moving into an award-winning Gaudí-designed building for €800+ per month.',
              summary:
                'Sharing my real experience searching, viewing, and renting a home in Barcelona — ultimately moving into an award-winning Gaudí-designed building at a monthly rent of just over €800.',
              highlightsLabel: 'Key Highlights',
              highlights: [
                'Personal storytelling based on a real rental journey.',
                'An unexpected and memorable housing discovery.',
                'The video continued to attract questions about the property even one year after publication.',
              ],
              projectOverview:
                'An independently created storytelling video recounting my actual experience searching, viewing, and renting an apartment in Barcelona — leading to an unexpected discovery: living in an award-winning building designed by Antoni Gaudí for just over €800 a month.',
              creativeApproach:
                'Rather than opening with generic housing tips, the episode centers on candid personal storytelling and an unexpected architectural reveal. Grounding the narrative in real details sparked sustained audience curiosity, continuing to generate viewer questions about the property even one year after publication.',
              myRole:
                'Original idea, content planning, scripting, filming, on-camera presentation, editing and publishing.',
              coverSrc: '/assets/aistudio/cover_1_2ba6fbc3.jpg',
              coverAlt:
                'From €800 to a Gaudí-designed Home original 9:16 vertical video cover',
              coverCaption:
                'Xiaohongshu · From €800 to a Gaudí-designed Home (Original 9:16 Video Cover)',
              stats: [
                { value: '16K+', label: 'Views' },
                { value: '613', label: 'Likes' },
                { value: '266', label: 'Saves' },
                { value: '117', label: 'Comments' },
              ],
              screenshotSrc: '/assets/aistudio/screenshot1_3e88359d.PNG',
              screenshotAlt:
                'From €800 to a Gaudí-designed Home Xiaohongshu performance screenshot',
              screenshotCaption:
                'Xiaohongshu · From €800 to a Gaudí-designed Home (16K+ Views / 117 Comments)',
              externalUrl: 'https://xhslink.cn/o/97W80sJF75n',
              externalLabel: 'VIEW ON XIAOHONGSHU',
            },
            {
              id: '02',
              slug: 'barcelona-rental-guide-avoid-scams',
              title: 'Barcelona Rental Guide: Avoid the Scams',
              contentType: 'INDEPENDENT CONTENT CREATION',
              platform: 'Xiaohongshu',
              subtitle:
                'Practical apartment-hunting steps, local rental platforms, and scam-prevention tips for Chinese-speaking renters.',
              summary:
                'A practical local rental guide created for Chinese-speaking audiences preparing to rent in Barcelona — covering platforms, real search steps, and scam red flags.',
              highlightsLabel: 'Topics Covered',
              highlights: [
                'Which rental platforms I used.',
                'The actual rental search process.',
                'Practical steps for finding accommodation.',
                'How to identify potential rental scams and avoid common pitfalls.',
              ],
              projectOverview:
                'An independently produced practical guide for Chinese-speaking students and newcomers looking to rent in Barcelona — walking through the platforms I used, how the search process actually works, and clear ways to spot potential scams.',
              creativeApproach:
                'Built around common pain points faced by first-time renters in Barcelona, the video organizes practical housing advice into clear, actionable steps. Its strong save volume (134 saves) and viewer questions reflect its ongoing reference value for audiences preparing to rent.',
              myRole:
                'Original idea, content planning, scripting, filming, on-camera presentation, editing and publishing.',
              coverSrc: '/assets/aistudio/cover_2_e3ab2179.jpg',
              coverAlt:
                'Barcelona Rental Guide: Avoid the Scams original 9:16 vertical video cover',
              coverCaption:
                'Xiaohongshu · Barcelona Rental Guide: Avoid the Scams (Original 9:16 Video Cover)',
              stats: [
                { value: '2.8K+', label: 'Views' },
                { value: '113', label: 'Likes' },
                { value: '134', label: 'Saves' },
                { value: '9', label: 'Comments' },
              ],
              screenshotSrc: '/assets/aistudio/screenshot_2_b5f611c5.PNG',
              screenshotAlt:
                'Barcelona Rental Guide: Avoid the Scams Xiaohongshu performance screenshot',
              screenshotCaption:
                'Xiaohongshu · Barcelona Rental Guide: Avoid the Scams (2.8K+ Views / 134 Saves)',
              externalUrl: 'https://xhslink.cn/o/4Vu3K5jXp4V',
              externalLabel: 'VIEW ON XIAOHONGSHU',
            },
          ],
        },
      ],
    },
  },
  {
    id: '02',
    code: 'SIDE A · 02',
    label: 'LANGUAGE · CULTURE · HUMOUR',
    fullTitle: '02 — Hunan × Spanish',
    editionTag: 'ARCHIVE ISSUE 02',
    frameColor: '#F5EF8E', // Pastel Lemon-Yellow Border
    coverImage: '/assets/aistudio/cover_25c8e3cb.jpg',
    coverCaption: {
      title: 'HUNAN × SPANISH',
      subtitle: 'LANGUAGE · CULTURE · HUMOUR',
      imagePosition: 'center 32%',
    },
    coverArt: {
      bg: '#23497D',
      primary: '#F5EF8E',
      secondary: '#8CC4A8',
      ink: '#FFF8DF',
      motif: 'wave',
    },
    detail: {
      videoSrc: '/assets/aistudio/hunan_spanish_web.mp4',
      posterSrc: '/assets/aistudio/cover_25c8e3cb.jpg',
      title: 'HUNAN × SPANISH',
      subtitle: 'A language coincidence that got people talking.',
      introParagraphs: [
        'It started with a funny discovery: some Spanish sounds were almost identical to expressions in Changsha dialect. One particularly unexpected similarity made me wonder how many other connections there might be between the two languages.',
        'I turned that observation into a short-form video, playing on the unexpected similarities between Hunanese and Spanish.',
      ],
      creativeApproachParagraphs: [
        'Rather than making another language-learning video, I built the story around a familiar local dialect and an unexpected cultural connection.',
        'The humour made the subject instantly relatable, while the language comparison gave viewers something to react to, discuss and share.',
      ],
      myRole:
        'An independently created project, from the original idea and creative direction to scripting, filming, on-camera presentation, editing and publishing.',
      platforms: [
        {
          id: 'douyin',
          name: 'Douyin',
          accentColor: '#F261A6',
          stats: [
            { value: '3.54M', label: 'Views' },
            { value: '95K', label: 'Likes' },
            { value: '3,193', label: 'Comments' },
            { value: '4,425', label: 'Saves' },
          ],
          screenshotSrc: '/assets/aistudio/screenshots_douyin_00ff7cbe.jpg',
          screenshotAlt: 'Douyin original post performance and comments screenshot',
          screenshotCaption: 'Douyin · 3.54M Views & Audience Comments',
        },
        {
          id: 'xiaohongshu',
          name: 'Xiaohongshu',
          accentColor: '#B8A8F8',
          stats: [
            { value: '231K', label: 'Views' },
            { value: '5,346', label: 'Likes' },
            { value: '563', label: 'Comments' },
            { value: '618', label: 'Saves' },
            { value: '1,736', label: 'Shares' },
          ],
          screenshotSrc: '/assets/aistudio/scrennshot_xiaohongshu_2f5bff8d.PNG',
          screenshotAlt: 'Xiaohongshu original post analytics screenshot',
          screenshotCaption: 'Xiaohongshu · 231K Views & Engagement Breakdown',
        },
      ],
      audienceResponse: {
        lead: 'The video sparked conversations across both platforms, with viewers sharing their own observations and joking:',
        quote: '“If only I’d known earlier — I should have learned Spanish!”',
      },
      externalLinks: [
        {
          label: 'WATCH ON DOUYIN',
          url: 'https://v.douyin.com/fYw4Jwm1EwA/',
        },
        {
          label: 'VIEW ON XIAOHONGSHU',
          url: 'https://xhslink.cn/o/AXUWSKM5Vmo',
        },
      ],
    },
  },
  {
    id: '03',
    code: 'SIDE A · 03',
    label: 'BEAUTY · STYLE · SELF-EXPRESSION',
    coverTitle: 'BEAUTY & PERSONAL STYLE',
    fullTitle: '03 — BEAUTY & PERSONAL STYLE',
    editionTag: 'ARCHIVE ISSUE 03',
    frameColor: '#B5A6F7', // Periwinkle Lavender Border
    coverArt: {
      bg: '#B89574',
      primary: '#F261A6',
      secondary: '#F8EFE6',
      ink: '#2C151E',
      motif: 'star',
    },
    styleCollection: {
      overviewCrumb: '03 / SELECTED WORK · BEAUTY & PERSONAL STYLE',
      overviewKicker: '03 / ARCHIVE SERIES · BEAUTY & PERSONAL STYLE',
      overviewTitle: 'BEAUTY & PERSONAL STYLE',
      overviewSubtitle: 'BEAUTY · STYLE · SELF-EXPRESSION',
      overviewDescription:
        'A curated pairing of two independent short-form video projects focused on hair transformation, beauty evaluation, and personal style storytelling. Select either sub-project below to view its dedicated cover, video container, creative role, metrics, and platform link.',
      subProjects: [
        {
          id: '01',
          slug: 'the-retro-perm',
          code: 'SUB-PROJECT 01',
          title: 'THE RETRO PERM',
          fullTitle: '01 — THE RETRO PERM',
          categoryTag: 'HAIR & PERSONAL STYLE',
          formatTag: 'SHORT-FORM VIDEO',
          subtitle: 'Retro perm experience, visual transformation, and styling diary.',
          cardSummary:
            'Independent video project documenting a vintage-inspired perm experience — preserving its dedicated cover, vertical video container, creative role, performance slot, and external post link.',
          coverStatus: 'DEDICATED COVER SLOT · 01 THE RETRO PERM',
          videoStatus: 'INDEPENDENT 9:16 VIDEO CONTAINER · AWAITING MP4 ASSET',
          overview:
            'Dedicated project overview slot for The Retro Perm — focused on hair transformation storytelling, salon atmosphere, and retro personal styling notes.',
          myRole:
            'Dedicated role container for concept development, on-camera experience, filming, editing, and publishing scope.',
          performanceMetricsLabels: ['Views', 'Likes', 'Saves', 'Comments'],
          performanceNote:
            'Independent performance archive reserved for verified metrics and screenshot evidence once linked.',
          externalPlatformLabel: 'EXTERNAL PLATFORM LINK · THE RETRO PERM',
          externalStatusNote: 'Platform post URL slot reserved for this sub-project.',
          accentBg: '#F6E7F1',
          accentPrimary: '#F261A6',
        },
        {
          id: '02',
          slug: 'beauty-review',
          code: 'SUB-PROJECT 02',
          title: 'BEAUTY REVIEW',
          fullTitle: '02 — BEAUTY REVIEW',
          categoryTag: 'MAKEUP & PRODUCT REVIEW',
          formatTag: 'SHORT-FORM VIDEO',
          subtitle: 'Cosmetics and beauty review spotlighting application, finish, and wear.',
          cardSummary:
            'Independent beauty review video project featuring makeup testing and honest product impressions — retaining its own cover, video container, creative role, performance slot, and platform link.',
          coverStatus: 'DEDICATED COVER SLOT · 02 BEAUTY REVIEW',
          videoStatus: 'INDEPENDENT 9:16 VIDEO CONTAINER · AWAITING MP4 ASSET',
          overview:
            'Dedicated project overview slot for Beauty Review — highlighting product storytelling, visual shade checks, and candid beauty commentary.',
          myRole:
            'Dedicated role container for product selection, script framing, close-up filming, editing, and publishing.',
          performanceMetricsLabels: ['Views', 'Likes', 'Saves', 'Comments'],
          performanceNote:
            'Independent performance archive reserved for verified metrics and screenshot evidence once linked.',
          externalPlatformLabel: 'EXTERNAL PLATFORM LINK · BEAUTY REVIEW',
          externalStatusNote: 'Platform post URL slot reserved for this sub-project.',
          accentBg: '#EFEAFC',
          accentPrimary: '#B5A6F7',
        },
      ],
    },
  },
  {
    id: '04',
    code: 'SIDE B · 04',
    label: 'BRAND STRATEGY · CREATIVE DIRECTION',
    coverTitle: 'WWJ COFFEE LAB',
    fullTitle: '04 — WWJ COFFEE LAB',
    summarySubtitle: 'Brand strategy, visual identity framing, and creative direction archive.',
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
