import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to EEEfield!</h1>
      <p className="mt-4">
        <Link to="/interactive-formula" className="text-blue-500 underline">
          Go to the interactive formula sheet (WIP) →
        </Link>
      </p>
      <p>
        <a href="/formula/index.html" className="text-blue-500 underline">
          Go to the working formula sheet lmao →
        </a>
      </p>
    </main>
  );
}
