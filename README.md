## WiseJobs 🦉

WiseJobs is a job board built with **Laravel 12**, **Inertia.js**, **React**, **TypeScript** and **Tailwind CSS**.  
It allows users to browse and filter job postings, and provides an admin area to manage companies and jobs.

### Features

- Public job board:
  - List of published jobs with filters (search, position type, company, location, salary range).
  - Company directory and company detail page.
  - Job detail page at `/jobs/{job}` with full description and company info.
- Admin area:
  - Manage companies (create, update, delete) and see number of job postings for each.
  - Manage job postings per company (create, update, delete).
  - Admin-only access protected by authentication and `is_admin` flag on `users`.
- UX:
  - Responsive layout (mobile → desktop).
  - Dark / Light mode toggle with persistent preference.
  - Reusable components for cards, filters and forms.

### Accessibility considerations

- Labels are associated with all form inputs in filters and forms.
- The main interactive elements (links, buttons, form fields) have a visible focus state, implemented via a global CSS rule:

  ```css
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
      outline: 2px solid theme('colors.ring');
      outline-offset: 2px;
  }
  ```

- Cards and navigation items are fully keyboard accessible (job cards are wrapped in links; filter buttons/links use button or anchor elements).
- The theme toggle, job results list and other key elements expose ARIA attributes (`aria-label`) where helpful to clarify purpose for assistive technologies.

### Getting started

The project is configured to run on **Laravel Sail**.
1. Run `composer install`
   
2. Copy `.env` if needed:

   ```bash
   cp .env.example .env
   ```

3. Start Docker containers:

   ```bash
   ./vendor/bin/sail up -d
   ```

4. Run migrations and seeders:

   ```bash
   ./vendor/bin/sail artisan migrate --force
   ./vendor/bin/sail artisan db:seed
   ```

5. Install frontend dependencies and start Vite:

   ```bash
   ./vendor/bin/sail npm install
   ./vendor/bin/sail npm run dev
   ```

6. Access the app:
   - Public: `http://localhost/`
   - Admin login: `http://localhost/login`
   - Example credentials:
     - Admin: `admin@wisejobs.test` / `password`
     - User: `user@wisejobs.test` / `password`
