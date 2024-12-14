'use client';

import { useState } from 'react';
import { MessageSquare, Users, Target, Award, Send, UserPlus, Sparkles, Share2, ThumbsUp, MessageCircle, UserCheck, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  level: number;
  reputation: number;
  achievements: Achievement[];
  expertise: string[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface DiscussionPost {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  liked: boolean;
  tags: string[];
}

interface CollaborativeQuest {
  id: string;
  title: string;
  description: string;
  rewards: number;
  participants: User[];
  maxParticipants: number;
  progress: number;
  deadline: string;
  difficulty: 'easy' | 'medium' | 'hard';
  requirements: string[];
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://picsum.photos/48/48?random=1',
    role: 'Mentor',
    level: 15,
    reputation: 2500,
    achievements: [
      { id: '1', name: 'Quest Master', description: 'Completed 100 quests', icon: '🏆', rarity: 'epic' },
      { id: '2', name: 'Helpful Hand', description: 'Helped 50 newcomers', icon: '🤝', rarity: 'rare' }
    ],
    expertise: ['DeFi', 'Smart Contracts', 'Trading']
  },
  // Add more mock users...
];

export function ProjectSocialFeatures({ project }: { project: any }) {
  const [activeDiscussion, setActiveDiscussion] = useState<DiscussionPost | null>(null);
  const [newPostContent, setNewPostContent] = useState('');

  return (
    <Tabs defaultValue="discussion" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="discussion" className="flex-1">
          <MessageSquare className="w-4 h-4 mr-2" />
          Discussion
        </TabsTrigger>
        <TabsTrigger value="mentorship" className="flex-1">
          <Users className="w-4 h-4 mr-2" />
          Mentorship
        </TabsTrigger>
        <TabsTrigger value="collaborative" className="flex-1">
          <Target className="w-4 h-4 mr-2" />
          Collaborative Quests
        </TabsTrigger>
        <TabsTrigger value="achievements" className="flex-1">
          <Award className="w-4 h-4 mr-2" />
          Achievements
        </TabsTrigger>
      </TabsList>

      <TabsContent value="discussion" className="mt-6">
        <DiscussionBoard />
      </TabsContent>

      <TabsContent value="mentorship" className="mt-6">
        <MentorshipSystem />
      </TabsContent>

      <TabsContent value="collaborative" className="mt-6">
        <CollaborativeQuests />
      </TabsContent>

      <TabsContent value="achievements" className="mt-6">
        <CommunityAchievements />
      </TabsContent>
    </Tabs>
  );
}

function DiscussionBoard() {
  const [discussionPosts, setDiscussionPosts] = useState<DiscussionPost[]>([
    {
      id: '1',
      author: mockUsers[0],
      content: 'What are your thoughts on the latest protocol upgrade?',
      timestamp: '2h ago',
      likes: 23,
      replies: 5,
      liked: false,
      tags: ['Protocol', 'Update']
    },
    // Add more mock posts...
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Start a Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Share your thoughts or ask a question..." className="mb-4" />
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button variant="outline" size="sm">Add Tags</Button>
              <Button variant="outline" size="sm">Attach</Button>
            </div>
            <Button>Post Discussion</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {discussionPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{post.author.name}</CardTitle>
                    <CardDescription>{post.timestamp}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="space-x-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.replies}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm">Reply</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MentorshipSystem() {
  const [mentors, setMentors] = useState(mockUsers.filter(user => user.role === 'Mentor'));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Become a Mentor</CardTitle>
            <CardDescription>Share your knowledge and earn rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Level 10 or higher</li>
                <li>Complete 50+ quests</li>
                <li>Maintain 4.5+ rating</li>
              </ul>
            </div>
            <Button className="w-full">Apply as Mentor</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Find a Mentor</CardTitle>
            <CardDescription>Get guidance from experienced users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Input placeholder="Search by expertise or name..." />
              <div className="flex flex-wrap gap-2">
                {['DeFi', 'NFT', 'Trading', 'Development'].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((mentor) => (
          <Card key={mentor.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={mentor.avatar} />
                  <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{mentor.name}</CardTitle>
                  <CardDescription>Level {mentor.level} • {mentor.reputation} Rep</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Achievements</h4>
                  <div className="flex space-x-2">
                    {mentor.achievements.map((achievement) => (
                      <div key={achievement.id} className="text-2xl" title={achievement.name}>
                        {achievement.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Request Mentorship
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CollaborativeQuests() {
  const [quests] = useState<CollaborativeQuest[]>([
    {
      id: '1',
      title: 'Community Social Post Competition',
      description: 'Form a team and compete in a Social Post  competition',
      rewards: 1000,
      participants: mockUsers.slice(0, 3),
      maxParticipants: 5,
      progress: 60,
      deadline: '2 days left',
      difficulty: 'medium',
      requirements: ['Level 5+', 'Complete Basic Social Quest']
    },
    // Add more collaborative quests...
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {quests.map((quest) => (
          <Card key={quest.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{quest.title}</CardTitle>
                <Badge variant="secondary">{quest.difficulty}</Badge>
              </div>
              <CardDescription>{quest.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{quest.progress}%</span>
                </div>
                <Progress value={quest.progress} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {quest.participants.map((participant) => (
                    <Avatar key={participant.id} className="border-2 border-background">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  {quest.maxParticipants - quest.participants.length > 0 && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                      +{quest.maxParticipants - quest.participants.length}
                    </div>
                  )}
                </div>
                <Badge variant="outline">{quest.deadline}</Badge>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Requirements</h4>
                <ul className="text-sm space-y-1">
                  {quest.requirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <UserCheck className="h-4 w-4 mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>{quest.rewards} Points</span>
              </div>
              <Button>
                <Rocket className="h-4 w-4 mr-2" />
                Join Quest
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CommunityAchievements() {
    const achievements: Achievement[] = [
      {
        id: '1',
        name: 'Community Champion',
        description: 'Help 100 community members',
        icon: '🏆',
        rarity: 'legendary'
      },
      {
        id: '2',
        name: 'Quest Master',
        description: 'Complete 50 collaborative quests',
        icon: '⚔️',
        rarity: 'epic'
      },
      {
        id: '3',
        name: 'Mentor Guide',
        description: 'Successfully mentor 10 newcomers',
        icon: '🌟',
        rarity: 'rare'
      },
      {
        id: '4',
        name: 'Discussion Leader',
        description: 'Create 20 engaging discussion topics',
        icon: '💬',
        rarity: 'rare'
      },
      {
        id: '5',
        name: 'Team Player',
        description: 'Complete 25 collaborative quests',
        icon: '🤝',
        rarity: 'epic'
      }
    ];
  
    const getRarityColor = (rarity: Achievement['rarity']) => {
      const colors = {
        common: 'bg-slate-200 text-slate-700',
        rare: 'bg-blue-200 text-blue-700',
        epic: 'bg-purple-200 text-purple-700',
        legendary: 'bg-yellow-200 text-yellow-700'
      };
      return colors[rarity];
    };
  
    return (
      <div className="space-y-6">
        {/* Achievement Overview */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Total Achievements</CardTitle>
              <div className="text-4xl font-bold mt-2">24/50</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Rarity Score</CardTitle>
              <div className="text-4xl font-bold mt-2 text-yellow-500">785</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Global Rank</CardTitle>
              <div className="text-4xl font-bold mt-2 text-purple-500">#42</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Recent Unlocks</CardTitle>
              <div className="flex justify-center gap-2 mt-2">
                {['🏆', '⭐', '🌟'].map((icon, i) => (
                  <span key={i} className="text-2xl">{icon}</span>
                ))}
              </div>
            </CardHeader>
          </Card>
        </div>
  
        {/* Achievement Categories */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Achievements</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="quests">Quests</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          </TabsList>
  
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <CardTitle>{achievement.name}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={45} className="mb-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progress: 45/100</span>
                      <span>+500 Points</span>
                    </div>
                  </CardContent>
                  <CardFooter className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
  
          <TabsContent value="community" className="mt-6">
            {/* Community achievements content */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {achievements.filter(a => a.name.includes('Community')).map((achievement) => (
                <Card key={achievement.id} className="group hover:shadow-lg transition-shadow">
                  {/* Same card content structure as "all" tab */}
                </Card>
              ))}
            </div>
          </TabsContent>
  
          <TabsContent value="quests" className="mt-6">
            {/* Quests achievements content */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {achievements.filter(a => a.name.includes('Quest')).map((achievement) => (
                <Card key={achievement.id} className="group hover:shadow-lg transition-shadow">
                  {/* Same card content structure as "all" tab */}
                </Card>
              ))}
            </div>
          </TabsContent>
  
          <TabsContent value="mentorship" className="mt-6">
            {/* Mentorship achievements content */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {achievements.filter(a => a.name.includes('Mentor')).map((achievement) => (
                <Card key={achievement.id} className="group hover:shadow-lg transition-shadow">
                  {/* Same card content structure as "all" tab */}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
  
        {/* Achievement Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Top Achievement Holders</CardTitle>
            <CardDescription>Users with the most prestigious achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {mockUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="font-bold w-8">{index + 1}</div>
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Level {user.level} • {user.reputation} Rep
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                      {user.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="text-2xl"
                          title={achievement.name}
                        >
                          {achievement.icon}
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  }