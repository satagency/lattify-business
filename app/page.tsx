// app/page.tsx

import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to employee dashboard by default
  // In production, this would check authentication and redirect accordingly
  redirect('/employee');
}

