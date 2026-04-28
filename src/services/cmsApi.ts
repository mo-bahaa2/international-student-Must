import type {
  Academics,
  Announcements,
  CmsMediaFile,
  ContactUs,
  Homepage,
  Questionnaires,
  Resources,
} from '../types/strapi';
import { supabase } from './supabase';

const getTable = (envName: string, fallback: string) => {
  const value = import.meta.env[envName];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
};

const TABLES = {
  pages: getTable('VITE_SUPABASE_PAGES_TABLE', ''),
  homepage: getTable('VITE_SUPABASE_HOMEPAGE_TABLE', ''),
  academics: getTable('VITE_SUPABASE_ACADEMICS_TABLE', ''),
  questionnaires: getTable('VITE_SUPABASE_QUESTIONNAIRES_TABLE', ''),
  resources: getTable('VITE_SUPABASE_STUDENT_RESOURCES_TABLE', 'student_resources'),
  advisorResources: getTable('VITE_SUPABASE_ADVISOR_RESOURCES_TABLE', 'advisor_resources'),
  announcements: getTable('VITE_SUPABASE_ANNOUNCEMENTS_TABLE', ''),
  contactUs: getTable('VITE_SUPABASE_CONTACT_US_TABLE', ''),
  homeSections: getTable('VITE_SUPABASE_HOME_SECTIONS_TABLE', 'home_sections'),
  activities: getTable('VITE_SUPABASE_ACTIVITIES_TABLE', 'activities'),
  staff: getTable('VITE_SUPABASE_STAFF_TABLE', 'staff'),
  events: getTable('VITE_SUPABASE_EVENTS_TABLE', 'events'),
  news: getTable('VITE_SUPABASE_NEWS_TABLE', 'news'),
  studyPlans: getTable('VITE_SUPABASE_STUDY_PLANS_TABLE', 'study_plans'),
  schedules: getTable('VITE_SUPABASE_SCHEDULES_TABLE', 'schedules'),
  calendars: getTable('VITE_SUPABASE_CALENDARS_TABLE', 'calendars'),
  heroSlides: getTable('VITE_SUPABASE_GALLERY_TABLE', 'photo_gallery'),
  honorListDocs: getTable('VITE_SUPABASE_STUDENT_HONOR_LIST_TABLE', 'student_honor_list_documents'),
  facilities: getTable('VITE_SUPABASE_FACILITIES_TABLE', 'facilities'),
  // Intentionally no default to avoid 404s when this table is not provisioned yet.
  heroMenus: getTable('VITE_SUPABASE_HERO_MENU_TABLE', ''),
  importantLinks: getTable('VITE_SUPABASE_IMPORTANT_LINKS_TABLE', 'important_links'),
  academicAdvising: getTable('VITE_SUPABASE_ACADEMIC_ADVISING_TABLE', 'academic_advising'),
  homeSections: getTable('VITE_SUPABASE_HOME_SECTIONS_TABLE', 'home_sections'),
  internationalHandbook: getTable('VITE_SUPABASE_INTERNATIONAL_HANDBOOK_TABLE', 'international_handbook_documents'),
  smartElearning: getTable('VITE_SUPABASE_SMART_ELEARNING_TABLE', 'smart_elearning_videos'),
  contactInfo: getTable('VITE_SUPABASE_CONTACT_INFO_TABLE', 'contact_information'),
  admissionSections: getTable('VITE_SUPABASE_ADMISSION_SECTIONS_TABLE', 'admission_sections'),
  registrationVideos: getTable('VITE_SUPABASE_REGISTRATION_VIDEOS_TABLE', 'registration_videos'),
  facilitiesSections: getTable('VITE_SUPABASE_FACILITIES_SECTIONS_TABLE', 'facilities_sections'),
  contactSubmissions: getTable('VITE_SUPABASE_CONTACT_SUBMISSIONS_TABLE', 'contact_submissions'),
} as const;

const STORAGE_BUCKETS = {
  staff: getTable('VITE_SUPABASE_IMAGE_BUCKET', 'staff'),
  staffCv: getTable('VITE_SUPABASE_CV_BUCKET', getTable('VITE_SUPABASE_IMAGE_BUCKET', 'staff')),
  news: getTable('VITE_SUPABASE_NEWS_IMAGES_BUCKET', 'news-images'),
  events: getTable('VITE_SUPABASE_EVENT_IMAGES_BUCKET', 'event-images'),
  activities: getTable('VITE_SUPABASE_ACTIVITIES_IMAGES_BUCKET', 'activity-images'),
  resources: getTable('VITE_SUPABASE_RESOURCES_FILES_BUCKET', 'resources-files'),
  honorList: getTable('VITE_SUPABASE_HONOR_LIST_FILES_BUCKET', 'honor-list-files'),
  studyPlans: getTable('VITE_SUPABASE_STUDY_PLAN_FILES_BUCKET', 'study-plan-files'),
  schedules: getTable('VITE_SUPABASE_SCHEDULE_FILES_BUCKET', 'schedule-files'),
  calendars: getTable('VITE_SUPABASE_CALENDAR_FILES_BUCKET', 'calendar-files'),
  gallery: getTable('VITE_SUPABASE_GALLERY_BUCKET', 'gallery'),
  avatars: getTable('VITE_SUPABASE_AVATARS_BUCKET', 'avatars'),
  importantLinks: getTable('VITE_SUPABASE_IMPORTANT_LINKS_IMAGES_BUCKET', 'important-links-images'),
  facilitiesImages: getTable('VITE_SUPABASE_FACILITIES_IMAGES_BUCKET', 'facilities-images'),
  internationalHandbookFiles: getTable('VITE_SUPABASE_INTERNATIONAL_HANDBOOK_FILES_BUCKET', 'international-handbook-files'),
  admissionFiles: getTable('VITE_SUPABASE_ADMISSION_FILES_BUCKET', 'admission-files'),
  homeImages: getTable('VITE_SUPABASE_HOME_IMAGES_BUCKET', 'home-images'),
  homeFiles: getTable('VITE_SUPABASE_HOME_FILES_BUCKET', 'home-files'),
} as const;

export type EventCardItem = {
  id: string;
  title: string;
  description: string;
  day: string;
  month: string;
  timeRange: string;
  href: string;
  imageUrl: string;
  imageUrls: string[];
};

export type NewsCardItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageUrls: string[];
};

export type ImportantLinkItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
};

