export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">🦉</span>
              WiseJobs
            </h3>
            <p className="text-sm text-muted-foreground">
              Find your next career opportunity with WiseJobs - where talent meets opportunity.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">Browse Jobs</a></li>
              <li><a href="/companies" className="hover:text-foreground transition-colors">Companies</a></li>
              <li><a href="/admin/login" className="hover:text-foreground transition-colors">Post a Job</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Email: hello@wisejobs.com<br />
              Built with Laravel &amp; React
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WiseJobs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

