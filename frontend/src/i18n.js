import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Enhanced translations
const resources = {
  en: {
    translation: {
      common: {
        loading: "Loading...",
        error: "An error occurred",
        noData: "No data available",
        actions: "Actions",
        search: "Search",
        filter: "Filter",
        sort: "Sort",
        language: "Language",
        english: "English",
        arabic: "العربية",
      },
      navigation: {
        dashboard: "Dashboard",
        quizzes: "Quizzes",
        announcements: "Announcements",
        logout: "Logout",
      },
      dashboard: {
        title: "Dashboard",
        welcome: "Welcome back",
        stats: "Statistics",
        announcements: "Announcements",
        quizzes: "Quizzes",
        activeQuizzes: "Active Quizzes",
        upcomingQuizzes: "Upcoming Quizzes",
        recentAnnouncements: "Recent Announcements",
        viewAll: "View all",
        totalAnnouncements: "Total Announcements",
        totalQuizzes: "Total Quizzes",
        upcoming: "Upcoming",
        completed: "Completed",
      },
      buttons: {
        createAnnouncement: "+ Create Announcement",
        createQuiz: "+ Create Quiz",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        save: "Save",
        submit: "Submit",
        back: "Back",
        next: "Next",
        previous: "Previous",
        close: "Close",
        open: "Open",
        view: "View",
        add: "Add",
        remove: "Remove",
      },
      forms: {
        title: "Title",
        message: "Message",
        description: "Description",
        required: "Required",
        optional: "Optional",
        submit: "Submit",
        reset: "Reset",
      },
      time: {
        minutes: "minutes",
        hours: "hours",
        days: "days",
        ago: "ago",
        posted: "Posted on",
        today: "Today",
        yesterday: "Yesterday",
        thisWeek: "This Week",
        lastWeek: "Last Week",
        thisMonth: "This Month",
        lastMonth: "Last Month",
      },
      messages: {
        confirmDelete: "Are you sure you want to delete this item?",
        deleteSuccess: "Item deleted successfully",
        saveSuccess: "Item saved successfully",
        updateSuccess: "Item updated successfully",
        createSuccess: "Item created successfully",
        noResults: "No results found",
        loadingData: "Loading data...",
        errorLoading: "Error loading data",
        retry: "Retry",
      },
    },
  },
  ar: {
    translation: {
      common: {
        loading: "جاري التحميل...",
        error: "حدث خطأ",
        noData: "لا توجد بيانات متاحة",
        actions: "الإجراءات",
        search: "بحث",
        filter: "تصفية",
        sort: "ترتيب",
        language: "اللغة",
        english: "English",
        arabic: "العربية",
      },
      navigation: {
        dashboard: "لوحة التحكم",
        quizzes: "الاختبارات",
        announcements: "الإعلانات",
        logout: "تسجيل الخروج",
      },
      dashboard: {
        title: "لوحة التحكم",
        welcome: "مرحباً بعودتك",
        stats: "الإحصائيات",
        announcements: "الإعلانات",
        quizzes: "الاختبارات",
        activeQuizzes: "الاختبارات النشطة",
        upcomingQuizzes: "الاختبارات القادمة",
        recentAnnouncements: "آخر الإعلانات",
        viewAll: "عرض الكل",
        totalAnnouncements: "إجمالي الإعلانات",
        totalQuizzes: "إجمالي الاختبارات",
        upcoming: "قادم",
        completed: "مكتمل",
      },
      buttons: {
        createAnnouncement: "+ إنشاء إعلان",
        createQuiz: "+ إنشاء اختبار",
        edit: "تعديل",
        delete: "حذف",
        cancel: "إلغاء",
        save: "حفظ",
        submit: "إرسال",
        back: "رجوع",
        next: "التالي",
        previous: "السابق",
        close: "إغلاق",
        open: "فتح",
        view: "عرض",
        add: "إضافة",
        remove: "إزالة",
      },
      forms: {
        title: "العنوان",
        message: "الرسالة",
        description: "الوصف",
        required: "مطلوب",
        optional: "اختياري",
        submit: "إرسال",
        reset: "إعادة تعيين",
      },
      time: {
        minutes: "دقائق",
        hours: "ساعات",
        days: "أيام",
        ago: "منذ",
        posted: "تم النشر في",
        today: "اليوم",
        yesterday: "أمس",
        thisWeek: "هذا الأسبوع",
        lastWeek: "الأسبوع الماضي",
        thisMonth: "هذا الشهر",
        lastMonth: "الشهر الماضي",
      },
      messages: {
        confirmDelete: "هل أنت متأكد من حذف هذا العنصر؟",
        deleteSuccess: "تم حذف العنصر بنجاح",
        saveSuccess: "تم حفظ العنصر بنجاح",
        updateSuccess: "تم تحديث العنصر بنجاح",
        createSuccess: "تم إنشاء العنصر بنجاح",
        noResults: "لم يتم العثور على نتائج",
        loadingData: "جاري تحميل البيانات...",
        errorLoading: "خطأ في تحميل البيانات",
        retry: "إعادة المحاولة",
      },
    },
  },
};

// Language detection
const getInitialLanguage = () => {
  const savedLang = localStorage.getItem("i18nextLng");
  if (savedLang && resources[savedLang]) {
    return savedLang;
  }

  const browserLang = navigator.language.split("-")[0];
  if (resources[browserLang]) {
    return browserLang;
  }

  return "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Save language preference
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
  // Update document direction for RTL languages
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18n;