export type AcademicAdvisingDocument = {
  id: string;
  title: string;
  fileUrl: string;
};

export type HomeSectionItem = {
  sectionKey: string;
  title: string | null;
  contentText: string | null;
  imageUrl: string | null;
  fileUrl: string | null;
};

export type InternationalHandbookDocument = {
  key: string;
  title: string;
  fileUrl: string;
};

export type SmartElearningVideo = {
  id: string;
  title: string;
  sourceType: 'youtube' | 'upload';
  youtubeUrl: string | null;
  videoUrl: string | null;
};

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  mapLink: string | null;
};

export type AdmissionAttachment = {
  id: string;
  title: string;
  fileUrl: string;
  fileType: string;
};

export type AdmissionSection = {
  sectionKey: string;
  steps: string[];
  attachments: AdmissionAttachment[];
};

export type RegistrationVideo = {
  id: string;
  title: string;
  sourceType: 'youtube' | 'upload';
  youtubeUrl: string | null;
  videoUrl: string | null;
};

export type FacilitySection = {
  id: string;
  sectionType: string;
  title: string;
  contentHtml: string;
  thumbnailUrl: string | null;
  galleryUrls: string[];
};

export type ActivityType = 'sport' | 'cultural' | 'art' | 'student club';

export type HeroSlideItem = {
  id: string;
  src: string;
  title: string;
};

export type HomeSectionKey = 'about-sector' | 'mission' | 'vision' | 'sector-plan';

export type HomeSectionContent = {
  sectionKey: HomeSectionKey;
  title: string | null;
  contentText: string | null;
  imageUrl: string | null;
  fileUrl: string | null;
  updatedAt: string | null;
};

export type FacilitiesSectionType = 'must-facilities' | 'international-students-handbook';

export type FacilityItem = {
  id: string;
  sectionType: FacilitiesSectionType;
  title: string;
  contentHtml: string;
  thumbnailUrl: string | null;
  galleryUrls: string[];
  createdAt: string | null;
  updatedAt: string | null;
};

export type InternationalHandbookItem = {
  key: string;
  title: string;
  fileUrl: string;
  updatedAt: string | null;
};

function normalizeHomeSectionKey(value: unknown): HomeSectionKey | null {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase().replace(/[_\s]+/g, '-');
  if (
    normalized === 'about-sector' ||
    normalized === 'mission' ||
    normalized === 'vision' ||
    normalized === 'sector-plan'
  ) {
    return normalized;
  }

  return null;
}

export type ScheduleItem = {
  id: string;
  scheduleType: string;
  semester: string;
  year: number;
  fileUrl: string;
};

export type CalendarItem = {
  id: string;
  programLevel: string;
  year: number;
  fileUrl: string;
};

export type StudentResourceItem = {
  id: string;
  title: string;
  category: string;
  resourceType: string;
  resourceUrl: string;
  description?: string;
  duration?: string;
  thumbnailUrl?: string;
};

export type AdvisorResourceItem = {
  id: string;
  title: string;
  resourceType: 'file' | 'link' | 'video';
  resourceUrl: string;
  description?: string;
  duration?: string;
  thumbnailUrl?: string;
};

export type HonorListDocumentItem = {
  id: string;
  title: string;
  fileUrl: string;
  updatedAt: string;
};

export type AcademicStaffItem = {
  title?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  name: string;
  role: string;
  specialty?: string;
  department?: string;
  email?: string;
  bio?: string;
  googleScholarLink?: string;
  cvLabel?: string;
  avatarUrl: string;
  cvUrl: string;
};

type HeroNavTarget = '_self' | '_blank';

type HeroNavRole = 'public' | 'visitor' | 'college-member';

export type HeroNavTreeItem = {
  title: string;
  url: string;
  target: HeroNavTarget;
  accessRole: HeroNavRole;
  children: HeroNavTreeItem[];
};

const DEFAULT_HERO_NAV_TREE: HeroNavTreeItem[] = [
  { title: 'Home', url: '/', target: '_self', accessRole: 'public', children: [] },
  {
    title: 'Academics',
    url: '/academics',
    target: '_self',
    accessRole: 'public',
    children: [
      { title: 'Academic Staff', url: '/academics', target: '_self', accessRole: 'public', children: [] },
      { title: 'Undergraduate Programs', url: '/undergraduate', target: '_self', accessRole: 'public', children: [] },
      { title: 'Postgraduate Programs', url: '/postgraduate', target: '_self', accessRole: 'public', children: [] },
      { title: 'Academic Advising', url: '/academic-advising', target: '_self', accessRole: 'public', children: [] },
      { title: 'Registeration', url: '/Registeration', target: '_self', accessRole: 'public', children: [] },
      { title: 'Schedules', url: '/schedules', target: '_self', accessRole: 'public', children: [] },
      { title: 'Calendar', url: '/calendar', target: '_self', accessRole: 'public', children: [] },
      { title: 'Honor List', url: '/honor-list', target: '_self', accessRole: 'public', children: [] },
      { title: 'E-Learning', url: '/e-learning', target: '_self', accessRole: 'public', children: [] },
      { title: 'How To Apply', url: '/how-to-apply', target: '_self', accessRole: 'public', children: [] },
    ],
  },
  { title: 'Advising', url: '/advising', target: '_self', accessRole: 'public', children: [] },
  {
    title: 'Activities',
    url: '/activities',
    target: '_self',
    accessRole: 'public',
    children: [
      {
        title: 'Student Activity',
        url: '/activities',
        target: '_self',
        accessRole: 'public',
        children: [
          { title: 'Cultural', url: '/cultural', target: '_self', accessRole: 'public', children: [] },
          { title: 'Sports', url: '/sports', target: '_self', accessRole: 'public', children: [] },
          { title: 'Art', url: '/art', target: '_self', accessRole: 'public', children: [] },
        ],
      },
      { title: 'Student Clubs', url: '/student-clubs', target: '_self', accessRole: 'public', children: [] },
    ],
  },
  { title: 'Facilities', url: '/facilities', target: '_self', accessRole: 'public', children: [] },
  { title: 'News', url: '/news', target: '_self', accessRole: 'public', children: [] },
  { title: 'Events', url: '/events', target: '_self', accessRole: 'public', children: [] },
  { title: 'Contact Us', url: '/contact-us', target: '_self', accessRole: 'public', children: [] },
];

const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);

