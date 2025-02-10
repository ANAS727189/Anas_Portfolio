import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MapPin, Mail, User, Briefcase, Code, Award } from "lucide-react";
import Image from "next/image";

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

    // State variables
    const [githubData, setGithubData] = useState<GitHubUser | null>(null);
    const [leetcodeData, setLeetcodeData] = useState<LeetcodeUser | null>(null);
    const [repoData, setRepoData] = useState<GitHubRepo[]>([]);
    const [tooltipActive, setTooltipActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const headers = {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            };
            const githubRes = await fetch("https://api.github.com/users/ANAS727189", {
            headers,
            cache: "force-cache",
            });
            const reposRes = await fetch("https://api.github.com/users/ANAS727189/repos?per_page=100", {
            headers,
            cache: "force-cache",
            });
            const leetcodeRes = await fetch("https://leetcode-stats-api.herokuapp.com/Anas_Khan83");

            const githubData = await githubRes.json();
            const leetcodeData = await leetcodeRes.json();
            const reposData = await reposRes.json();

            setGithubData(githubData);
            setLeetcodeData(leetcodeData);
            setRepoData(Array.isArray(reposData) ? reposData : []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };

        fetchData();
    }, []);

    // For rendering labels on the pie (if needed)
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }: {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        percent: number;
        index: number;
    }) => {
        const radius = outerRadius * 0.9;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
        <text
            x={x}
            y={y}
            fill="white"
            fontSize="12"
            dominantBaseline="central"
            textAnchor={x > cx ? "start" : "end"}
        >
            {`${(percent * 100).toFixed(2)}%`}
        </text>
        );
    };

    // Calculate language stats from repository data
    const languageStats = repoData.reduce((acc: { [key: string]: number }, repo) => {
        if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
    }, {});

    const languageChartData = Object.entries(languageStats).map(([name, count]) => ({
        name,
        value: count,
        color: getLanguageColor(name),
    }));

    function getLanguageColor(language: string): string {
        const colors: { [key: string]: string } = {
        JavaScript: "#f7df1e",
        TypeScript: "#007acc",
        Python: "#3776ab",
        HTML: "#e34c26",
        CSS: "#264de4",
        Java: "#b07219",
        PHP: "#777bb4",
        "C++": "#00599c",
        Ruby: "#cc342d",
        Go: "#00add8",
        Rust: "#dea584",
        Swift: "#ffac45",
        Kotlin: "#a97bff",
        Vue: "#42b883",
        React: "#61dafb",
        Angular: "#dd1b16",
        Dart: "#00b4ab",
        Scala: "#dc322f",
        default: "#8b949e",
        };
        return colors[language] || colors.default;
    }

    const leetcodeProblemData = [
        { name: "Easy", solved: leetcodeData?.easySolved || 0, color: "#10B981" },
        { name: "Medium", solved: leetcodeData?.mediumSolved || 0, color: "#F59E0B" },
        { name: "Hard", solved: leetcodeData?.hardSolved || 0, color: "#EF4444" },
    ];

    // Custom tooltip for the BarChart (LeetCode Problems)
    interface CustomTooltipProps {
        active?: boolean;
        payload?: any[];
        label?: string;
    }

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-900 p-2 border border-zinc-800 rounded-lg shadow-lg">
            <p className="text-white font-medium">{`${label}: ${payload[0].value}`}</p>
            </div>
        );
        }
        return null;
    };

    // Custom tooltip for the PieChart that also sets the tooltip active state
    interface CustomPieTooltipProps {
        active?: boolean;
        payload?: any[];
        setTooltipActive: (active: boolean) => void;
    }

    const CustomPieTooltip: React.FC<CustomPieTooltipProps> = ({ active, payload, setTooltipActive }) => {
        useEffect(() => {
        setTooltipActive(active || false);
        }, [active, setTooltipActive]);

        if (active && payload && payload.length) {
        const data = payload[0].payload;
        const total = languageChartData.reduce((acc, curr) => acc + curr.value, 0);
        const percentage = ((data.value / total) * 100).toFixed(2);

        return (
            <div className="bg-zinc-900/95 px-4 py-3 rounded-lg border border-zinc-800/50 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                <span className="font-medium text-white text-sm">{data.name}</span>
            </div>
            <div className="text-2xl font-bold text-white">{percentage}%</div>
            <div className="text-xs text-zinc-400 mt-1">{data.value} repositories</div>
            </div>
        );
        }
        return null;
    };

    return (
        <div className="space-y-6">
        {/* Profile Card */}
        <Card className="w-full bg-zinc-950 border-zinc-800">
            <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Developer Profile</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col md:flex-row items-start gap-6">
                {githubData?.avatar_url && (
                <div className="relative w-full md:w-auto">
                    <Image
                    src={githubData.avatar_url || "/placeholder.svg"}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-xl ring-2 ring-blue-500/20 w-full md:w-auto"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                    <Code className="w-4 h-4 text-white" />
                    </div>
                </div>
                )}
                <div className="space-y-4 flex-1 w-full">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium">{githubData?.bio || "Full Stack Developer"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-zinc-300">{githubData?.location || "Location"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-zinc-300">{githubData?.email || "Email"}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="solved" radius={[4, 4, 0, 0]}>
                        {leetcodeProblemData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity" />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </CardContent>
            </Card>

            {/* Technology Stack Chart */}
            <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Technology Stack
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={languageChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        startAngle={90}
                        endAngle={-270}
                    >
                        {languageChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            className="transition-all duration-300 hover:opacity-80 hover:scale-105"
                            strokeWidth={1}
                            stroke="rgba(0,0,0,0.1)"
                        />
                        ))}
                    </Pie>
                    <Tooltip
                        content={<CustomPieTooltip setTooltipActive={setTooltipActive} />}
                        wrapperStyle={{ outline: "none" }}
                    />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                    className={`text-center transition-all duration-300 ${
                        tooltipActive ? "filter blur-sm" : ""
                    }`}
                    >
                    <div className="text-3xl font-bold text-white">{repoData.length}</div>
                    <div className="text-sm text-zinc-400">Total Projects</div>
                    </div>
                </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                {languageChartData.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-zinc-300">{lang.name}</span>
                    <span className="text-zinc-500 ml-auto">
                        {((lang.value / languageChartData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%
                    </span>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        </div>

        {/* Key Metrics Card */}
        <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                Key Metrics
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="space-y-2">
                <p className="text-sm text-zinc-400">Global Ranking</p>
                <p className="text-xl md:text-2xl font-bold text-white">#{leetcodeData?.ranking || 0}</p>
                </div>
                <div className="space-y-2">
                <p className="text-sm text-zinc-400">Success Rate</p>
                <p className="text-xl md:text-2xl font-bold text-white">{leetcodeData?.acceptanceRate}</p>
                </div>
                <div className="space-y-2">
                <p className="text-sm text-zinc-400">Contribution Points</p>
                <p className="text-xl md:text-2xl font-bold text-white">{leetcodeData?.contributionPoints || 0}</p>
                </div>
                <div className="space-y-2">
                <p className="text-sm text-zinc-400">Reputation</p>
                <p className="text-xl md:text-2xl font-bold text-white">{leetcodeData?.reputation || 0}</p>
                </div>
            </div>
            </CardContent>
        </Card>
        </div>
    );
};

export default Profile;
