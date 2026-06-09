// Lucide-style line icons. Stroke 1.75, currentColor.
// Subset of what the landing page needs.
const Icon = ({ children, size = 20, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
);

const IconGlobe = (p) => <Icon {...p}>
  <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/>
  <path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>
</Icon>;
const IconEye = (p) => <Icon {...p}>
  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
  <circle cx="12" cy="12" r="3"/>
</Icon>;
const IconBox = (p) => <Icon {...p}>
  <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
</Icon>;
const IconCamera = (p) => <Icon {...p}>
  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/>
  <circle cx="12" cy="13" r="3"/>
</Icon>;
const IconBuilding = (p) => <Icon {...p}>
  <path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>
  <path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/>
</Icon>;
const IconHome = (p) => <Icon {...p}>
  <path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <path d="M9 22V12h6v10"/>
</Icon>;
const IconCap = (p) => <Icon {...p}>
  <path d="M22 10 12 4 2 10l10 6 10-6Z"/>
  <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"/>
</Icon>;
const IconHotel = (p) => <Icon {...p}>
  <path d="M3 21V7l9-4 9 4v14"/><path d="M9 21v-5h6v5"/>
  <path d="M9 11v.01"/><path d="M15 11v.01"/>
</Icon>;
const IconChat = (p) => <Icon {...p}>
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</Icon>;
const IconChart = (p) => <Icon {...p}>
  <path d="M3 3v18h18"/><path d="m7 14 3-3 4 4 5-6"/>
</Icon>;
const IconArrowRight = (p) => <Icon {...p}>
  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
</Icon>;
const IconCheck = (p) => <Icon {...p}><path d="M20 6 9 17l-5-5"/></Icon>;
const IconSparkle = (p) => <Icon {...p}>
  <path d="m12 3-1.9 5.8L4 11l6.1 2.2L12 19l1.9-5.8L20 11l-6.1-2.2z"/>
</Icon>;
const IconPlay = (p) => <Icon {...p}><path d="m6 4 14 8-14 8z" fill="currentColor"/></Icon>;
const IconMenu = (p) => <Icon {...p}>
  <path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>
</Icon>;
const IconMail = (p) => <Icon {...p}>
  <rect width="20" height="16" x="2" y="4" rx="2"/>
  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
</Icon>;
const IconMapPin = (p) => <Icon {...p}>
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
  <circle cx="12" cy="10" r="3"/>
</Icon>;
const IconClock = (p) => <Icon {...p}>
  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
</Icon>;
const IconWhatsApp = (p) => <Icon {...p}>
  <path d="M21 11.5a8.38 8.38 0 0 1-12.4 7.35L3 20.5l1.7-5.4A8.5 8.5 0 1 1 21 11.5Z"/>
  <path d="M9 8.7c.25 0 .5.1.66.55l.5 1.2c.1.2 0 .42-.12.58l-.32.4c-.13.17-.12.32-.02.5a5 5 0 0 0 2.32 2.22c.2.1.38.08.5-.05l.42-.5c.18-.2.4-.2.6-.1l1.2.6c.3.16.4.3.4.5 0 .5-.34 1.2-1.2 1.42-.83.2-1.95 0-3.6-1.1-1.65-1.1-2.55-2.62-2.84-3.5-.3-.9.04-1.85.6-2.4.2-.2.42-.3.62-.3Z"/>
</Icon>;

export { IconGlobe, IconEye, IconBox, IconCamera, IconBuilding, IconHome, IconCap, IconHotel, IconChat, IconChart, IconArrowRight, IconCheck, IconSparkle, IconPlay, IconMenu, IconMail, IconMapPin, IconClock, IconWhatsApp };
