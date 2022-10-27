import { supabase } from '$lib/supabase'

export const ssr = false

export async function load() {

    const { data, error } = await supabase
        .from('users')
        .select('name, score, color, flags')
        .order('score', { ascending: false })

    data.forEach((e, i) => {
        if (!e.flags) data[i]['flags'] = [] 
    })

    return { data }

}