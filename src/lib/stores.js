import { writable } from 'svelte/store'

export const newlyFoundFlag = writable(null)
export const alienFoundFlag = writable(null)
export const toast = writable(null)
export const shelfActive = writable(false)

export function broadcastCapture(flag) {
    alienFoundFlag.set(flag)
    setTimeout(() => { alienFoundFlag.set(null) }, 5000)
}

export function newToast(msg) {
    toast.set(msg)
    setTimeout(() => { toast.set(null) }, 5000)
}