const toId = (value: unknown): string => {
  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return crypto?.randomUUID?.() || `id-${Date.now()}`;
};

const pickString = (...values: unknown[]): string | undefined => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return undefined;
};

const toArray = (value: unknown): unknown[] => {
  if (Array.isArray(value)) {
    return value;
  }

  if (isObject(value) && Array.isArray(value.data)) {
    return value.data;
  }

  return [];
};

const unwrapRow = <T>(value: T): T => {
  if (!isObject(value)) {
    return value;
  }

  if (isObject(value.attributes)) {
    return {
      ...value,
      ...value.attributes,
    } as T;
  }

  return value;
};

function extractMediaFile(media: unknown): CmsMediaFile | null {
  const candidate = isObject(media) && isObject(media.data) ? media.data : media;
  if (!isObject(candidate)) {
    return null;
  }

  const url = pickString(candidate.url, isObject(candidate.attributes) ? candidate.attributes.url : undefined);
  if (!url) {
    return null;
  }

  const attributes = isObject(candidate.attributes) ? candidate.attributes : {};

  return {
    id: typeof candidate.id === 'number' ? candidate.id : undefined,
    url,
    alternativeText: pickString(candidate.alternativeText, attributes.alternativeText),
    caption: pickString(candidate.caption, attributes.caption),
    name: pickString(candidate.name, attributes.name),
    mime: pickString(candidate.mime, attributes.mime),
    ext: pickString(candidate.ext, attributes.ext),
    width: typeof candidate.width === 'number' ? candidate.width : (typeof attributes.width === 'number' ? attributes.width : undefined),
    height: typeof candidate.height === 'number' ? candidate.height : (typeof attributes.height === 'number' ? attributes.height : undefined),
    size: typeof candidate.size === 'number' ? candidate.size : (typeof attributes.size === 'number' ? attributes.size : undefined),
  };
}

function extractMediaUrls(...mediaFields: unknown[]): string[] {
  const urls: string[] = [];

  const append = (value: unknown) => {
    if (!value) {
      return;
    }

    if (typeof value === 'string') {
      urls.push(getCmsMediaUrl(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(append);
      return;
    }

    if (isObject(value) && Array.isArray(value.data)) {
      value.data.forEach(append);
      return;
    }

    if (!isObject(value)) {
      return;
    }

    const url = pickString(value.url, isObject(value.attributes) ? value.attributes.url : undefined);
    if (url) {
      urls.push(getCmsMediaUrl(url));
    }
  };

  mediaFields.forEach(append);
  return Array.from(new Set(urls));
}

function normalizeBlocks(blocks: unknown): Homepage['blocks'] {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks
    .map((rawBlock) => {
      const block = unwrapRow(rawBlock);
      if (!isObject(block)) {
        return null;
      }

      const component = pickString(block.__component, block.type) || '';

      if (component === 'shared.rich-text' || component === 'rich-text') {
        const body = pickString(block.body, block.content);
        if (!body) {
          return null;
        }

        return {
          __component: 'shared.rich-text' as const,
          body,
          anchor: pickString(block.anchor),
        };
      }

      if (component === 'shared.quote' || component === 'quote') {
        const title = pickString(block.title, block.author) || '';
        const body = pickString(block.body, block.quote) || '';

        if (!title && !body) {
          return null;
        }

        return {
          __component: 'shared.quote' as const,
          title,
          body,
          anchor: pickString(block.anchor),
        };
      }

      if (component === 'shared.media' || component === 'media') {
        const file = extractMediaFile(block.file || block.media);
        if (!file) {
          return null;
        }

        return {
          __component: 'shared.media' as const,
          file,
          anchor: pickString(block.anchor),
        };
      }

      if (component === 'shared.slider' || component === 'slider') {
        const files = toArray(block.files || block.slides)
          .map((item) => extractMediaFile(item))
          .filter((item): item is CmsMediaFile => item !== null);

        if (!files.length) {
          return null;
        }

        return {
          __component: 'shared.slider' as const,
          files,
          anchor: pickString(block.anchor),
        };
      }

      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

function normalizeSingleTypeResponse<T extends { blocks?: unknown }>(data: T): T {
  const row = unwrapRow(data);

  return {
    ...row,
    blocks: normalizeBlocks(row.blocks),
  } as T;
}

function isMissingTableError(error: unknown): boolean {
  if (!isObject(error)) {
    return false;
  }

  const code = pickString(error.code);
  if (code === 'PGRST205') {
    return true;
  }

  const message = (pickString(error.message) || '').toLowerCase();
  return message.includes('could not find the table') || message.includes('relation') && message.includes('does not exist');
}

function toFallbackSingleType(title: string, subtitle?: string): Homepage {
  return {
    id: 0,
    title,
    subtitle,
    blocks: [],
  };
}

async function fetchSingle<T extends { blocks?: unknown }>(
  tableName: string,
  fallbackData?: T,
): Promise<T> {
  if (!tableName) {
    if (fallbackData) {
      return fallbackData;
    }

    throw new Error('Supabase table is not configured for this page.');
  }

  const { data, error } = await supabase.from(tableName).select('*').limit(1).maybeSingle<T>();

  if (error) {
    if (fallbackData && isMissingTableError(error)) {
      return fallbackData;
    }

    throw new Error(error.message);
  }

  if (!data) {
    if (fallbackData) {
      return fallbackData;
    }

    throw new Error(`No rows found in table ${tableName}.`);
  }

  return normalizeSingleTypeResponse(data);
}

export async function getHomepage(): Promise<Homepage> {
  return fetchSingle<Homepage>(TABLES.homepage, toFallbackSingleType('Home'));
}

export async function getPageBySlug(slug: string): Promise<Homepage> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) {
    throw new Error('Page slug is required.');
  }

  if (TABLES.pages) {
    const { data, error } = await supabase
      .from(TABLES.pages)
      .select('*')
      .eq('slug', normalizedSlug)
      .limit(1)
      .maybeSingle<Homepage>();

    if (!error && data) {
      return normalizeSingleTypeResponse(data);
    }

    if (error && !isMissingTableError(error)) {
      throw new Error(error.message);
    }
  }

  const activitySlugMap: Record<string, string> = {
    cultural: 'cultural',
    sports: 'sport',
    art: 'art',
    'student-clubs': 'student club',
  };

  const activityType = activitySlugMap[normalizedSlug];
  if (activityType && TABLES.activities) {
    const { data, error } = await supabase
      .from(TABLES.activities)
      .select('*')
      .eq('activity_type', activityType)
      .order('created_at', { ascending: false });

    if (error && !isMissingTableError(error)) {
      throw new Error(error.message);
    }

    if (data && data.length > 0) {
      const first = unwrapRow(data[0]) as Record<string, unknown>;
      const description = pickString(first.description) || `No content available for ${normalizedSlug}.`;

      return {
        id: 0,
        title: pickString(first.title) || normalizedSlug.replace(/-/g, ' '),
        slug: normalizedSlug,
        blocks: [
          {
            __component: 'shared.rich-text',
            body: description,
          },
        ],
      };
    }
  }

  return toFallbackSingleType(normalizedSlug.replace(/-/g, ' '));
}

export async function getAcademics(): Promise<Academics> {
  return fetchSingle<Academics>(TABLES.academics, toFallbackSingleType('Academics'));
}

export async function getQuestionnaires(): Promise<Questionnaires> {
  return fetchSingle<Questionnaires>(TABLES.questionnaires, toFallbackSingleType('Questionnaires'));
}

export async function getResources(): Promise<Resources> {
  if (!TABLES.resources) {
    return toFallbackSingleType('Resources') as Resources;
  }

  const { data, error } = await supabase
    .from(TABLES.resources)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    if (isMissingTableError(error)) {
      return toFallbackSingleType('Resources') as Resources;
    }

    throw new Error(error.message);
  }

  const rows = (data || []).map((row) => unwrapRow(row) as Record<string, unknown>);
  if (!rows.length) {
    return toFallbackSingleType('Resources') as Resources;
  }

  const markdownLines = rows.map((row) => {
    const title = pickString(row.title) || 'Resource';
    const resourceUrl = pickString(row.resource_url, row.url);
    const filePath = pickString(row.file_path);
    const targetUrl = resourceUrl || (filePath ? getCmsMediaUrl(filePath) : undefined);

    return targetUrl ? `- [${title}](${targetUrl})` : `- ${title}`;
  });

  return {
    id: 0,
    title: 'Resources',
    subtitle: 'Helpful documents and links',
    blocks: [
      {
        __component: 'shared.rich-text',
        body: markdownLines.join('\n'),
      },
    ],
  } as Resources;
}

export async function getStudentResourcesByCategory(category: string): Promise<StudentResourceItem[]> {
  if (!TABLES.resources) {
    return [];
  }

  const normalizedCategory = category.trim();
  if (!normalizedCategory) {
    return [];
  }

  const { data, error } = await supabase
    .from(TABLES.resources)
    .select('*')
    .eq('category', normalizedCategory)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const filePath = pickString(row.file_path, row.filePath);
    const resourceUrl = pickString(row.resource_url, row.url) || (filePath ? getCmsMediaUrl(filePath) : '#');
    const thumbnailRaw = pickString(row.thumbnail_url, row.thumbnailUrl, row.poster_url, row.posterUrl, row.image_url, row.imageUrl);
    const durationRaw = row.duration ?? row.video_duration ?? row.videoDuration ?? row.duration_label ?? row.durationLabel;

    let duration: string | undefined;
    if (typeof durationRaw === 'string' && durationRaw.trim()) {
      duration = durationRaw.trim();
    } else if (typeof durationRaw === 'number' && Number.isFinite(durationRaw) && durationRaw > 0) {
      duration = `${Math.round(durationRaw)} sec`;
    }

    return {
      id: toId(row.id),
      title: pickString(row.title) || 'Resource',
      category: pickString(row.category) || '',
      resourceType: pickString(row.resource_type, row.resourceType) || 'file',
      resourceUrl,
      description: pickString(row.description, row.summary, row.details),
      duration,
      thumbnailUrl: thumbnailRaw ? getCmsMediaUrl(thumbnailRaw) : undefined,
    };
  });
}

