# Anyware - Educational Management System

A modern, responsive educational management system built with React, Material UI, and comprehensive internationalization support.

## ✨ Features

### 🎨 Modern UI/UX

- **Material UI Design System** - Beautiful, consistent components following Material Design principles
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Custom Theme** - Professional color scheme with smooth transitions and hover effects
- **Accessibility** - WCAG compliant with proper focus management and screen reader support

### 🌍 Internationalization (i18n)

- **Multi-language Support** - English and Arabic languages
- **RTL Support** - Full right-to-left layout support for Arabic
- **Language Detection** - Automatic language detection based on browser settings
- **Persistent Language** - Remembers user's language preference
- **Comprehensive Translations** - All UI elements are translatable

### 📱 Responsive Features

- **Mobile-First Design** - Optimized for small screens
- **Collapsible Sidebar** - Hamburger menu for mobile devices
- **Adaptive Layouts** - Components adjust based on screen size
- **Touch-Friendly** - Optimized for touch devices

### 🔧 Technical Features

- **React 19** - Latest React features and performance improvements
- **Redux Toolkit** - State management with modern Redux patterns
- **React Router** - Client-side routing with protected routes
- **Vite** - Fast build tool and development server

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd anyware
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌍 Language Support

### Switching Languages

The application supports two languages:

- **English (en)** - Default language
- **Arabic (ar)** - Full RTL support

Users can switch languages using the language switcher in the header. The selection is automatically saved and restored on subsequent visits.

### Adding New Languages

To add a new language:

1. **Add translations** in `src/i18n.js`:

   ```javascript
   fr: {
     translation: {
       common: {
         loading: "Chargement...",
         // ... more translations
       }
     }
   }
   ```

2. **Update language switcher** in `src/components/LanguageSwitcher.jsx`

3. **Test RTL support** if the new language requires it

## 🎨 Material UI Components

### Theme Customization

The application uses a custom Material UI theme defined in `src/theme.js`. Key customizations include:

- **Color Palette** - Professional blue and red color scheme
- **Typography** - Responsive font sizes with mobile optimization
- **Component Overrides** - Custom styling for buttons, cards, and other components
- **Breakpoints** - Responsive design breakpoints

### Available Components

- **Layout Components**: AppBar, Drawer, Container, Grid
- **Form Components**: TextField, Select, Button, Checkbox
- **Data Display**: Card, Table, List, Chip
- **Feedback**: Alert, Snackbar, Dialog, Progress
- **Navigation**: Breadcrumbs, Pagination, Tabs

## 📱 Responsive Design

### Breakpoints

- **xs**: 0px - 599px (Mobile)
- **sm**: 600px - 959px (Tablet)
- **md**: 960px - 1279px (Small Desktop)
- **lg**: 1280px - 1919px (Desktop)
- **xl**: 1920px+ (Large Desktop)

### Mobile Features

- **Collapsible Navigation** - Sidebar becomes a temporary drawer on mobile
- **Touch-Optimized** - Larger touch targets and swipe gestures
- **Responsive Typography** - Font sizes adjust for readability
- **Optimized Spacing** - Reduced padding and margins on small screens

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Application header with language switcher
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Layout.jsx      # Main layout wrapper
│   ├── ResourceCard.jsx # Card component for resources
│   └── LanguageSwitcher.jsx # Language selection component
├── pages/              # Page components
│   ├── Home.jsx        # Landing/login page
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Quizzes.jsx     # Quizzes management
│   └── Announcements.jsx # Announcements management
├── store/              # Redux store and slices
├── services/           # API services
├── i18n.js            # Internationalization configuration
├── theme.js           # Material UI theme configuration
├── index.css          # Global styles
└── main.jsx           # Application entry point
```

## 🎯 Key Components

### LanguageSwitcher

- Toggle between English and Arabic
- Automatic RTL layout switching
- Persistent language preference

### Responsive Layout

- Adaptive sidebar behavior
- Mobile-first design approach
- Touch-friendly navigation

### Dashboard

- Statistics cards with gradients
- Responsive grid layout
- Loading states and error handling

## 🔧 Customization

### Adding New Routes

1. **Add route** in `src/App.jsx`
2. **Add navigation item** in `src/components/Sidebar.jsx`
3. **Create page component** in `src/pages/`
4. **Add translations** in `src/i18n.js`

### Styling Components

Use Material UI's `sx` prop for custom styling:

```javascript
<Box
  sx={{
    backgroundColor: "primary.main",
    color: "white",
    p: 2,
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "primary.dark",
    },
  }}
>
  Custom styled content
</Box>
```

### Theme Extensions

Extend the theme in `src/theme.js`:

```javascript
const theme = createTheme({
  // ... existing theme
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Custom button styles
        },
      },
    },
  },
});
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Anyware
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Built with ❤️ using React, Material UI, and modern web technologies**
