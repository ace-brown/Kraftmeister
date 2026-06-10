import { redirect } from 'next/navigation';

/** Redirects the root URL to the dashboard. */
export default function RootPage() {
  redirect('/dashboard');
}
