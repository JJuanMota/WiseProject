import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  isAdmin?: boolean;
}

type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'wisejobs-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

  if (stored === 'dark' || stored === 'light') {
    return stored;
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

  return prefersDark ? 'dark' : 'light';
}

function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const updateTheme = (next: Theme) => {
    setTheme(next);
  };

  return [theme, updateTheme];
}

export function Header({ isAdmin = false }: HeaderProps) {
  const page = usePage();
  const auth = (page.props as any).auth as { user?: { name: string; is_admin?: boolean } } | undefined;
  const user = auth?.user;
  const isAdminUser = !!user?.is_admin;

  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    router.post('/logout');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <span className="text-2xl">🦉</span>
              <span className="text-foreground">WiseJobs</span>
            </Link>

            {!isAdmin && (
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Jobs
                </Link>
                <Link
                  href="/companies"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Companies
                </Link>
              </nav>
            )}

            {isAdmin && (
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/admin/companies"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Companies
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Toggle color theme"
            >
              <span className="text-[0.7rem]">
                {theme === 'dark' ? 'Dark' : 'Light'}
              </span>
              <span aria-hidden="true">{theme === 'dark' ? '🌙' : '☀️'}</span>
            </button>

            {user ? (
              <>
                {isAdmin ? (
                  <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Public Site
                  </Link>
                ) : (
                  isAdminUser && (
                    <Link
                      href="/admin/companies"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Admin
                    </Link>
                  )
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
