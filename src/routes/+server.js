import { supabase } from '$lib/supabase'
import { getImageURL } from '$lib/utils'

export async function POST({ request, cookies }) {

    try {
        const data = await request.json()
        const user = JSON.parse(cookies.get('user'))

        console.log(data.metadata)

        // return a flag if the file contains multiple extensions
        if (data.metadata.filename.split('.').length > 2) {
            return new Response(JSON.stringify({
                flag: '3d29643a-eecc-4265-8316-fd81ac19702e'
            }), { status: 422 })
        }

        // return a flag if file is not an image
        const allowedFileTypes = [ 'png', 'jpg', 'webp', 'jpeg' ]
        if (!allowedFileTypes.includes(data.metadata.extension)) {
            return new Response(JSON.stringify({
                flag: '0e12cf7d-4f5e-45ec-82f2-7b773abac9a8'
            }), { status: 422 })
        }

        const file = data.image.split(';base64,').pop()
        const fileBuffer = Buffer.from(file, 'base64')

        const { data: image, error: uploadError } = await supabase
            .storage
            .from('feed')
            .upload(`${data.metadata.name}-${(Math.random() + 1).toString(36).substring(5)}.${data.metadata.extension}`, fileBuffer, {
                upsert: true,
                contentType: data.metadata.type
            })

        if (uploadError) throw uploadError

        // create post
        const { data: post, error: postError } = await supabase
            .from('posts')
            .insert([
                {
                    user: user.id,
                    url: getImageURL(image.Key)
                }
            ])

        if (postError) throw postError

        // compose post
        const composedPost = {
            ...post[0],
            user
        }

        return new Response(
            JSON.stringify({ success: true, post: composedPost }),
            { status: 200 }
        )

    } catch (error) {
        console.error(error)

        return new Response(
            JSON.stringify({ success: false }),
            { status: 500 }
        )
    }

}