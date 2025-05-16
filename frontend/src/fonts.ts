import localFont from 'next/font/local';

// Konfiguracja fontu General Sans ze wszystkimi wariantami
export const generalSans = localFont({
  src: [
    // Extra Light (200)
    {
      path: '../public/fonts/general-sans/GeneralSans-Extralight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/general-sans/GeneralSans-ExtralightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    // Light (300)
    {
      path: '../public/fonts/general-sans/GeneralSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/general-sans/GeneralSans-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    // Regular (400)
    {
      path: '../public/fonts/general-sans/GeneralSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/general-sans/GeneralSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    // Medium (500)
    {
      path: '../public/fonts/general-sans/GeneralSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/general-sans/GeneralSans-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    // Semibold (600)
    {
      path: '../public/fonts/general-sans/GeneralSans-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/general-sans/GeneralSans-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    // Bold (700)
    {
      path: '../public/fonts/general-sans/GeneralSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/general-sans/GeneralSans-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    // Extra Bold (800)
    {
      path: '../public/fonts/general-sans/GeneralSans-Bold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/general-sans/GeneralSans-BoldItalic.woff2',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-general-sans',
  display: 'swap',
});