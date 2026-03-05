import { supabase } from './supabase'

export type PortalEventType = 'ad_view' | 'ad_click'

export async function trackEvent(params: {
  campaignId: string
  creativeId: string
  eventType: PortalEventType
  sessionHash?: string
  clientIp?: string
  clientMac?: string
}) {
  const { error } = await supabase.from('portal_events').insert({
    campaign_id: params.campaignId,
    creative_id: params.creativeId,
    event_type: params.eventType,
    session_hash: params.sessionHash || null,
    client_ip: params.clientIp || null,
    client_mac: params.clientMac || null,
  })

  if (error) console.error('Failed to track event:', error)
}
