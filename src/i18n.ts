import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          home: 'Home',
          academics: 'Academics',
          questionnaires: 'Questionnaires',
          resources: 'Resources',
          announcements: 'Announcements',
          contactUs: 'Contact Us',
          profile: 'My Profile',
          settings: 'Settings',
          signOut: 'Sign Out',
          notifications: 'Notifications',
          university: 'University',
          admission: 'Admission',
          mustBuzz: 'Must Buzz',
          centers: 'Centers',
          lifeAtMUST: 'Life at MUST',
          sdgs: 'SDGs',
          welcome: 'Welcome back',
          portal: 'International Students Affairs Portal',
          heroTitle: 'International Students Platform',
          viewSchedule: 'View Schedule',
          viewScheduleDesc: 'Check your weekly classes and exams',
          submitRequest: 'Submit Request',
          submitRequestDesc: 'Apply for letters, transcripts, or visas',
          myRequests: 'My Requests',
          myRequestsDesc: 'Track your submitted applications',
          announcementsDesc: 'Official news and important updates',
          studentServices: 'Student Services',
          studentServicesDesc: 'Housing, medical, and library access',
          contactAdvisor: 'Contact Advisor',
          contactAdvisorDesc: 'Message your international advisor',
          currentGPA: 'Current GPA',
          credits: 'Credits',
          semester: 'Semester',
          pendingRequests: 'Pending Requests',
          quickActions: 'Quick Actions'
        }
      },
      ar: {
        translation: {
          home: 'الرئيسية',
          academics: 'الكليات والبرامج',
          questionnaires: 'الاستبيانات',
          resources: 'الموارد',
          announcements: 'الإعلانات',
          contactUs: 'اتصل بنا',
          profile: 'الملف الشخصي',
          settings: 'الإعدادات',
          signOut: 'تسجيل الخروج',
          notifications: 'الإشعارات',
          university: 'الجامعة',
          admission: 'القبول',
          mustBuzz: 'نبض مصت',
          centers: 'المراكز',
          lifeAtMUST: 'الحياة في مصت',
          sdgs: 'أهداف التنمية المستدامة',
          welcome: 'مرحباً بعودتك',
          portal: 'بوابة شؤون الطلاب الدوليين',
          heroTitle: 'بوابة شؤون الطلاب الدوليين'
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

