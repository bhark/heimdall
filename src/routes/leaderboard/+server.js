import { json } from '@sveltejs/kit'
import { supabase } from '$lib/supabase'

// when a new flag has been found
export async function POST({ request, cookies }) {
    const { id } = await request.json()
    const name = JSON.parse(cookies.get('user')).name

    let res = {}

    console.log('Got a new flag: ', id)

    // validate the flag
    try {
        const { data: flag, error } = await supabase
            .from('flags')
            .select()
            .eq('id', id)
            .single()

        if (error) throw error
        if (!flag) throw 'Det flag findes ikke - men udmærket forsøg!'

        res['message'] = flag.description
        
    } catch (error) {
        return json({ success: false, error })
    }

    try {
        // retreive users records
        const { data: user } = await supabase
            .from('users')
            .select()
            .eq('name', name)
            .single()

        // make sure user hasn't registered this flag already
        console.log(user)
        if (user.flags?.includes(id)) throw 'Du har allerede registreret dette flag'

        // update users records
        const { data: update, error } = await supabase
            .from('users')
            .update({ 
                flags: user.flags ? [id, ...user.flags] : [id],
                score: user.score ? user.score + 1 : 1 })
            .match({ name })

        if (error) throw error
    } catch (error) {
        return json({ success: false, error })
    }

    console.log(res)

    return json({ success: true, ...res })
}