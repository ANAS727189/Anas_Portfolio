"use client";
import React from "react";
import GithubPage from "@/components/GithubPage";
import RepoPage from "@/components/RepoPage";
import LeetcodePage from "@/components/LeetcodePage";
import GitHubCommitHistory from "@/components/GithubCommitHistory";

const MainPage: React.FC = () => {
  return (
    <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold">Developer</p>
        <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Analytics</h3>
        <GithubPage />
        <RepoPage />
        <GitHubCommitHistory />
        <LeetcodePage />
      </div>
    </section>
  );
};

export default MainPage;