'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Edit2, Copy, Trophy, Award, Star, Clock, ChevronRight, Gift, Archive } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const user = {
  id: 1,
  username: 'crypto_enthusiast',
  walletAddress: '0x1234...5678',
  nounImage: 'https://picsum.photos/200',
  totalPoints: 1500,
  level: 5,
  nextLevelPoints: 2000,
  nfts: [
    { id: 1, name: 'Early Adopter', image: 'https://picsum.photos/64?random=1', rarity: 'Rare' },
    { id: 2, name: 'DeFi Master', image: 'https://picsum.photos/64?random=2', rarity: 'Epic' },
    { id: 3, name: 'Governance Participant', image: 'https://picsum.photos/64?random=3', rarity: 'Common' },
  ],
  claimedBounties: [
    { id: 1, title: 'Boost DAU for DeFi Swap', points: 500, date: '2023-05-15', status: 'Completed' },
    { id: 2, title: 'Hodl ETH for 30 Days', points: 750, date: '2023-06-20', status: 'Completed' },
  ],
  availableRewards: [
    { id: 1, title: 'Limited Edition NFT', points: 1000, claimed: false, rarity: 'Legendary' },
    { id: 2, title: 'VIP Access to Upcoming IDO', points: 2000, claimed: false, rarity: 'Epic' },
  ],
  collectedRewards: [
    { id: 3, title: 'Exclusive Discord Role', points: 500, date: '2023-04-10', rarity: 'Rare' },
  ],
}

const getRarityColor = (rarity: string) => {
  const colors = {
    Common: 'bg-gray-200 text-gray-700',
    Rare: 'bg-blue-200 text-blue-700',
    Epic: 'bg-purple-200 text-purple-700',
    Legendary: 'bg-yellow-200 text-yellow-700',
  }
  return colors[rarity as keyof typeof colors] || colors.Common
}

export default function ProfilePage() {
  const [username, setUsername] = useState(user.username)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [activeTab, setActiveTab] = useState('available')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const saveUsername = () => {
    console.log('Saving username:', username)
    toast({
      title: "Username Updated",
      description: "Your new username has been saved successfully.",
    })
    setIsEditingUsername(false)
  }

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(user.walletAddress)
    toast({
      title: "Wallet Address Copied",
      description: "The wallet address has been copied to your clipboard.",
    })
  }

  const getLevelProgress = () => {
    return (user.totalPoints / user.nextLevelPoints) * 100
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Gift className="h-4 w-4" />
          Daily Rewards
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Profile Information
              <Badge variant="outline" className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                Level {user.level}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative group">
              <Image
                src={user.nounImage}
                alt="Noun Avatar"
                width={200}
                height={200}
                className="rounded-full mx-auto transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm">Change Avatar</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                {isEditingUsername ? (
                  <div className="flex gap-2">
                    <Input
                      value={username}
                      onChange={handleUsernameChange}
                      className="max-w-xs"
                      autoFocus
                    />
                    <Button onClick={saveUsername} size="sm">Save</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold">{username}</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingUsername(true)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-sm">
                <code className="bg-muted px-2 py-1 rounded">{user.walletAddress}</code>
                <Button variant="ghost" size="icon" onClick={copyWalletAddress}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {user.level + 1}</span>
                  <span>{user.totalPoints} / {user.nextLevelPoints}</span>
                </div>
                <Progress value={getLevelProgress()} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <TooltipProvider>
                  {user.nfts.map((nft) => (
                    <Tooltip key={nft.id}>
                      <TooltipTrigger asChild>
                        <div className="relative group cursor-pointer">
                          <Image
                            src={nft.image}
                            alt={nft.name}
                            width={64}
                            height={64}
                            className="rounded-lg w-full h-auto transition-transform group-hover:scale-105"
                          />
                          <Badge 
                            className={`absolute -top-2 -right-2 ${getRarityColor(nft.rarity)}`}
                          >
                            {nft.rarity}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold">{nft.name}</p>
                        <p className="text-sm text-muted-foreground">{nft.rarity}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {user.claimedBounties.map((bounty) => (
                <li key={bounty.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{bounty.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {bounty.date} • {bounty.points} points
                    </p>
                  </div>
                  <Badge variant="outline">{bounty.status}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Rewards</CardTitle>
                <TabsList>
                  <TabsTrigger value="available" className="flex items-center gap-1">
                    <Gift className="h-4 w-4" />
                    Available
                  </TabsTrigger>
                  <TabsTrigger value="collected" className="flex items-center gap-1">
                    <Archive className="h-4 w-4" />
                    Collected
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="available" className="mt-0">
                <div className="space-y-4">
                  {user.availableRewards.map((reward) => (
                    <div key={reward.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Gift className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{reward.title}</p>
                          <Badge className={getRarityColor(reward.rarity)}>{reward.rarity}</Badge>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex items-center gap-2">
                            {reward.points} points
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Claim {reward.title}</DialogTitle>
                            <DialogDescription>
                              This will deduct {reward.points} points from your balance. Are you sure you want to proceed?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Confirm Claim</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="collected" className="mt-0">
                <div className="space-y-4">
                  {user.collectedRewards.map((reward) => (
                    <div key={reward.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Archive className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{reward.title}</p>
                          <p className="text-sm text-muted-foreground">Claimed on {reward.date}</p>
                        </div>
                      </div>
                      <Badge className={getRarityColor(reward.rarity)}>{reward.rarity}</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}