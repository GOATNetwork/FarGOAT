'use client';

import { useState } from 'react';
import { Search, Grid, List, ChevronDown, TrendingUp, Users, Target, ExternalLink, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the chart
const tvlData = [
    { name: 'Jan', tvl: 4000 },
    { name: 'Feb', tvl: 3000 },
    { name: 'Mar', tvl: 5000 },
    { name: 'Apr', tvl: 2780 },
    { name: 'May', tvl: 1890 },
    { name: 'Jun', tvl: 2390 },
    { name: 'Jul', tvl: 3490 },
];

const projects = [
    {
        id: 1,
        name: 'UniDex',
        description: 'Decentralized exchange aggregator with advanced trading features.',
        logo: 'https://picsum.photos/48/48',
        verified: true,
        tags: ['DeFi', 'DEX', 'Aggregator'],
        tvl: 1000000,
        users24h: 5000,
        totalQuests: 10,
        activeQuests: true,
        category: 'DeFi',
        bannerImage: 'https://picsum.photos/1200/400',
        founder: 'UniDex Team',
        founderAvatar: 'https://picsum.photos/40/40',
        website: 'https://unidex.exchange',
        github: 'https://github.com/unidex',
        twitter: 'https://twitter.com/unidexexchange',
        contractAddress: '0x1234...5678',
        dailyActiveUsers: 15000,
        totalPointsAllocated: 100000,
        questCompletionRate: 75,
    },
    {
        id: 2,
        name: 'Project 2',
        description: 'Description of Project 2',
        logo: 'https://picsum.photos/48/48',
        verified: false,
        tags: ['GameFi', 'NFT'],
        tvl: 1000000,
        users24h: 5000,
        totalQuests: 10,
        activeQuests: true,
        category: 'GameFi',
        bannerImage: 'https://picsum.photos/1200/400',
        founder: 'Project 2 Team',
        founderAvatar: 'https://picsum.photos/40/40',
        website: 'https://project2.com',
        github: 'https://github.com/project2',
        twitter: 'https://twitter.com/project2',
        contractAddress: '0x1234...5678',
        dailyActiveUsers: 15000,
        totalPointsAllocated: 100000,
        questCompletionRate: 75,
    },
    {
        id: 3,
        name: 'Project 3',
        description: 'Description of Project 3',
        logo: 'https://picsum.photos/48/48',
        verified: false,
        tags: ['GameFi', 'NFT'],
        tvl: 1000000,
        users24h: 5000,
        totalQuests: 10,
        activeQuests: true,
        category: 'NFT',
        bannerImage: 'https://picsum.photos/1200/400',
        founder: 'Project 3 Team',
        founderAvatar: 'https://picsum.photos/40/40',
        website: 'https://project3.com',
        github: 'https://github.com/project3',
        twitter: 'https://twitter.com/project3',
        contractAddress: '0x1234...5678',
        dailyActiveUsers: 15000,
        totalPointsAllocated: 100000,
        questCompletionRate: 75,
    },
    // Add more mock projects here...
];

export default function EcosystemPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn">GOAT Network Ecosystem</h1>
                <div className="flex items-center space-x-4 mb-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 hover:text-primary" />
                        <Input type="search" placeholder="Search projects..." className="pl-10 transition-all duration-300 focus:ring-primary" />
                    </div>
                    <Select defaultValue="latest">
                        <SelectTrigger className="w-[180px] transition-all duration-300 focus:ring-primary">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="tvl">TVL</SelectItem>
                            <SelectItem value="activity">Activity</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="transition-all duration-300 hover:bg-gray-200">
                        {viewMode === 'grid' ? <List /> : <Grid />}
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['DeFi', 'GameFi', 'NFT', 'Lending', 'DEX'].map((tag) => (
                        <Badge key={tag} variant="secondary" className="transition-all duration-300 hover:bg-gray-200">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </header>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} onSelect={() => setSelectedProject(project)} />
                ))}
            </div>

            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    );
}

function ProjectCard({ project, onSelect }: { project: (typeof projects)[0]; onSelect: () => void }) {
    return (
        <Card
            className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:scale-105"
            style={{
                borderImage: `linear-gradient(to right, ${project.category === 'DeFi' ? '#6366f1, #8b5cf6' : '#10b981, #3b82f6'}) 1`,
                borderImageSlice: 1,
                borderWidth: '2px',
                borderStyle: 'solid',
            }}
            onClick={onSelect}
        >
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Avatar className="h-16 w-16 transition-all duration-300 transform hover:scale-110">
                    <AvatarImage src={project.logo} alt={project.name} />
                    <AvatarFallback>{project.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                    <CardTitle className="flex items-center">
                        {project.name}
                        {project.verified && (
                            <Badge variant="secondary" className="ml-2 transition-all duration-300 animate__animated animate__fadeIn">
                                Verified
                            </Badge>
                        )}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="transition-all duration-300 hover:bg-gray-200">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <TrendingUp className="mr-1 h-4 w-4 transition-all duration-300 hover:text-primary" />${project.tvl.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 transition-all duration-300 hover:text-primary" />
                        {project.users24h.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                        <Target className="mr-1 h-4 w-4 transition-all duration-300 hover:text-primary" />
                        {project.totalQuests}
                    </div>
                </div>
                {project.activeQuests && (
                    <Badge variant="secondary" className="mt-4 transition-all duration-300 animate__animated animate__fadeIn">
                        Active Quests
                    </Badge>
                )}
            </CardContent>
        </Card>
    );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
    return (
        <Dialog open={true} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden transition-all duration-300">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="sr-only">{project.name}</DialogTitle>
                        </DialogHeader>
                        
                        <div className="relative h-[200px] sm:h-[300px] lg:h-[400px] -mt-6 -mx-6 mb-6">
                            <img src={project.bannerImage} alt={project.name} className="w-full h-full object-cover transition-all duration-500 ease-in-out" />
                            <Avatar className="absolute -bottom-8 left-6 h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-4 border-background transform transition-transform duration-500 ease-in-out">
                                <AvatarImage src={project.logo} alt={project.name} />
                                <AvatarFallback>{project.name[0]}</AvatarFallback>
                            </Avatar>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold flex items-center">
                                        {project.name}
                                        {project.verified && (
                                            <Badge variant="secondary" className="ml-2">
                                                Verified
                                            </Badge>
                                        )}
                                    </h2>
                                    <p className="text-muted-foreground flex items-center mt-2">
                                        <Avatar className="h-6 w-6 mr-2">
                                            <AvatarImage src={project.founderAvatar} alt={project.founder} />
                                            <AvatarFallback>{project.founder[0]}</AvatarFallback>
                                        </Avatar>
                                        {project.founder}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Description</h3>
                                    <p className="text-muted-foreground">{project.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
