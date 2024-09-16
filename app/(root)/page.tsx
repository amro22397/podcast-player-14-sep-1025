'use client'

import PodcastCard from '@/components/PodcastCard'
import { Button } from '@/components/ui/button'
import React from 'react'

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


const page = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
  return (
    <div className="mt-9 flex flex-col gap-9 h-full">
      <section className="flex flex-col gap-5 h-full">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid h-full">
          
        {trendingPodcasts?.map(({_id, podcastTitle, podcastDescription, imageUrl}) => {
          return (
            <PodcastCard 
            key={_id}  
            imgUrl={imageUrl}
            title={podcastTitle}
            description={podcastDescription}
            podcastId={_id}
            />
          )
        })}

        </div>
        
        <Button className='text-white-1
        bg-orange-1'></Button>
      </section>
    </div>
  )
}

export default page
