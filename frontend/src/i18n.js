import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Example translations
const resources = {
  en: {
    translation: {
      dashboard: {
        title: "Dashboard",
        announcements: "Announcements",
        quizzes: "Quizzes",
        activeQuizzes: "Active Quizzes",
        upcomingQuizzes: "Upcoming Quizzes",
        recentAnnouncements: "Recent Announcements",
        viewAll: "View all",
      },
      buttons: {
        createAnnouncement: "+ Create Announcement",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        save: "Save",
      },
    },
  },
  ar: {
    translation: {
      dashboard: {
        title: "لوحة التحكم",
        announcements: "الإعلانات",
        quizzes: "الاختبارات",
        activeQuizzes: "الاختبارات النشطة",
        upcomingQuizzes: "الاختبارات القادمة",
        recentAnnouncements: "آخر الإعلانات",
        viewAll: "عرض الكل",
      },
      buttons: {
        createAnnouncement: "+ إنشاء إعلان",
        edit: "تعديل",
        delete: "حذف",
        cancel: "إلغاء",
        save: "حفظ",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
