export function getImageURL(key) {
    return `https://qogznfonmogkzjqbmdpv.supabase.co/storage/v1/object/public/${key}`
}

export const sleep = ms => new Promise(r => setTimeout(r, ms));