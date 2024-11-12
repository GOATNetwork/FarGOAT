'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Edit2, Copy, Trophy, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { motion } from 'framer-motion' // Import framer-motion for animations

// Mock data for demonstration
const user = {
  id: 1,
  username: 'crypto_enthusiast',
  walletAddress: '0x1234...5678',
  nounImage: 'https://picsum.photos/200',
  totalPoints: 1500,
  level: 5,
  nfts: [
    { id: 1, name: 'Early Adopter', image: 'https://picsum.photos/64?random=1' },
    { id: 2, name: 'DeFi Master', image: 'https://picsum.photos/64?random=2' },
    { id: 3, name: 'Governance Participant', image: 'https://picsum.photos/64?random=3' },
  ],
  claimedBounties: [
    { id: 1, title: 'Boost DAU for DeFi Swap', points: 500, date: '2023-05-15' },
    { id: 2, title: 'Hodl ETH for 30 Days', points: 750, date: '2023-06-20' },
  ],
  availableRewards: [
    { id: 1, title: 'Limited Edition NFT', points: 1000, claimed: false },
    { id: 2, title: 'VIP Access to Upcoming IDO', points: 2000, claimed: false },
  ],
  collectedRewards: [
    { id: 3, title: 'Exclusive Discord Role', points: 500, date: '2023-04-10' },
  ],
}

export default function ProfilePage() {
  const [username, setUsername] = useState(user.username)
  const [isEditingUsername, setIsEditingUsername] = useState(false)

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const saveUsername = () => {
    // Here you would typically send an API request to update the username
    console.log('Saving username:', username)
    setIsEditingUsername(false)
  }

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(user.walletAddress)
    toast({
      title: "Wallet Address Copied",
      description: "The wallet address has been copied to your clipboard.",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src={user.nounImage}
                alt="Noun Avatar"
                width={200}
                height={200}
                className="rounded-full mb-4 transition-transform transform hover:scale-105"
              />
              <div className="flex items-center gap-2 mb-4">
                {isEditingUsername ? (
                  <Input
                    value={username}
                    onChange={handleUsernameChange}
                    className="max-w-xs transition-all"
                  />
                ) : (
                  <motion.h2
                    className="text-2xl font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {username}
                  </motion.h2>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => isEditingUsername ? saveUsername() : setIsEditingUsername(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-sm font-medium">Wallet: {user.walletAddress}</p>
                <Button variant="ghost" size="icon" onClick={copyWalletAddress}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <p className="text-lg font-medium">Level {user.level}</p>
              </div>
              <p className="text-lg font-medium mb-4">Total Points: {user.totalPoints}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <TooltipProvider>
                  {user.nfts.map((nft) => (
                    <Tooltip key={nft.id}>
                      <TooltipTrigger>
                        <Image
                          src={nft.image}
                          alt={nft.name}
                          width={64}
                          height={64}
                          className="rounded-md transition-transform transform hover:scale-110"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{nft.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Claimed Bounties Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Claimed Bounties</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {user.claimedBounties.map((bounty) => (
                  <li key={bounty.id} className="flex justify-between items-center p-2 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                    <span>{bounty.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{bounty.points} points</span>
                      <span className="text-sm text-muted-foreground">{bounty.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Rewards Tabs */}
      <Tabs defaultValue="available" className="mt-6">
        <TabsList>
          <TabsTrigger value="available">Available Rewards</TabsTrigger>
          <TabsTrigger value="collected">Collected Rewards</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {user.availableRewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{reward.title}</CardTitle>
                    <CardDescription>{reward.points} points required</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Claim Reward</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Claim Reward</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to claim this reward? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Confirm Claim</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="collected">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {user.collectedRewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{reward.title}</CardTitle>
                    <CardDescription>Claimed on {reward.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{reward.points} points</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