export async function getHonorListDocuments(): Promise<HonorListDocumentItem[]> {
  const { data, error } = await supabase
    .from(TABLES.honorListDocs)
    .select('*')
    .order('updated_at', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const key = pickString(row.key) || toId(row.id);
    const filePath = pickString(row.file_path, row.filePath, row.path, row.url);

    return {
      id: toId(row.id) || key,
      title:
        pickString(row.title, row.name) ||
        (key === 'current' ? 'Honor List' : `Honor List (${key})`),
      fileUrl: filePath ? getFileUrl(filePath) : '#',
      updatedAt: pickString(row.updated_at, row.created_at) || '',
    };
  }).filter((item) => item.fileUrl !== '#');
}

export async function getAdvisorResources(): Promise<AdvisorResourceItem[]> {
  const { data, error } = await supabase
    .from(TABLES.advisorResources)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const filePath = pickString(row.file_path, row.filePath);
    const directUrl = pickString(row.resource_url, row.resourceUrl, row.url);
    const resourceTypeRaw = pickString(row.resource_type, row.resourceType) || 'file';
    const resourceType =
      resourceTypeRaw === 'video' || resourceTypeRaw === 'link' || resourceTypeRaw === 'file'
        ? resourceTypeRaw
        : 'file';
    const thumbnailRaw = pickString(row.thumbnail_path, row.thumbnailPath, row.thumbnail_url, row.thumbnailUrl, row.image_url, row.imageUrl);
    const durationRaw = row.duration ?? row.video_duration ?? row.videoDuration ?? row.duration_label ?? row.durationLabel;

    let duration: string | undefined;
    if (typeof durationRaw === 'string' && durationRaw.trim()) {
      duration = durationRaw.trim();
    } else if (typeof durationRaw === 'number' && Number.isFinite(durationRaw) && durationRaw > 0) {
      duration = `${Math.round(durationRaw)} sec`;
    }

    return {
      id: toId(row.id),
      title: pickString(row.title) || 'Advisor Resource',
      resourceType,
      resourceUrl: directUrl || (filePath ? getCmsMediaUrl(filePath) : '#'),
      description: pickString(row.description, row.summary, row.details),
      duration,
      thumbnailUrl: thumbnailRaw ? getCmsMediaUrl(thumbnailRaw) : undefined,
    };
  }).filter((item) => item.resourceUrl && item.resourceUrl !== '#');
}

export async function getAnnouncements(): Promise<Announcements> {
  return fetchSingle<Announcements>(TABLES.announcements, toFallbackSingleType('Announcements'));
}

