import React, { createContext, useContext, useReducer } from 'react';

export type Language = 'en' | 'ar';

interface Translations {
  en: Record<string, string>;
  ar: Record<string, string>;
}

const translations: Translations = {
  en: {
    // Navbar
    home: 'Home',
    academics: 'Academics',
    questionnaires: 'Questionnaires',
    resources: 'Resources',
    announcements: 'Announcements',
    contactUs: 'Contact Us',
    
    // Common
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    download: 'Download',
    upload: 'Upload',
    search: 'Search',
    
    // Profile
    personalInfo: 'Personal Information',
    academicInfo: 'Academic Information',
    fullName: 'Full Name',
    dob: 'Date of Birth',
    nationality: 'Nationality',
    gender: 'Gender',
    email: 'Email Address',
    phone: 'Phone Number',
    address: 'Local Address',
    faculty: 'Faculty',
    department: 'Department',
    enrollment: 'Enrollment Date',
    graduation: 'Expected Graduation',
    advisor: 'Academic Advisor',
    documents: 'Uploaded Documents',
    
    // Status
    valid: 'Valid',
    expiring: 'Expiring Soon',
    verified: 'Verified',
    
    // Announcements
    readMore: 'Read More',
    loadMore: 'Load More Announcements',
    
    // Requests
    myRequests: 'My Requests',
    submitRequest: 'Submit a Request',
    requestType: 'Request Type',
    description: 'Description / Reason',
    attachments: 'Attachments',
    
    // Dashboard
    quickActions: 'Quick Actions',
    todaysClasses: "Today's Classes",
    viewAll: 'View all',
    discoverMore: 'Discover More',
    
    // Footer
    links: 'Links',
    aboutUniversity: 'About University',
    mustBuzz: 'MUST Buzz',
    contactInfo: 'Contact Info',
    university: 'University Link',
    academicsFooter: 'Academics',
    lifeAtMUST: 'Life at MUST',
    research: 'Research & Centres',
    maps: 'Maps & Directions',
    faqs: 'FAQs',
    aboutMUST: 'About MUST',
    history: 'History',
    whyMUST: 'Why MUST',
    values: 'Values & Principles',
    contactUsFooter: 'Contact Us',
    privacyPolicy: 'Privacy & Policy'
  },
  ar: {
    // Add Arabic translations
    home: 'الرئيسية',
    academics: 'الكليات والبرامج',
    questionnaires: 'الاستبيانات',
    resources: 'الموارد',
    announcements: 'الإعلانات',
    contactUs: 'اتصل بنا',
    
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    download: 'تحميل',
    upload: 'رفع',
    search: 'بحث',
    
    personalInfo: 'المعلومات الشخصية',
    academicInfo: 'المعلومات الأكاديمية',
    fullName: 'الاسم الكامل',
    dob: 'تاريخ الميلاد',
    nationality: 'الجنسية',
    gender: 'الجنس',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    address: 'العنوان المحلي',
    faculty: 'الكلية',
    department: 'القسم',
    enrollment: 'تاريخ التسجيل',
    graduation: 'التخرج المتوقع',
    advisor: 'المشرف الأكاديمي',
    documents: 'المستندات المرفوعة',
    
    valid: 'صالح',
    expiring: 'ينتهي قريباً',
    verified: 'تم التحقق',
    
    readMore: 'اقرأ المزيد',
    loadMore: 'تحميل المزيد',
    
    myRequests: 'طلباتي',
    submitRequest: 'تقديم طلب',
    requestType: 'نوع الطلب',
    description: 'الوصف / السبب',
    attachments: 'المرفقات',
    
    quickActions: 'إجراءات سريعة',
    todaysClasses: 'حصص اليوم',
    viewAll: 'عرض الكل',
    discoverMore: 'اكتشف المزيد',
    
    links: 'الروابط',
    aboutUniversity: 'عن الجامعة',
    mustBuzz: 'أخبار مصت',
    contactInfo: 'معلومات الاتصال'
  }
};

type LanguageAction = { type: 'SET_LANGUAGE'; payload: Language };

const languageReducer = (state: Language, action: LanguageAction): Language => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload);
      document.documentElement.dir = action.payload === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = action.payload;
      return action.payload;
    default:
      return state;
  }
};

interface LanguageContextType {
  language: Language;
  t: (key: keyof Translations['en']) => string;
  dispatch: React.Dispatch<LanguageAction>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, dispatch] = useReducer(languageReducer, 'en' as Language);

  const t = (key: keyof Translations['en']): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

