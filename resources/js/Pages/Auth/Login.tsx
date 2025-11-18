import { Head, useForm } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    post('/login', {
      onFinish: () => {
        setData('password', '');
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head title="Login - WiseJobs" />
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-border bg-card px-6 py-8 shadow-sm">
            <h1 className="text-xl font-semibold mb-1">Sign in</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Use the admin credentials to manage companies and jobs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="h-4 w-4 rounded border border-input bg-background"
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
              >
                Sign in
              </button>

              <p className="mt-4 text-xs text-muted-foreground">
                For testing, you can use <span className="font-medium">admin@wisejobs.test</span>{' '}
                with password <span className="font-medium">password</span> to access the admin
                area.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

