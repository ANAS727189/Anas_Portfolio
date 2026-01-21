"use client";
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Trophy, Star, GitFork, Target, Award, Users, TrendingUp } from "lucide-react";

interface LeetcodeUser {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  totalSubmissions: number;
  ranking: number;
  reputation: number;
  contributionPoints: number;
  acceptanceRate: string;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
  updated_at: string;
}

const LeetcodePage: React.FC = () => {
  const [leetcodeData, setLeetcodeData] = useState<LeetcodeUser | null>(null);
  const [repoData, setRepoData] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  // Cache management
  const CACHE_KEY = "leetcode_data_cache";
  const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  const getCachedData = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_DURATION) {
          console.log('Using cached LeetCode data');
          return data;
        } else {
          console.log('Cache expired');
        }
      }
    } catch (error) {
      console.error("Error reading cache:", error);
    }
    return null;
  };

  const setCachedData = (data: any) => {
    try {
      const cacheObject = {
        data,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
      console.log('LeetCode data cached successfully');
    } catch (error) {
      console.error("Error setting cache:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Check cache first
      const cachedData = getCachedData();
      if (cachedData) {
        setLeetcodeData(cachedData.leetcodeData);
        setRepoData(cachedData.repoData);
        setLoading(false);
        return;
      }

      try {
        const headers = {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        };

        // Fetch GitHub repos first (more reliable)
        const reposRes = await fetch("https://api.github.com/users/ANAS727189/repos?per_page=100", { headers });
        const reposData = await reposRes.json();

        // Try to fetch LeetCode data with error handling
        let leetcodeData: LeetcodeUser | null = null;
        try {
          const leetcodeRes = await fetch("https://alfa-leetcode-api.onrender.com/userProfile/Anas_Khan83");
          
          if (!leetcodeRes.ok) {
            throw new Error(`LeetCode API returned ${leetcodeRes.status}: ${leetcodeRes.statusText}`);
          }

          const leetcodeRawData = await leetcodeRes.json();
          console.log('LeetCode Raw Data:', leetcodeRawData);

          // Map the API response to our interface
          leetcodeData = {
            easySolved: leetcodeRawData.easySolved || 0,
            mediumSolved: leetcodeRawData.mediumSolved || 0,
            hardSolved: leetcodeRawData.hardSolved || 0,
            totalSolved: leetcodeRawData.totalSolved || 0,
            totalSubmissions: leetcodeRawData.totalSubmissions?.[0]?.submissions || 0,
            ranking: leetcodeRawData.ranking || 0,
            reputation: leetcodeRawData.reputation || 0,
            contributionPoints: leetcodeRawData.contributionPoint || 0,
            acceptanceRate: leetcodeRawData.matchedUserStats?.acSubmissionNum?.[0]?.submissions 
              ? ((leetcodeRawData.matchedUserStats.acSubmissionNum[0].submissions / leetcodeRawData.matchedUserStats.totalSubmissionNum[0].submissions) * 100).toFixed(1) + '%'
              : '0%',
          };

          console.log('Processed LeetCode Data:', leetcodeData);
        } catch (leetcodeError) {
          console.error("Error fetching LeetCode data:", leetcodeError);
          // Use fallback data if API fails
          leetcodeData = {
            easySolved: 285,
            mediumSolved: 427,
            hardSolved: 120,
            totalSolved: 832,
            totalSubmissions: 2129,
            ranking: 48614,
            reputation: 27,
            contributionPoints: 2509,
            acceptanceRate: '72.6%',
          };
          console.log('Using fallback LeetCode data due to API error');
        }

        const processedData = {
          leetcodeData,
          repoData: Array.isArray(reposData) ? reposData : [],
        };

        setLeetcodeData(processedData.leetcodeData);
        setRepoData(processedData.repoData);
        setCachedData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set fallback data on complete failure
        setLeetcodeData({
          easySolved: 285,
          mediumSolved: 427,
          hardSolved: 120,
          totalSolved: 832,
          totalSubmissions: 2129,
          ranking: 41000,
          reputation: 15,
          contributionPoints: 2509,
          acceptanceRate: '72.6%',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const leetcodeProblemData = [
    { name: "Easy", solved: leetcodeData?.easySolved || 0, color: "#10B981" },
    { name: "Medium", solved: leetcodeData?.mediumSolved || 0, color: "#F59E0B" },
    { name: "Hard", solved: leetcodeData?.hardSolved || 0, color: "#EF4444" },
  ];

  const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="text-gray-900 dark:text-white font-medium">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate statistics
  const totalStars = repoData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repoData.reduce((acc, repo) => acc + repo.forks_count, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* LeetCode Problems Chart */}
      <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-gray-800 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 h-full">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-blue-500" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">LeetCode Progress</h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leetcodeProblemData}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="solved" radius={[4, 4, 0, 0]}>
                  {leetcodeProblemData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Detailed Metrics</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{totalStars}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Stars</div>
            </div>
            <div className="text-center">
              <GitFork className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{totalForks}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Forks</div>
            </div>
            <div className="text-center">
              <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {leetcodeData?.ranking ? `#${leetcodeData.ranking.toLocaleString()}` : 'Loading...'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">LC Ranking</div>
            </div>
            <div className="text-center">
              <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {leetcodeData?.acceptanceRate || 'Loading...'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <Trophy className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {leetcodeData?.contributionPoints ? leetcodeData.contributionPoints.toLocaleString() : 'Loading...'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Contribution</div>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {leetcodeData?.reputation || 'Loading...'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Reputation</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeetcodePage;