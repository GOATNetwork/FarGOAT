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
    const [searchQuery, setSearchQuery] = useState('');

    // Filter projects based on the search query
    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">GOAT Network Ecosystem</h1>
                <div className="flex items-center space-x-4 mb-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search projects..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                        />
                    </div>
                    <Select defaultValue="latest">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="tvl">TVL</SelectItem>
                            <SelectItem value="activity">Activity</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                        {viewMode === 'grid' ? <List /> : <Grid />}
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['DeFi', 'GameFi', 'NFT', 'Lending', 'DEX'].map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </header>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProjects.map((project) => (
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
            className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
            style={{
                borderImage: `linear-gradient(to right, ${project.category === 'DeFi' ? '#6366f1, #8b5cf6' : '#10b981, #3b82f6'}) 1`,
                borderImageSlice: 1,
                borderWidth: '2px',
                borderStyle: 'solid',
            }}
            onClick={onSelect}
        >
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={project.logo} alt={project.name} />
                    <AvatarFallback>{project.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                    <CardTitle className="flex items-center">
                        {project.name}
                        {project.verified && (
                            <Badge variant="secondary" className="ml-2">
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
                        <Badge key={tag} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4 text-gray-500" />
                        <span>{project.tvl}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-gray-500" />
                        <span>{project.users24h} Users</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{project.name}</DialogTitle>
                </DialogHeader>
                <div className="relative mb-4">
                    <img src={project.bannerImage} alt="banner" className="w-full h-56 object-cover rounded-lg" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
                    <div className="absolute top-4 left-4 text-white">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={project.founderAvatar} alt={project.founder} />
                            <AvatarFallback>{project.founder[0]}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-semibold">{project.founder}</h2>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <a href={project.website} target="_blank" className="text-blue-500">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Website
                    </a>
                    <a href={project.github} target="_blank" className="text-gray-800">
                        <Github className="mr-2 h-5 w-5" />
                        GitHub
                    </a>
                    <a href={project.twitter} target="_blank" className="text-blue-400">
                        <Twitter className="mr-2 h-5 w-5" />
                        Twitter
                    </a>
                </div>
                <Accordion>
                    <AccordionItem value="details">
                        <AccordionTrigger>Details</AccordionTrigger>
                        <AccordionContent>
                            <p>{project.description}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Progress value={project.questCompletionRate} />
            </DialogContent>
        </Dialog>
    );
}