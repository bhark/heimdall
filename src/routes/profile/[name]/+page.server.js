import { supabase } from '$lib/supabase'

export async function load({ params, cookies }) {
    
    const user = JSON.parse(cookies.get('user'))

    const { data: usersFlags } = await supabase
        .from('users')
        .select(`
            flags
        `)
        .eq('name', user.name)
        .single()

    if (params.name != user.name) {
        return {
            flag: 'd069ae8e-46ce-4ae4-8f8b-1de3a6fa30ef',
            flagCount: usersFlags.flags?.length || 0
        }
    } else {
        return {
            hint: 'Der dufter en smule af flag herinde...',
            flagCount: usersFlags.flags?.length || 0
        }
    }

}