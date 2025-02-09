import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Github, MapPin, Mail, User, Briefcase, Code, Award, BookOpen, Star, GitFork } from 'lucide-react';
import Image from 'next/image';

const Profile = () => {
    interface GitHubUser {
        avatar_url: string;
        bio: string;
        location: string;
        email: string | null;
        public_repos: number;
        followers: number;
        following: number;
        created_at: string;
    }

    interface GitHubRepo {
        name: string;
        stargazers_count: number;
        forks_count: number;
        language: string;
    }

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

    const [githubData, setGithubData] = useState<GitHubUser | null>(null);
    const [leetcodeData, setLeetcodeData] = useState<LeetcodeUser | null>(null);
    const [repoData, setRepoData] = useState<GitHubRepo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const headers = {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
            };
            const githubRes = await fetch('https://api.github.com/users/ANAS727189', {
                headers,
                cache: 'force-cache'
            });
            const reposRes = await fetch('https://api.github.com/users/ANAS727189/repos?per_page=100', {
                headers,
                cache: 'force-cache'
            });
            const leetcodeRes = await fetch('https://leetcode-stats-api.herokuapp.com/Anas_Khan83');
            
            const githubData = await githubRes.json();
            const leetcodeData = await leetcodeRes.json();
            const reposData = await reposRes.json();
        console.log(githubData, leetcodeData, reposData);
            setGithubData(githubData);
            setLeetcodeData(leetcodeData);
            setRepoData(reposData);
            console.log(githubData, leetcodeData, reposData);

            setGithubData(githubData);
        setLeetcodeData(leetcodeData);
            setRepoData(Array.isArray(reposData) ? reposData : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    const languageStats = repoData.reduce((acc: { [key: string]: number }, repo) => {
        if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
    }, {});

    const languageChartData = Object.entries(languageStats).map(([name, count]) => ({
        name,
        value: count,
        color: getLanguageColor(name)
    }));

    function getLanguageColor(language: string): string {
        const colors: { [key: string]: string } = {
        JavaScript: '#f1e05a',
        TypeScript: '#2b7489',
        Python: '#3572A5',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Java: '#b07219',
        PHP: '#4F5D95',
        'C++': '#f34b7d',
        Ruby: '#701516',
        Go: '#00ADD8',
        default: '#8B8B8B'
        };
        return colors[language] || colors.default;
    }

    const leetcodeProblemData = [
        { name: 'Easy', solved: leetcodeData?.easySolved || 0, color: '#10B981' },
        { name: 'Medium', solved: leetcodeData?.mediumSolved || 0, color: '#F59E0B' },
        { name: 'Hard', solved: leetcodeData?.hardSolved || 0, color: '#EF4444' },
    ];

    return (
        <div className="space-y-6">
        {/* Profile Card - Same as before */}
        <Card className="w-full bg-zinc-950 border-zinc-800">
            <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Developer Profile</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex items-start space-x-6">
                {githubData?.avatar_url && (
                <div className="relative">
                    <Image
                    src={githubData.avatar_url}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-xl ring-2 ring-blue-500/20"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                    <Code className="w-4 h-4 text-white" />
                    </div>
                </div>
                )}
                <div className="space-y-4 flex-1">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium">{githubData?.bio || 'Full Stack Developer'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-zinc-300">{githubData?.location || 'Location'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-zinc-300">{githubData?.email || 'Email'}</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                    <div className="text-center">
                    <div className="text-2xl font-bold text-white">{githubData?.public_repos || 0}</div>
                    <div className="text-sm text-zinc-400">Repositories</div>
                    </div>
                    <div className="text-center">
                    <div className="text-2xl font-bold text-white">{githubData?.followers || 0}</div>
                    <div className="text-sm text-zinc-400">Followers</div>
                    </div>
                    <div className="text-center">
                    <div className="text-2xl font-bold text-white">{leetcodeData?.totalSolved || 0}</div>
                    <div className="text-sm text-zinc-400">Problems Solved</div>
                    </div>
                </div>
                </div>
            </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* LeetCode Problems Chart */}
            <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                LeetCode Problems
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leetcodeProblemData}>
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip 
                        contentStyle={{ 
                        background: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '6px'
                        }}
                    />
                    <Bar dataKey="solved" radius={[4, 4, 0, 0]}>
                        {leetcodeProblemData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Technology Stack
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={languageChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {languageChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                        background: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '6px'
                        }}
                    />
                    </PieChart>
                </ResponsiveContainer>
                </div>
            </CardContent>
            </Card>
        </div>
        <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                Key Metrics
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-4 gap-6">
                <div className="space-y-2">
                <p className="text-sm text-zinc-400">Global Ranking</p>
                <p className="text-2xl font-bold text-white">#{leetcodeData?.ranking || 0}</p>
                </div>
                <div className="space-y-2">
                <p className="text-sm text-zinc-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">
                    {leetcodeData?.acceptanceRate}
                </p>
                </div>
                <div className="space-y-2">
                <p className="text-sm text-zinc-400">Contribution Points</p>
                <p className="text-2xl font-bold text-white">{leetcodeData?.contributionPoints || 0}</p>
                </div>
                <div className="space-y-2">
                <p className="text-sm text-zinc-400">Reputation</p>
                <p className="text-2xl font-bold text-white">{leetcodeData?.reputation || 0}</p>
                </div>
            </div>
            </CardContent>
        </Card>
        </div>
    );
};

export default Profile;