export async function getContactUs(): Promise<ContactUs> {
  return fetchSingle<ContactUs>(TABLES.contactUs, toFallbackSingleType('Contact Us'));
}

export async function getAcademicStaffList(): Promise<AcademicStaffItem[]> {
  const { data, error } = await supabase.from(TABLES.staff).select('*').order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const title = pickString(row.title);
    const firstName = pickString(row.first_name, row.firstName);
    const lastName = pickString(row.last_name, row.lastName);
    const position = pickString(row.position, row.role) || '';
    const fullName = [title, firstName, lastName]
      .filter(Boolean)
      .join(' ')
      .trim();

    return {
      title,
      firstName,
      lastName,
      position,
      name: fullName || pickString(row.name) || 'Unknown',
      role: position,
      specialty: pickString(row.speciality, row.specialty),
      department: pickString(row.department, row.position),
      email: pickString(row.email),
      bio: pickString(row.bio),
      googleScholarLink: pickString(row.google_scholar_link, row.googleScholarLink),
      cvLabel: pickString(row.cvLabel, row.cvlabel) || 'Download CV (PDF)',
      avatarUrl: getFileUrl(row.image_path || row.avatar_url || row.avatar),
      cvUrl: getFileUrl(row.cv_path || row.cv_url || row.cvDocument || row.cv),
    };
  });
}

export async function getEventsList(): Promise<EventCardItem[]> {
  const { data, error } = await supabase.from(TABLES.events).select('*').order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const imageUrls = extractMediaUrls(
      row.image_url,
      row.imageUrl,
      row.image,
      row.images,
      row.gallery,
      row.image_urls,
    );
    const fallbackUrls = imageUrls.length ? imageUrls : [];

    return {
      id: toId(row.id),
      title: pickString(row.title) || 'Untitled event',
      description: pickString(row.description) || '',
      day: pickString(row.day) || '',
      month: pickString(row.month) || '',
      timeRange: pickString(row.timeRange, row.time_range) || '',
      href: pickString(row.href) || '#',
      imageUrl: fallbackUrls[0] || '',
      imageUrls: fallbackUrls,
    };
  });
}

export async function getNewsList(): Promise<NewsCardItem[]> {
  const { data, error } = await supabase.from(TABLES.news).select('*').order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const imageUrls = extractMediaUrls(
      row.image_url,
      row.imageUrl,
      row.image,
      row.images,
      row.gallery,
      row.image_urls,
    );
    const fallbackUrls = imageUrls.length ? imageUrls : [];

    return {
      id: toId(row.id),
      title: pickString(row.title) || 'Untitled news',
      description: pickString(row.description) || '',
      href: pickString(row.href) || '#',
      imageUrl: fallbackUrls[0] || '',
      imageUrls: fallbackUrls,
    };
  });
}

function isTableMissingError(error: { code?: string; message?: string }): boolean {
  return (
    error.code === 'PGRST205' ||
    error.code === '42P01' ||
    /important_links/i.test(error.message ?? '')
  );
}

export function resolveImportantLinkImageUrl(imagePath: string | null): string {
  if (!imagePath) return '';
  const { data } = supabase.storage
    .from(STORAGE_BUCKETS.importantLinks)
    .getPublicUrl(imagePath);
  return data?.publicUrl ?? '';
}

export async function getImportantLinks(): Promise<ImportantLinkItem[]> {
  const { data, error } = await supabase
    .from(TABLES.importantLinks)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    if (isTableMissingError(error)) return [];
    throw new Error(`Failed to load important links: ${error.message}`);
  }

  return (data ?? []).map((record) => ({
    id: record.id as string,
    title: (record.title as string) || 'Untitled',
    description: (record.description as string) || '',
    href: (record.href as string) || '#',
    imageUrl: resolveImportantLinkImageUrl((record.image_path as string | null) ?? null),
  }));
}

function storagePubUrl(bucket: string, path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path.replace(/^\/+/, ''));
  return data?.publicUrl || '';
}

export async function getAcademicAdvisingDocuments(): Promise<AcademicAdvisingDocument[]> {
  const { data, error } = await supabase
    .from(TABLES.academicAdvising)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const filePath = pickString(row.file_path, row.filePath);
    return {
      id: toId(row.id),
      title: pickString(row.title) || 'Academic Advising Document',
      fileUrl: filePath ? storagePubUrl(STORAGE_BUCKETS.resources, filePath) : '#',
    };
  }).filter((d) => d.fileUrl !== '#');
}

export async function getHomeSections(): Promise<HomeSectionItem[]> {
  const { data, error } = await supabase
    .from(TABLES.homeSections)
    .select('*');

  if (error) throw new Error(error.message);

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const imagePath = pickString(row.image_path, row.imagePath);
    const filePath = pickString(row.file_path, row.filePath);
    return {
      sectionKey: pickString(row.section_key, row.sectionKey) || '',
      title: pickString(row.title) || null,
      contentText: pickString(row.content_text, row.contentText) || null,
      imageUrl: imagePath ? storagePubUrl(STORAGE_BUCKETS.homeImages, imagePath) : null,
      fileUrl: filePath ? storagePubUrl(STORAGE_BUCKETS.homeFiles, filePath) : null,
    };
  });
}

export async function getInternationalHandbook(): Promise<InternationalHandbookDocument | null> {
  const { data, error } = await supabase
    .from(TABLES.internationalHandbook)
    .select('*')
    .eq('key', 'current')
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  const row = unwrapRow(data) as Record<string, unknown>;
  const filePath = pickString(row.file_path, row.filePath);
  return {
    key: pickString(row.key) || 'current',
    title: pickString(row.title) || 'International Student Handbook',
    fileUrl: filePath ? storagePubUrl(STORAGE_BUCKETS.internationalHandbookFiles, filePath) : '#',
  };
}

export async function getSmartElearningVideos(): Promise<SmartElearningVideo[]> {
  const { data, error } = await supabase
    .from(TABLES.smartElearning)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const sourceType = pickString(row.source_type, row.sourceType) === 'youtube' ? 'youtube' : 'upload';
    const videoPath = pickString(row.video_path, row.videoPath);
    return {
      id: toId(row.id),
      title: pickString(row.title) || 'E-Learning Video',
      sourceType,
      youtubeUrl: pickString(row.youtube_url, row.youtubeUrl) || null,
      videoUrl: videoPath ? storagePubUrl(STORAGE_BUCKETS.resources, videoPath) : null,
    };
  });
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  const { data, error } = await supabase
    .from(TABLES.contactInfo)
    .select('*')
    .eq('key', 'primary')
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  const row = unwrapRow(data) as Record<string, unknown>;
  return {
    email: pickString(row.email) || '',
    phone: pickString(row.phone) || '',
    address: pickString(row.address) || '',
    mapLink: pickString(row.map_link, row.mapLink) || null,
  };
}

