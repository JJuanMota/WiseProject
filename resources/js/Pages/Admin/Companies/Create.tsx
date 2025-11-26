import { useForm, Link } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface FormData {
  name: string;
  logo: string;
  website: string;
  description: string;
  location: string;
}

export default function Create() {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    name: '',
    logo: '',
    website: '',
    description: '',
    location: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    post('/admin/companies');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">New Company</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create a company to start posting jobs.
                </p>
              </div>
              <Link
                href="/admin/companies"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to companies
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl space-y-6 rounded-lg border border-border bg-card p-6"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="website">
                  Website
                </label>
                <input
                  id="website"
                  type="text"
                  value={data.website}
                  onChange={(e) => setData('website', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://example.com"
                />
                {errors.website && (
                  <p className="text-xs text-destructive mt-1">{errors.website}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={data.location}
                  onChange={(e) => setData('location', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="City, Country"
                />
                {errors.location && (
                  <p className="text-xs text-destructive mt-1">{errors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="logo">
                  Logo URL
                </label>
                <input
                  id="logo"
                  type="text"
                  value={data.logo}
                  onChange={(e) => setData('logo', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="/cloud-company-logo.png"
                />
                {errors.logo && (
                  <p className="text-xs text-destructive mt-1">{errors.logo}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.description && (
                  <p className="text-xs text-destructive mt-1">{errors.description}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3">
                <Link
                  href="/admin/companies"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                >
                  {processing ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
