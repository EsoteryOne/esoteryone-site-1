import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vmbwcikxoaannzcylbdn.supabase.co'
const supabasePublishableKey = 'sb_publishable_KiD39HesPjImOWEv6X-6cQ_EnMtsLgy'

export const supabase = createClient(supabaseUrl, supabasePublishableKey)