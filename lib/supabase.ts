import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vmbwcikxoaanzncyblbdn.supabase.co'
const supabasePublishableKey = 'sb_publishable_KiD39HesPjIm0WEv6X-6cQ_EnMtsLgy'

export const supabase = createClient(supabaseUrl, supabasePublishableKey)