import React from "react";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="relative w-full min-h-screen flex items-center justify-center text-white text-center px-4">
        {/* Background Image with Blur Overlay */}
        <div className="absolute inset-0 bg-[url('/devCouple.png')] bg-cover bg-center bg-no-repeat z-0">
          <div className="w-full h-full backdrop-blur-xs bg-black/20"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex gap-y-3 flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-rose-300 to-rose-500 bg-clip-text text-transparent font-black drop-shadow-lg">
            Welcome to GitHookUp <img src="/icons.png" alt="GitHookUp Icon" className="inline-block w-20 h-20" />
          </h1>
          <p className="mt-4 text-lg md:text-2xl bg-gradient-to-r from-pink-200 to-pink-400 bg-clip-text text-transparent font-light drop-shadow-md">
            Your one-stop solution for finding the perfect developer match.
          </p>

          <button
            class="relative my-5 w-50 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            onClick={() => (window.location.href = "/login")}
          >
            <span class="relative w-50 text-xl px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Get Started ▷
            </span>
          </button>
        </div>
      </div>
      <section className="bg-black text-white py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          More reasons to connect
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="rounded-2xl bg-gradient-to-br from-purple-800 to-indigo-900 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Pair Programming Sessions
              </h3>
              <p className="text-gray-300">
                Collaborate live with other developers to write better code,
                learn new skills, and debug together in real time.
              </p>
            </div>
            <div className="text-4xl mt-6 text-purple-400">
              <i className="fas fa-code"></i>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-gradient-to-br from-pink-700 to-rose-800 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Offline Meetups</h3>
              <p className="text-gray-300">
                Discover developers near you and plan tech meetups, hackathons,
                or coffee-fueled debugging sessions.
              </p>
            </div>
            <div className="text-4xl mt-6 text-pink-300">
              <i className="fas fa-map-marker-alt"></i>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-gradient-to-br from-cyan-700 to-blue-800 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Cross-Skill Matching
              </h3>
              <p className="text-gray-300">
                Get matched with devs who complement your stack — frontend,
                backend, or full-stack synergy made easy.
              </p>
            </div>
            <div className="text-4xl mt-6 text-cyan-300">
              <i className="fas fa-laptop-code"></i>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl bg-gradient-to-br from-fuchsia-800 to-red-700 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Personalized Dev Profiles
              </h3>
              <p className="text-gray-300">
                Showcase your stack, projects, GitHub, and dev journey — attract
                like-minded devs effortlessly.
              </p>
            </div>
            <div className="text-4xl mt-6 text-rose-300">
              <i className="fas fa-user-circle"></i>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-gray-500 to-gray-900 text-base-content border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">GitHookUp <img src="/icons.png" alt="GitHookUp Icon" className="inline-block w-10 h-10" /></h2>
            <p className="mt-2 text-sm text-gray-300">
              Helping developers find the perfect match — one line of code at a
              time.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2  text-amber-200">
              Quick Links
            </h3>
            <ul className="space-y-1 text-sm  text-amber-50">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg text-amber-50 font-semibold mb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4 text-2xl text-rose-500">
              <a href="#" aria-label="GitHub" className="hover:text-rose-600">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-rose-600">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-rose-600">
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-rose-600"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-base-300 text-sm text-center py-4 text-gray-500">
          © {new Date().getFullYear()} GitHookUp. Built with ❤️ for developers.
        </div>
      </footer>
    </>
  );
};

export default Home;
