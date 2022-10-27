import { supabase } from '$lib/supabase'
import { invalid, redirect } from '@sveltejs/kit'

export const actions = {
    default: async ({ request, cookies }) => {

        const data = await request.formData()
        const name = data.get('name').toUpperCase()

        const { data: res, error } = await supabase
            .from('users')
            .select('name, color, id')
            .eq('name', name)

        if (error || !res.length) return invalid(400, { name, nonexistant: true })

        cookies.set('user', JSON.stringify(res[0]))

        throw redirect(301, '/')

    }
}