export async function getAdmissionSections(): Promise<AdmissionSection[]> {
  const { data, error } = await supabase
    .from(TABLES.admissionSections)
    .select('*');

  if (error) throw new Error(error.message);

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const steps = Array.isArray(row.steps) ? (row.steps as unknown[]).filter((s) => typeof s === 'string') as string[] : [];
    const rawAttachments = Array.isArray(row.attachments) ? row.attachments as Record<string, unknown>[] : [];
    const attachments: AdmissionAttachment[] = rawAttachments.map((att, i) => {
      const fp = pickString(att.file_path, att.filePath) || '';
      return {
        id: pickString(att.id) || `att-${i}`,
        title: pickString(att.title) || `Attachment ${i + 1}`,
        fileUrl: fp ? storagePubUrl(STORAGE_BUCKETS.admissionFiles, fp) : '#',
        fileType: pickString(att.file_type, att.fileType) || 'pdf',
      };
    });
    return {
      sectionKey: pickString(row.section_key, row.sectionKey) || '',
      steps,
      attachments,
    };
  });
}

export async function getRegistrationVideos(): Promise<RegistrationVideo[]> {
  const { data, error } = await supabase
    .from(TABLES.registrationVideos)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const sourceType = pickString(row.source_type, row.sourceType) === 'youtube' ? 'youtube' : 'upload';
    const videoPath = pickString(row.video_path, row.videoPath);
    return {
      id: toId(row.id),
      title: pickString(row.title) || 'Registration Video',
      sourceType,
      youtubeUrl: pickString(row.youtube_url, row.youtubeUrl) || null,
      videoUrl: videoPath ? storagePubUrl(STORAGE_BUCKETS.resources, videoPath) : null,
    };
  });
}

export async function getFacilitySections(): Promise<FacilitySection[]> {
  const { data, error } = await supabase
    .from(TABLES.facilitiesSections)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const thumbnailPath = pickString(row.thumbnail_path, row.thumbnailPath);
    const galleryRaw = Array.isArray(row.gallery_paths) ? row.gallery_paths as unknown[] : [];
    const galleryUrls = galleryRaw
      .filter((p) => typeof p === 'string' && p)
      .map((p) => storagePubUrl(STORAGE_BUCKETS.facilitiesImages, p as string));
    return {
      id: toId(row.id),
      sectionType: pickString(row.section_type, row.sectionType) || '',
      title: pickString(row.title) || '',
      contentHtml: pickString(row.content_html, row.contentHtml) || '',
      thumbnailUrl: thumbnailPath ? storagePubUrl(STORAGE_BUCKETS.facilitiesImages, thumbnailPath) : null,
      galleryUrls,
    };
  });
}

export async function submitContactForm(payload: {
  firstName: string;
  lastName: string;
  subject: string;
  message: string;
}): Promise<void> {
  const now = new Date().toISOString();
  const { error } = await supabase
    .from(TABLES.contactSubmissions)
    .insert({
      first_name: payload.firstName,
      last_name: payload.lastName,
      subject: payload.subject,
      message: payload.message,
      status: 'new',
      created_at: now,
      updated_at: now,
    });

  if (error) throw new Error(error.message);
}

export async function getActivitiesList(activityType?: ActivityType): Promise<NewsCardItem[]> {
  let query = supabase
    .from(TABLES.activities)
    .select('*')
    // .eq('is_published', true)
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false });

  if (activityType) {
    query = query.eq('activity_type', activityType);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const imageUrls = extractMediaUrls(
      row.image_url,
      row.imageUrl,
      row.image,
      row.images,
      row.gallery,
      row.image_urls,
    );
    const fallbackImage = imageUrls[0] || '/must.jpg';

    return {
      id: toId(row.id),
      title: pickString(row.title) || 'Untitled activity',
      description: pickString(row.description) || '',
      href: pickString(row.href) || '#',
      imageUrl: fallbackImage,
      imageUrls: imageUrls.length ? imageUrls : [fallbackImage],
    };
  });
}

export async function getStudyPlansRow(): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.from(TABLES.studyPlans).select('*').limit(1).maybeSingle<Record<string, unknown>>();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No study plans found.');
  }

  return unwrapRow(data) as Record<string, unknown>;
}

export async function getSchedulesRow(): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.from(TABLES.schedules).select('*').limit(1).maybeSingle<Record<string, unknown>>();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No schedules found.');
  }

  return unwrapRow(data) as Record<string, unknown>;
}

export async function getSchedulesList(): Promise<ScheduleItem[]> {
  const { data, error } = await supabase
    .from(TABLES.schedules)
    .select('*')
    .order('year', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const year = typeof row.year === 'number' ? row.year : Number(row.year || 0);

    return {
      id: toId(row.id),
      scheduleType: pickString(row.schedule_type, row.scheduleType) || 'Schedule',
      semester: pickString(row.semester) || '',
      year: Number.isFinite(year) ? year : 0,
      fileUrl: getFileUrl(row.file_path || row.filePath || row.file),
    };
  });
}

export async function getCalendarsList(): Promise<CalendarItem[]> {
  const { data, error } = await supabase
    .from(TABLES.calendars)
    .select('*')
    .order('year', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const year = typeof row.year === 'number' ? row.year : Number(row.year || 0);

    return {
      id: toId(row.id),
      programLevel: pickString(row.program_level, row.programLevel) || 'Academic Calendar',
      year: Number.isFinite(year) ? year : 0,
      fileUrl: getFileUrl(row.file_path || row.filePath || row.file),
    };
  });
}

