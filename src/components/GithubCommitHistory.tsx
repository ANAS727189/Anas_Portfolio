"use client";
import React, { useState, useEffect } from "react";
import { Activity, Calendar, GitCommit, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface CommitData {
  date: string;
  commits: number;
  day: string;
}

interface WeeklyData {
  week: string;
  commits: number;
}

interface MonthlyData {
  month: string;
  commits: number;
}

const GitHubCommitHistory: React.FC = () => {
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [totalCommits, setTotalCommits] = useState(0);
  const [streak, setStreak] = useState(0);
  const [avgCommitsPerDay, setAvgCommitsPerDay] = useState(0);

  // In-memory cache
  const [cache, setCache] = useState<{
    data: any;
    timestamp: number;
  }>({
    data: null,
    timestamp: 0
  });

  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  const isCacheValid = () => {
    const now = new Date().getTime();
    return cache.timestamp && (now - cache.timestamp < CACHE_DURATION);
  };

  // Generate mock data (replace with actual GitHub API calls)
  const generateMockData = () => {
    const dailyData: CommitData[] = [];
    const weeklyData: WeeklyData[] = [];
    const monthlyData: MonthlyData[] = [];
    
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let totalCommits = 0;
    let currentStreak = 0;
    let tempStreak = 0;
    
    // Generate daily data for last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const commits = Math.floor(Math.random() * 8); // 0-7 commits per day
      
      dailyData.push({
        date: date.toISOString().split('T')[0],
        commits,
        day: days[date.getDay()]
      });
      
      totalCommits += commits;
      
      // Calculate streak
      if (commits > 0) {
        tempStreak++;
        currentStreak = Math.max(currentStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
    
    // Generate weekly data for last 12 weeks
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - (i * 7));
      const commits = Math.floor(Math.random() * 25) + 5; // 5-30 commits per week
      
      weeklyData.push({
        week: `Week ${12 - i}`,
        commits
      });
    }
    
    // Generate monthly data for last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      const commits = Math.floor(Math.random() * 80) + 20; // 20-100 commits per month
      
      monthlyData.push({
        month: months[date.getMonth()],
        commits
      });
    }
    
    return {
      dailyData,
      weeklyData,
      monthlyData,
      totalCommits,
      streak: currentStreak,
      avgCommitsPerDay: Number((totalCommits / 30).toFixed(1))
    };
  };

  useEffect(() => {
    const fetchCommitData = async () => {
      setLoading(true);
      
      // Check cache first
      if (isCacheValid() && cache.data) {
        const data = cache.data;
        setCommitData(data.dailyData);
        setWeeklyData(data.weeklyData);
        setMonthlyData(data.monthlyData);
        setTotalCommits(data.totalCommits);
        setStreak(data.streak);
        setAvgCommitsPerDay(data.avgCommitsPerDay);
        setLoading(false);
        return;
      }
      
      try {
        // For now, using mock data. Replace with actual GitHub API calls
        const data = generateMockData();
        
        setCommitData(data.dailyData);
        setWeeklyData(data.weeklyData);
        setMonthlyData(data.monthlyData);
        setTotalCommits(data.totalCommits);
        setStreak(data.streak);
        setAvgCommitsPerDay(data.avgCommitsPerDay);
        
        // Update cache
        setCache({
          data,
          timestamp: new Date().getTime()
        });
      } catch (error) {
        console.error("Error fetching commit data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitData();
  }, []);

  const getCurrentData = () => {
    switch (activeView) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return commitData;
    }
  };

  const getDataKey = () => {
    switch (activeView) {
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      default:
        return 'day';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <p className="text-gray-900 dark:text-white font-medium">{label}</p>
          <p className="text-blue-500">
            Commits: <span className="font-bold">{payload[0].value}</span>
          </p>
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
      value: totalCommits,
      label: "Total Commits",
      icon: <GitCommit className="w-4 h-4" />,
      color: "text-blue-500"
    },
    {
      value: streak,
      label: "Current Streak",
      icon: <Activity className="w-4 h-4" />,
      color: "text-green-500"
    },
    {
      value: avgCommitsPerDay,
      label: "Avg/Day",
      icon: <TrendingUp className="w-4 h-4" />,
      color: "text-purple-500"
    },
    {
      value: commitData.filter(d => d.commits > 0).length,
      label: "Active Days",
      icon: <Calendar className="w-4 h-4" />,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="rounded-2xl p-[1px] bg-gray-200 dark:bg-[#171717] mb-8">
      <div className="bg-white dark:bg-[#111] rounded-2xl p-8 shadow-md dark:shadow-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Commit Activity
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Track your coding consistency and contribution patterns
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mt-4 sm:mt-0">
            {(['daily', 'weekly', 'monthly'] as const).map((view) => (
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

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

        {/* Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeView === 'daily' ? (
              <LineChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey={getDataKey()} 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  stroke="#6B7280"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  stroke="#6B7280"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="commits" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey={getDataKey()} 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  stroke="#6B7280"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  stroke="#6B7280"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="commits" 
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Activity Heatmap Preview */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Recent Activity
          </h5>
          <div className="grid grid-cols-7 gap-1 max-w-md">
            {commitData.slice(-21).map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm ${
                  day.commits === 0 
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : day.commits <= 2
                    ? 'bg-blue-200 dark:bg-blue-900'
                    : day.commits <= 4
                    ? 'bg-blue-400 dark:bg-blue-700'
                    : 'bg-blue-600 dark:bg-blue-500'
                }`}
                title={`${day.date}: ${day.commits} commits`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Last 3 weeks activity
          </p>
        </div>
      </div>
    </div>
  );
};

export default GitHubCommitHistory;