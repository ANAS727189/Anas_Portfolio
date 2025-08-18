"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Code, Star, GitFork, Users } from "lucide-react";
import Image from "next/image";

interface GitHubUser {
  avatar_url: string;
  bio: string;
  location: string;
  email: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  name: string;
  login: string;
}

interface GitHubStats {
  totalStars: number;
  totalForks: number;
}

const GithubPage: React.FC = () => {
  const [githubData, setGithubData] = useState<GitHubUser | null>(null);
  const [githubStats, setGithubStats] = useState<GitHubStats>({ totalStars: 0, totalForks: 0 });
  const [loading, setLoading] = useState(true);

  // In-memory cache for the session
  const [cache, setCache] = useState<{
    userData: GitHubUser | null;
    statsData: GitHubStats | null;
    timestamp: number;
  }>({
    userData: null,
    statsData: null,
    timestamp: 0
  });

  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  const isCacheValid = () => {
    const now = new Date().getTime();
    return cache.timestamp && (now - cache.timestamp < CACHE_DURATION);
  };

  const fetchGitHubStats = async (username: string) => {
    try {
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const repos = await reposResponse.json();
      
      if (Array.isArray(repos)) {
        const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);
        const totalForks = repos.reduce((sum: number, repo: any) => sum + (repo.forks_count || 0), 0);
        return { totalStars, totalForks };
      }
      return { totalStars: 0, totalForks: 0 };
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      return { totalStars: 0, totalForks: 0 };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Check in-memory cache first
      if (isCacheValid() && cache.userData && cache.statsData) {
        setGithubData(cache.userData);
        setGithubStats(cache.statsData);
        setLoading(false);
        return;
      }

      try {
        const headers = {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          }),
        };

        // Fetch user data
        const githubRes = await fetch("https://api.github.com/users/ANAS727189", { headers });
        const userData = await githubRes.json();

        // Fetch stats
        const statsData = await fetchGitHubStats("ANAS727189");

        setGithubData(userData);
        setGithubStats(statsData);

        // Update in-memory cache
        setCache({
          userData,
          statsData,
          timestamp: new Date().getTime()
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  const joinYear = githubData?.created_at 
    ? new Date(githubData.created_at).getFullYear() 
    : 2020;

  const stats = [
    {
      value: githubData?.public_repos || 0,
      label: "Repositories",
      icon: <Code className="w-4 h-4" />,
      color: "text-blue-500"
    },
    {
      value: githubStats.totalStars,
      label: "Total Stars",
      icon: <Star className="w-4 h-4" />,
      color: "text-yellow-500"
    },
    {
      value: githubStats.totalForks,
      label: "Total Forks",
      icon: <GitFork className="w-4 h-4" />,
      color: "text-green-500"
    },
    {
      value: githubData?.followers || 0,
      label: "Followers",
      icon: <Users className="w-4 h-4" />,
      color: "text-purple-500"
    }
  ];

  return (
    <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-12">
        {/* <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold">Open Source</p>
        <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">GitHub Profile</h3> */}

        <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717]">
          <div className="bg-white dark:bg-[#111] rounded-2xl p-8 shadow-md dark:shadow-none">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Image */}
              {githubData?.avatar_url && (
                <div className="relative shrink-0">
                  <div className="relative w-32 h-32">
                    <Image
                      src={githubData.avatar_url}
                      alt="GitHub Profile"
                      fill
                      className="rounded-2xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 ring-4 ring-white dark:ring-[#111]">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {githubData?.name || "Anas Khan"}
                  </h4>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    {githubData?.bio || "Full Stack Developer & Open Source Contributor"}
                  </p>
                </div>

                {/* Location and Join Date */}
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                  {githubData?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>{githubData.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Coding since {joinYear}</span>
                  </div>
                </div>

                {/* GitHub Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold ${stat.color} flex items-center justify-center gap-2`}>
                        {stat.icon}
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* GitHub Link */}
                <div className="pt-4">
                  <a
                    href={`https://github.com/${githubData?.login || 'ANAS727189'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium text-md"
                  >
                    <Code className="w-6 h-6" />
                    View GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default GithubPage;