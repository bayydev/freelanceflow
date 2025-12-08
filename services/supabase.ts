import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afsauzylbyyiixgjeeel.supabase.co';
const supabaseKey = 'sb_publishable_yTWefYDyiI7mCl27C_mAdw_hxvgZxEs';

export const supabase = createClient(supabaseUrl, supabaseKey);