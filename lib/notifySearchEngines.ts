import axios from 'axios'

export async function notifySearchEngines(url: string) {
  try {
    await axios.get(`http://www.google.com/ping?sitemap=${encodeURIComponent(url)}`)
    console.log('Successfully pinged Google')
  } catch (error) {
    console.error('Error pinging Google:', error)
  }
}