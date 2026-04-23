"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface Recipe {
  title: string;
  time: string;
  steps: [string, string, string];
}

const MOCK_RECIPES: Recipe[] = [
  {
    title: "Cheesy Pasta Frittata",
    time: "20 min",
    steps: [
      "Cook 200 g pasta until al dente, drain and let cool slightly.",
      "Beat 4 eggs with grated cheese, diced tomato, and a pinch of salt. Fold in the pasta.",
      "Pour into an oiled oven-safe pan. Cook on medium 3 min, then grill until golden and set.",
    ],
  },
  {
    title: "Tomato & Egg Shakshuka",
    time: "25 min",
    steps: [
      "Sauté diced onion in olive oil until soft, add chopped tomatoes and simmer 8 min.",
      "Make 3 wells in the sauce and crack an egg into each. Season with salt and pepper.",
      "Cover and cook on low 5–7 min until whites are set. Top with crumbled cheese and serve.",
    ],
  },
  {
    title: "Pasta Aglio e Uovo",
    time: "15 min",
    steps: [
      "Boil pasta in salted water. While it cooks, warm olive oil with sliced onion until golden.",
      "Beat 2 eggs with grated cheese and a splash of pasta water to make a creamy sauce.",
      "Drain pasta, toss off heat with egg mixture and onion oil. Serve with extra cheese.",
    ],
  },
];

const INGREDIENTS = ["eggs", "cheese", "pasta", "tomato", "onion"];

export default function TryPage() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showRecipes, setShowRecipes] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    setShowRecipes(false);
    setExpanded(null);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleAnalyse() {
    setShowRecipes(true);
    setExpanded(null);
  }

  function handleReset() {
    setPhotoUrl(null);
    setShowRecipes(false);
    setExpanded(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-lime-500" />
          FridgeChef
        </Link>
        <a
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </a>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-lime-600">
            What&apos;s in your fridge?
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Upload a photo, get three dinner ideas.
          </h1>
        </div>

        {/* Upload area */}
        {!photoUrl ? (
          <div
            className="rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-12 text-center cursor-pointer hover:border-lime-400 hover:bg-lime-50 transition"
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="text-4xl mb-4">📸</div>
            <p className="font-semibold text-neutral-700">Drop a fridge photo here</p>
            <p className="mt-1 text-sm text-neutral-500">or click to browse</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="rounded-3xl border border-neutral-200 overflow-hidden bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt="Your fridge"
              className="w-full max-h-72 object-cover"
            />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-lime-600">
                    Spotted in your fridge
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                    {INGREDIENTS.map((ing) => (
                      <span
                        key={ing}
                        className="rounded-full bg-lime-50 px-2 py-1 text-lime-900 capitalize"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-neutral-400 hover:text-neutral-700 underline ml-4 shrink-0"
                >
                  Remove
                </button>
              </div>
              {!showRecipes && (
                <button
                  onClick={handleAnalyse}
                  className="mt-5 w-full rounded-full bg-lime-600 py-3 font-medium text-white transition hover:bg-lime-700"
                >
                  Get dinner ideas →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Recipes */}
        {showRecipes && (
          <div className="mt-8 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-lime-600">
              Tonight&apos;s options
            </p>
            {MOCK_RECIPES.map((recipe, i) => (
              <div
                key={i}
                className="rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-50 transition"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div>
                    <p className="font-semibold text-neutral-900">{recipe.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{recipe.time} · uses your ingredients</p>
                  </div>
                  <span className="text-neutral-400 text-lg">{expanded === i ? "−" : "+"}</span>
                </button>

                {expanded === i && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-3">
                      {recipe.steps.map((step, j) => (
                        <li key={j} className="flex gap-3 text-sm text-neutral-700">
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-100 text-xs font-bold text-lime-700">
                            {j + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-neutral-400">
          This is a v0 preview with mocked recipes.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for real AI-powered suggestions.
        </p>
      </div>
    </div>
  );
}
