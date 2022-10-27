import { supabase } from '$lib/supabase'
import { error, redirect } from '@sveltejs/kit'

export async function load({ cookies }) {
    try {

        const name = cookies.get('user') ? JSON.parse(cookies.get('user')).name : null

        if (!name) { return }

        const { data: user, error: userError } = await supabase
            .from('users')
            .select()
            .eq('name', name)
            .single()

        if (userError) throw error

        const { data: posts, error: postsError } = await supabase
            .from('posts')
            .select(`
                *,
                user (
                    name,
                    color
                )
            `)
            .order('created_at', { ascending: false })

        if (postsError) throw error

        return { posts }

    } catch (error) {
        return error(500, error)
    }
}