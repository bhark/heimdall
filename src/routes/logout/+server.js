import { redirect } from '@sveltejs/kit'

export async function POST({ cookies }) {
    cookies.delete('user')
    throw redirect(301, '/')
}