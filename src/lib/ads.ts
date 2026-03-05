import { supabase } from './supabase'

export interface PortalAd {
  assetUrl: string
  creativeId: string
  campaignId: string
  campaignName: string
}

/**
 * Fetches a random active ad creative from Supabase.
 * Replicates the NestJS getRandomAd() logic:
 * 1. Find campaigns where start_date <= today AND end_date >= today with active/approved status
 * 2. Get their creatives
 * 3. Pick one at random
 */
export async function getRandomAd(): Promise<PortalAd | null> {
  const today = new Date().toISOString().split('T')[0]

  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select(`
      id,
      name,
      creatives (
        id,
        asset_url,
        format
      )
    `)
    .in('status', ['active', 'approved'])
    .lte('start_date', today)
    .gte('end_date', today)

  if (error || !campaigns || campaigns.length === 0) return null

  // Flatten all creatives with their campaign context
  const allCreatives: PortalAd[] = []
  for (const campaign of campaigns) {
    const creatives = campaign.creatives as Array<{ id: string; asset_url: string; format: string }> | null
    if (creatives) {
      for (const creative of creatives) {
        if (creative.asset_url) {
          allCreatives.push({
            assetUrl: creative.asset_url,
            creativeId: creative.id,
            campaignId: campaign.id,
            campaignName: campaign.name,
          })
        }
      }
    }
  }

  if (allCreatives.length === 0) return null

  return allCreatives[Math.floor(Math.random() * allCreatives.length)]
}
