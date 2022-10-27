import { supabase } from '$lib/supabase'
import { invalid, redirect, error } from '@sveltejs/kit'
import { getColor } from '$lib/colors'

export const actions = {
    default: async ({ request, cookies }) => {

        try {
            const data = await request.formData()
            const name = data.get('name').toUpperCase()

            const { data: res, error } = await supabase
                .from('users')
                .insert([
                    { name, color: getColor() }
                ])

            if (error) return invalid(400, { name, taken: true })

            cookies.set('user', JSON.stringify({
                name: res[0].name,
                color: res[0].color,
                id: res[0].id
            }))

            return { user: res[0] }
        } catch (error) {
            console.error(error)

            return error(500, JSON.stringify(error))
        }

    }
}