import { supabase } from './supabase'

export async function submitSurvey(params: {
  reasonForConnecting: string
  wifiPreference: string
  clientIp?: string
  clientMac?: string
}) {
  const { error } = await supabase.from('portal_surveys').insert({
    reason_for_connecting: params.reasonForConnecting,
    wifi_preference: params.wifiPreference,
    client_ip: params.clientIp || '',
    client_mac: params.clientMac || '',
  })

  if (error) console.error('Failed to submit survey:', error)
}
