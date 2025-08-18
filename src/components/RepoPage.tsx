"use client";
import React, { useState, useEffect } from "react";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line 
} from "recharts";
import { 
  Code, Star, Calendar, TrendingUp, 
  Package, Activity, Zap, Award, Target 
} from "lucide-react";

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  size: number;
  open_issues_count: number;
  description: string;
  topics: string[];
  pushed_at: string;
}

interface LanguageData {
  name: string;
  value: number;
  color: string;
  stars: number;
  forks: number;
  repos: GitHubRepo[];
}

interface TechCategory {
  name: string;
  languages: string[];
  count: number;
  percentage: number;
  color: string;
}

const RepoPage: React.FC = () => {
  const [repoData, setRepoData] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'languages' | 'categories' | 'timeline'>('languages');

  // In-memory cache
  const [cache, setCache] = useState<{
    data: GitHubRepo[];
    timestamp: number;
  }>({
    data: [],
    timestamp: 0
  });

  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  const isCacheValid = () => {
    const now = new Date().getTime();
    return cache.timestamp && (now - cache.timestamp < CACHE_DURATION);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Check in-memory cache first
      if (isCacheValid() && cache.data.length > 0) {
        setRepoData(cache.data);
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

        const reposRes = await fetch("https://api.github.com/users/ANAS727189/repos?per_page=100&sort=updated", { headers });
        const reposData = await reposRes.json();

        const processedData = Array.isArray(reposData) ? reposData : [];
        setRepoData(processedData);
        
        // Update cache
        setCache({
          data: processedData,
          timestamp: new Date().getTime()
        });
      } catch (error) {
        console.error("Error fetching repo data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      JavaScript: "#f7df1e",
      TypeScript: "#3178c6",
      Python: "#3776ab",
      HTML: "#e34c26",
      CSS: "#1572b6",
      Java: "#ed8b00",
      PHP: "#777bb4",
      "C++": "#00599c",
      C: "#a8b9cc",
      Ruby: "#701516",
      Go: "#00add8",
      Rust: "#dea584",
      Swift: "#fa7343",
      Kotlin: "#a97bff",
      Vue: "#4fc08d",
      React: "#61dafb",
      Angular: "#dd0031",
      Dart: "#0175c2",
      Scala: "#c22d40",
      Shell: "#89e051",
      Dockerfile: "#384d54",
      SCSS: "#c6538c",
      Solidity: "#363636",
      default: "#6b7280",
    };
    return colors[language] || colors.default;
  }

  // Enhanced statistics calculations
  const totalStars = repoData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repoData.reduce((acc, repo) => acc + repo.forks_count, 0);
  const totalSize = repoData.reduce((acc, repo) => acc + (repo.size || 0), 0);
  const avgStarsPerRepo = repoData.length > 0 ? (totalStars / repoData.length).toFixed(1) : "0";

  // Most starred repository
  const topRepo = repoData.reduce((prev, current) => 
    (prev.stargazers_count > current.stargazers_count) ? prev : current, 
    repoData[0] || { name: "N/A", stargazers_count: 0 }
  );

  // Recently active repositories (last 30 days)
  const recentlyActive = repoData.filter(repo => {
    const pushDate = new Date(repo.pushed_at || repo.updated_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return pushDate > thirtyDaysAgo;
  }).length;

  // Language statistics with enhanced data
  const languageStats = repoData.reduce((acc: { [key: string]: LanguageData }, repo) => {
    if (repo.language) {
      if (!acc[repo.language]) {
        acc[repo.language] = {
          name: repo.language,
          value: 0,
          color: getLanguageColor(repo.language),
          stars: 0,
          forks: 0,
          repos: []
        };
      }
      acc[repo.language].value += 1;
      acc[repo.language].stars += repo.stargazers_count;
      acc[repo.language].forks += repo.forks_count;
      acc[repo.language].repos.push(repo);
    }
    return acc;
  }, {});

  const languageChartData = Object.values(languageStats)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Technology categories
  const techCategories: TechCategory[] = [
    {
      name: "Frontend",
      languages: ["JavaScript", "TypeScript", "HTML", "CSS", "Vue", "React", "Angular", "SCSS"],
      count: 0,
      percentage: 0,
      color: "#3b82f6"
    },
    {
      name: "Backend",
      languages: ["Python", "Java", "PHP", "Go", "Ruby", "C++", "C", "Rust"],
      count: 0,
      percentage: 0,
      color: "#10b981"
    },
    {
      name: "Mobile",
      languages: ["Swift", "Kotlin", "Dart"],
      count: 0,
      percentage: 0,
      color: "#f59e0b"
    },
    {
      name: "DevOps",
      languages: ["Shell", "Dockerfile"],
      count: 0,
      percentage: 0,
      color: "#8b5cf6"
    },
    {
      name: "Blockchain",
      languages: ["Solidity"],
      count: 0,
      percentage: 0,
      color: "#ef4444"
    }
  ];

  // Calculate category counts
  techCategories.forEach(category => {
    category.count = repoData.filter(repo => 
      repo.language && category.languages.includes(repo.language)
    ).length;
    category.percentage = repoData.length > 0 ? (category.count / repoData.length) * 100 : 0;
  });

  const filteredCategories = techCategories.filter(cat => cat.count > 0);

  // Timeline data (repos created over time)
  const timelineData = repoData.reduce((acc: { [key: string]: number }, repo) => {
    const year = new Date(repo.created_at).getFullYear().toString();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const timelineChartData = Object.entries(timelineData)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([year, count]) => ({ year, count }));

  const CustomPieTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = languageChartData.reduce((acc, curr) => acc + curr.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);

      return (
        <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="font-medium text-gray-900 dark:text-white">{data.name}</span>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{percentage}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{data.value} repositories</div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">{data.stars} stars</div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717] mb-8">
        <div className="bg-white dark:bg-[#111] rounded-2xl p-8 shadow-md dark:shadow-none">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      value: repoData.length,
      label: "Total Projects",
      icon: <Package className="w-4 h-4" />,
      color: "text-blue-500"
    },
    {
      value: Object.keys(languageStats).length,
      label: "Languages",
      icon: <Code className="w-4 h-4" />,
      color: "text-green-500"
    },
    {
      value: totalStars,
      label: "Total Stars",
      icon: <Star className="w-4 h-4" />,
      color: "text-yellow-500"
    },
    {
      value: recentlyActive,
      label: "Active (30d)",
      icon: <Activity className="w-4 h-4" />,
      color: "text-purple-500"
    }
  ];

  const additionalStats = [
    {
      label: "Top Repository",
      value: topRepo.name,
      subValue: `${topRepo.stargazers_count} stars`,
      icon: <Award className="w-4 h-4" />,
      color: "text-orange-500"
    },
    {
      label: "Average Stars",
      value: avgStarsPerRepo,
      subValue: "per repository",
      icon: <Target className="w-4 h-4" />,
      color: "text-pink-500"
    },
    {
      label: "Total Size",
      value: `${(totalSize / 1024).toFixed(1)}MB`,
      subValue: "codebase size",
      icon: <Zap className="w-4 h-4" />,
      color: "text-indigo-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717]">
        <div className="bg-white dark:bg-[#111] rounded-2xl p-8 shadow-md dark:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Repository Analytics
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive overview of your coding portfolio and technology stack
              </p>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mt-4 sm:mt-0">
              {(['languages', 'categories', 'timeline'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                    activeView === view
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className={`${stat.color} flex items-center gap-2 mb-1`}>
                  {stat.icon}
                  <span className="text-xl font-bold">{stat.value}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {additionalStats.map((stat, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={stat.color}>{stat.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.subValue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Content Based on Active View */}
      {activeView === 'languages' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Language Distribution Chart */}
          <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717]">
            <div className="bg-white dark:bg-[#111] rounded-2xl p-6 shadow-md dark:shadow-none h-full">
              <div className="flex items-center gap-2 mb-6">
                <Code className="w-5 h-5 text-blue-500" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Language Distribution</h4>
              </div>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageChartData.slice(0, 8)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {languageChartData.slice(0, 8).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{Object.keys(languageStats).length}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Languages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Languages by Stars */}
          <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717]">
            <div className="bg-white dark:bg-[#111] rounded-2xl p-6 shadow-md dark:shadow-none h-full">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-yellow-500" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Top Languages by Impact</h4>
              </div>
              <div className="space-y-4">
                {languageChartData.slice(0, 6).map((lang, index) => {
                  const total = languageChartData.reduce((acc, curr) => acc + curr.value, 0);
                  const percentage = ((lang.value / total) * 100).toFixed(1);
                  return (
                    <div key={lang.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-400 dark:text-gray-500 w-6">
                            #{index + 1}
                          </span>
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: lang.color }} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{lang.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {lang.value} repos • {lang.stars} stars
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technology Categories Chart */}
          <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717]">
            <div className="bg-white dark:bg-[#111] rounded-2xl p-6 shadow-md dark:shadow-none h-full">
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-5 h-5 text-purple-500" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Technology Categories</h4>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredCategories}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      stroke="#6B7280"
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      stroke="#6B7280"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--tooltip-bg)', 
                        border: '1px solid var(--tooltip-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {filteredCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717]">
            <div className="bg-white dark:bg-[#111] rounded-2xl p-6 shadow-md dark:shadow-none h-full">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-green-500" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Category Breakdown</h4>
              </div>
              <div className="space-y-4">
                {filteredCategories.map((category, index) => (
                  <div key={category.name} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {category.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {category.count} repositories
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500" 
                        style={{ 
                          backgroundColor: category.color, 
                          width: `${category.percentage}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'timeline' && (
        <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717]">
          <div className="bg-white dark:bg-[#111] rounded-2xl p-6 shadow-md dark:shadow-none">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Repository Creation Timeline</h4>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    stroke="#6B7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    stroke="#6B7280"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--tooltip-bg)', 
                      border: '1px solid var(--tooltip-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoPage;