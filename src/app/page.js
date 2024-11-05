import Image from "next/image";
import LoginPage from "./login/page.js";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the IT Support App</h1>
      <nav>
        <ul>
          <li><Link href="/signup">Sign Up</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/ticketdetails">Ticket Detail</Link></li>
          <li><Link href="/ticketOverview">Ticket Overview</Link></li>
        </ul>
      </nav>
      <p>This app allows you to sign up, log in, and access a secure dashboard.</p>
    </div>
  );
}
