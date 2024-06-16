import { Outlet } from "react-router-dom";

export function App() {
  return (
    <main className="w-full flex flex-col items-center bg-surface">
      <div className="min-h-screen xl:w-1/3 lg:w-3/5 md:w-2/3 sm:w-2/3 text-text-primary flex flex-col items-center">
        <header className="mt-16 text-2xl">Big Five Personality Test</header>
        <small className="mb-8">
          Created by{" "}
          <a href="https://facebook.com/mezuu918" className="text-green-400 hover:underline">
            Mezuu
          </a>
        </small>

        <Outlet />
      </div>
    </main>
  );
}
