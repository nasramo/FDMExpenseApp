/*JSX file to deal with light/dark theme*/
function applyTheme(themeName) {
    // Apply theme to document
    document.documentElement.className = themeName;
    localStorage.setItem('theme', themeName);
}

function setTheme(themeName) {
    applyTheme(themeName);
}

function keepTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    applyTheme(savedTheme);
    return;
  }

  // Default to light mode
  applyTheme('light');
}

export {
  setTheme,
  keepTheme,
  applyTheme
}
