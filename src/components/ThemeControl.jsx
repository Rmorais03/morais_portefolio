import { useEffect, useState } from 'react';

const systemThemeQuery = '(prefers-color-scheme: dark)';

export default function ThemeControl({ copy }) {
  const [preference, setPreference] = useState(() => document.documentElement.dataset.themePreference || 'system');
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(systemThemeQuery).matches);
  const theme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const toggleLabel = nextTheme === 'light' ? copy.switchToLight : copy.switchToDark;

  useEffect(() => {
    const query = window.matchMedia(systemThemeQuery);
    const updateTheme = event => setSystemDark(event.matches);
    query.addEventListener('change', updateTheme);
    return () => query.removeEventListener('change', updateTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.bsTheme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor.content = themeColor.dataset[theme];
  }, [theme]);

  function changeTheme(value) {
    setPreference(value);
    document.documentElement.dataset.themePreference = value;

    try {
      if (value === 'system') localStorage.removeItem('portfolio-theme');
      else localStorage.setItem('portfolio-theme', value);
    } catch {
      // The current tab can still change theme if storage is unavailable.
    }
  }

  return (
    <div className="theme-control">
      <button
        type="button"
        className="theme-switch"
        title={toggleLabel}
        aria-label={toggleLabel}
        onClick={() => changeTheme(nextTheme)}
      >
        <span aria-hidden="true">{nextTheme === 'light' ? '☼' : '☾'}</span>
      </button>
      <label className="theme-options">
        <span aria-hidden="true"></span>
        <select
          aria-label={copy.label}
          title={copy.label}
          value={preference}
          onChange={event => changeTheme(event.target.value)}
        >
          <option value="system">{copy.system}</option>
          <option value="light">{copy.light}</option>
          <option value="dark">{copy.dark}</option>
        </select>
      </label>
    </div>
  );
}