export async function getHeroSlides(): Promise<HeroSlideItem[]> {
  const { data, error } = await supabase
    .from(TABLES.heroSlides)
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data || []).map((raw) => unwrapRow(raw) as Record<string, unknown>);

  const activeRows = rows.filter((row) => {
    const active = row.isActive ?? row.is_active ?? row.active ?? true;
    return active !== false;
  });

  return activeRows
    .map((row, index) => {
      const imageUrl =
        pickString(row.image_url, row.imageUrl, row.photo_url, row.photoUrl, row.url) ||
        extractMediaUrls(row.image, row.media, row.photo, row.file)[0];

      if (!imageUrl) {
        return null;
      }

      const rawOrder = row.order ?? row.sort_order ?? row.position;
      const normalizedOrder = typeof rawOrder === 'number' ? rawOrder : Number(rawOrder);

      return {
        id: toId(row.id),
        src: getCmsMediaUrl(imageUrl),
        title: pickString(row.title, row.caption, row.name) || `Slide ${index + 1}`,
        order: Number.isFinite(normalizedOrder) ? normalizedOrder : index,
      };
    })
    .filter((item): item is HeroSlideItem & { order: number } => item !== null)
    .sort((a, b) => a.order - b.order)
    .map(({ order: _order, ...slide }) => slide);
}

export async function getHomeSectionsContent(): Promise<Partial<Record<HomeSectionKey, HomeSectionContent>>> {
  const { data, error } = await supabase
    .from(TABLES.homeSections)
    .select('*')
    .in('section_key', ['about-sector', 'mission', 'vision', 'sector-plan']);

  if (error) {
    if (isMissingTableError(error)) {
      return {};
    }

    throw new Error(error.message);
  }

  const rows = (data || []).map((raw) => unwrapRow(raw) as Record<string, unknown>);
  const mapped: Partial<Record<HomeSectionKey, HomeSectionContent>> = {};

  rows.forEach((row) => {
    const sectionKey = normalizeHomeSectionKey(pickString(row.section_key, row.sectionKey));
    if (!sectionKey) {
      return;
    }

    const imagePath = pickString(row.image_path, row.imagePath);
    const filePath = pickString(row.file_path, row.filePath);
    const imageUrl = imagePath
      ? supabase.storage.from(STORAGE_BUCKETS.homeImages).getPublicUrl(imagePath).data.publicUrl
      : null;
    const fileUrl = filePath
      ? supabase.storage.from(STORAGE_BUCKETS.homeFiles).getPublicUrl(filePath).data.publicUrl
      : null;

    mapped[sectionKey] = {
      sectionKey,
      title: pickString(row.title) || null,
      contentText: pickString(row.content_text, row.contentText) || null,
      imageUrl,
      fileUrl,
      updatedAt: pickString(row.updated_at, row.updatedAt) || null,
    };
  });

  return mapped;
}

export async function getFacilitiesSections(sectionType: FacilitiesSectionType): Promise<FacilityItem[]> {
  const { data, error } = await supabase
    .from(TABLES.facilities)
    .select('*')
    .eq('section_type', sectionType)
    .order('created_at', { ascending: false });

  if (error) {
    if (isMissingTableError(error)) {
      return [];
    }

    throw new Error(error.message);
  }

  return (data || []).map((raw) => {
    const row = unwrapRow(raw) as Record<string, unknown>;
    const thumbnailPath = pickString(row.thumbnail_path, row.thumbnailPath);
    const galleryPaths = Array.isArray(row.gallery_paths) ? row.gallery_paths : Array.isArray(row.galleryPaths) ? row.galleryPaths : [];

    return {
      id: toId(row.id),
      sectionType: (pickString(row.section_type, row.sectionType) as FacilitiesSectionType) || sectionType,
      title: pickString(row.title) || 'Facility',
      contentHtml: pickString(row.content_html, row.contentHtml) || '',
      thumbnailUrl: thumbnailPath
        ? supabase.storage.from(STORAGE_BUCKETS.facilitiesImages).getPublicUrl(thumbnailPath).data.publicUrl
        : null,
      galleryUrls: galleryPaths
        .filter((path): path is string => typeof path === 'string' && path.trim().length > 0)
        .map((path) => supabase.storage.from(STORAGE_BUCKETS.facilitiesImages).getPublicUrl(path).data.publicUrl),
      createdAt: pickString(row.created_at, row.createdAt) || null,
      updatedAt: pickString(row.updated_at, row.updatedAt) || null,
    };
  });
}

export async function getFacilityById(id: string): Promise<FacilityItem | null> {
  const trimmedId = id.trim();
  if (!trimmedId) {
    return null;
  }

  const { data, error } = await supabase
    .from(TABLES.facilities)
    .select('*')
    .eq('id', trimmedId)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) {
      return null;
    }

    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const row = unwrapRow(data) as Record<string, unknown>;
  const thumbnailPath = pickString(row.thumbnail_path, row.thumbnailPath);
  const galleryPaths = Array.isArray(row.gallery_paths) ? row.gallery_paths : Array.isArray(row.galleryPaths) ? row.galleryPaths : [];

  return {
    id: toId(row.id),
    sectionType: (pickString(row.section_type, row.sectionType) as FacilitiesSectionType) || 'must-facilities',
    title: pickString(row.title) || 'Facility',
    contentHtml: pickString(row.content_html, row.contentHtml) || '',
    thumbnailUrl: thumbnailPath
      ? supabase.storage.from(STORAGE_BUCKETS.facilitiesImages).getPublicUrl(thumbnailPath).data.publicUrl
      : null,
    galleryUrls: galleryPaths
      .filter((path): path is string => typeof path === 'string' && path.trim().length > 0)
      .map((path) => supabase.storage.from(STORAGE_BUCKETS.facilitiesImages).getPublicUrl(path).data.publicUrl),
    createdAt: pickString(row.created_at, row.createdAt) || null,
    updatedAt: pickString(row.updated_at, row.updatedAt) || null,
  };
}

export async function getInternationalHandbookDocument(): Promise<InternationalHandbookItem | null> {
  const { data, error } = await supabase
    .from(getTable('VITE_SUPABASE_INTERNATIONAL_HANDBOOK_TABLE', 'international_handbook_documents'))
    .select('*')
    .eq('key', 'current')
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) {
      return null;
    }

    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  const row = unwrapRow(data) as Record<string, unknown>;
  const filePath = pickString(row.file_path, row.filePath);
  if (!filePath) {
    return null;
  }

  return {
    key: pickString(row.key) || 'current',
    title: pickString(row.title) || 'International Handbook',
    fileUrl: supabase.storage.from(STORAGE_BUCKETS.internationalHandbookFiles).getPublicUrl(filePath).data.publicUrl,
    updatedAt: pickString(row.updated_at, row.updatedAt) || null,
  };
}

