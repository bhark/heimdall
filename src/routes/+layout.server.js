import { browser } from '$app/environment'

export function load({ cookies }) {

    const user = cookies.get('user') ? JSON.parse(cookies.get('user')) : null

    return { user }
}