// src/App.jsx
import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="flex min-h-screen w-full items-center justify-center bg-gray-50 text-gray-600">
      <div class="relative">
        <div class="hidden sm:block absolute -left-20 -top-20 z-0 h-56 w-56 text-indigo-300">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="a"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.6)"
              >
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="800%" height="800%" fill="url(#a)" />
          </svg>
        </div>
        <div class="hidden sm:block absolute -right-20 -bottom-20 z-0 h-28 w-28 text-indigo-300">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="b"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.5)"
              >
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="800%" height="800%" fill="url(#b)" />
          </svg>
        </div>

        <div class="relative z-10 flex flex-col sm:w-[30rem] rounded-lg bg-white shadow-lg px-6 py-8">
          <div class="mb-10 flex justify-center">
            <a
              href="#"
              class="flex items-center gap-2 text-indigo-500 text-3xl font-black lowercase tracking-tight"
            >
              TMKC
            </a>
          </div>

          <form class="mb-4" onSubmit={handleLogin}>
            <div class="mb-4">
              <label
                for="email"
                class="mb-2 block text-xs font-medium  text-gray-700"
              >
                Email or Username
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email or username"
                class="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:bg-white focus:shadow"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div class="mb-4">
              <div class="flex justify-between">
                <label
                  for="password"
                  class="mb-2 block text-xs font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                class="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:bg-white focus:shadow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div class="mb-4">
              <button
                type="submit"
                class="w-full rounded-md bg-indigo-500 px-5 py-2 text-sm text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
