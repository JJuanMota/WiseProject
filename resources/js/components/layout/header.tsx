import { Link } from '@inertiajs/react';

interface HeaderProps {
  isAdmin?: boolean;
}

export function Header({ isAdmin = false }: HeaderProps) {
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
                  href="/admin/jobs" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Jobs
                </Link>
                <Link 
                  href="/admin/companies" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Companies
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAdmin ? (
              <Link
                href="/logout"
                method="post"
                as="button"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