function normalizeMenuNode(raw: unknown): HeroNavTreeItem | null {
  if (!isObject(raw)) {
    return null;
  }

  const title = pickString(raw.title);
  if (!title) {
    return null;
  }

  const url = pickString(raw.url, raw.path) || '/';
  const target: HeroNavTarget = raw.target === '_blank' ? '_blank' : '_self';
  const accessRole: HeroNavRole =
    raw.accessRole === 'visitor' || raw.accessRole === 'college-member'
      ? raw.accessRole
      : 'public';

  const children = toArray(raw.children)
    .map((child) => normalizeMenuNode(child))
    .filter((child): child is HeroNavTreeItem => child !== null);

  return {
    title,
    url,
    target,
    accessRole,
    children,
  };
}

export async function getHeroNavTree(): Promise<HeroNavTreeItem[]> {
  if (!TABLES.heroMenus) {
    return DEFAULT_HERO_NAV_TREE;
  }

  const { data, error } = await supabase
    .from(TABLES.heroMenus)
    .select('items')
    .eq('slug', 'hero-nav')
    .limit(1)
    .maybeSingle<{ items?: unknown }>();

  if (error) {
    console.warn(`Hero nav query failed on table "${TABLES.heroMenus}": ${error.message}`);
    return DEFAULT_HERO_NAV_TREE;
  }

  const items = toArray(data?.items);
  const normalizedItems = items
    .map((item) => normalizeMenuNode(item))
    .filter((item): item is HeroNavTreeItem => item !== null);

  return normalizedItems.length > 0 ? normalizedItems : DEFAULT_HERO_NAV_TREE;
}

export function isContentLoaded(content: unknown): boolean {
  if (!isObject(content)) {
    return false;
  }

  return Boolean(content.id);
}

export function getCmsMediaUrl(path: string): string {
  if (!path) {
    return '';
  }

  const projectUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.replace(/^\/+/, '');

  if (normalizedPath.startsWith('storage/v1/object/public/')) {
    return projectUrl ? `${projectUrl}/${normalizedPath}` : `/${normalizedPath}`;
  }

  if (normalizedPath.startsWith('storage/v1/object/')) {
    const publicPath = normalizedPath.replace('storage/v1/object/', 'storage/v1/object/public/');
    return projectUrl ? `${projectUrl}/${publicPath}` : `/${publicPath}`;
  }

  if (!projectUrl) {
    return path;
  }

  const [firstSegment] = normalizedPath.split('/');
  const lowerSegment = (firstSegment || '').toLowerCase();

  let bucketName: string | undefined;
  if (lowerSegment === 'images' || lowerSegment === 'staff') {
    bucketName = STORAGE_BUCKETS.staff;
  } else if (lowerSegment === 'cv') {
    bucketName = STORAGE_BUCKETS.staffCv;
  } else if (lowerSegment === 'news') {
    bucketName = STORAGE_BUCKETS.news;
  } else if (lowerSegment === 'events') {
    bucketName = STORAGE_BUCKETS.events;
  } else if (lowerSegment === 'activities' || lowerSegment === 'activity') {
    bucketName = STORAGE_BUCKETS.activities;
  } else if (lowerSegment === 'resources' || lowerSegment === 'resource') {
    bucketName = STORAGE_BUCKETS.resources;
  } else if (lowerSegment === 'honor-list' || lowerSegment === 'honor_list' || lowerSegment === 'honorlist') {
    bucketName = STORAGE_BUCKETS.honorList;
  } else if (lowerSegment === 'gallery' || lowerSegment === 'photo_gallery') {
    bucketName = STORAGE_BUCKETS.gallery;
  } else if (lowerSegment === 'study-plans' || lowerSegment === 'study_plans' || lowerSegment === 'studyplans') {
    bucketName = STORAGE_BUCKETS.studyPlans;
  } else if (lowerSegment === 'schedules' || lowerSegment === 'schedule') {
    bucketName = STORAGE_BUCKETS.schedules;
  } else if (lowerSegment === 'calendars' || lowerSegment === 'calendar') {
    bucketName = STORAGE_BUCKETS.calendars;
  } else if (lowerSegment === 'avatars') {
    bucketName = STORAGE_BUCKETS.avatars;
  } else if (lowerSegment === 'facilities' || lowerSegment === 'facility') {
    bucketName = STORAGE_BUCKETS.facilitiesImages;
  } else if (lowerSegment === 'international-handbook' || lowerSegment === 'international_handbook' || lowerSegment === 'handbook') {
    bucketName = STORAGE_BUCKETS.internationalHandbookFiles;
  }

  if (bucketName) {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(normalizedPath);
    if (data?.publicUrl) {
      return data.publicUrl;
    }
  }

  if (path.startsWith('/')) {
    return `${projectUrl}${path}`;
  }

  return `${projectUrl}/${path}`;
}

export function getStrapiMediaUrl(path: string): string {
  return getCmsMediaUrl(path);
}

export function getImageUrl(imageData: unknown): string | null {
  if (!isObject(imageData)) {
    return null;
  }

  const direct = pickString(imageData.url);
  if (direct) {
    return getCmsMediaUrl(direct);
  }

  const fromData = isObject(imageData.data)
    ? pickString(imageData.data.url, isObject(imageData.data.attributes) ? imageData.data.attributes.url : undefined)
    : undefined;

  return fromData ? getCmsMediaUrl(fromData) : null;
}

export function renderRichText(html: string): string {
  if (!html) {
    return '';
  }

  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export function getFileUrl(field: unknown): string {
  if (!field) {
    return '#';
  }

  if (typeof field === 'string') {
    return getCmsMediaUrl(field);
  }

  if (!isObject(field)) {
    return '#';
  }

  const path = pickString(field.url, isObject(field.data) ? pickString(field.data.url, isObject(field.data.attributes) ? field.data.attributes.url : undefined) : undefined);
  return path ? getCmsMediaUrl(path) : '#';
}

export function getManyFileLinks(media: unknown, prefix = 'file'): Array<{ id: string; title: string; url: string }> {
  const items = toArray(media);

  return items.map((file, index) => {
    const row = unwrapRow(file) as Record<string, unknown>;
    const title = pickString(row.name, row.title) || `${prefix}-${index + 1}`;

    return {
      id: `${prefix}-${index}`,
      title,
      url: getFileUrl(row),
    };
  });
}
