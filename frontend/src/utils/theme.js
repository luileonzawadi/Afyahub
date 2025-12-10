// Theme utility to apply saved theme on app load
export const applyTheme = () => {
  const themes = {
    orange: { primary: '#f97316', secondary: '#ea580c' },
    blue: { primary: '#2563eb', secondary: '#1e40af' },
    red: { primary: '#ef4444', secondary: '#dc2626' },
    amber: { primary: '#f59e0b', secondary: '#d97706' },
    rose: { primary: '#f43f5e', secondary: '#e11d48' }
  };

  const savedTheme = localStorage.getItem('afyahub_theme') || 'blue';
  const theme = themes[savedTheme];
  
  if (theme) {
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
  }
};

// Apply theme on page load
applyTheme();
