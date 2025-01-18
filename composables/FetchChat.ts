import axios from 'axios'

export async function fetchChat() {
  const urlParams = new URLSearchParams(window.location.hash.replace('#', ''))
  const accessToken = urlParams.get('access_token')
  const clientId = '3ctinlvmw032d67rfhwq9qoz1elbn4'

  if (!accessToken) {
    const redirectUri = 'http://localhost:3000'
    const scopes = 'chat:read'

    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`
    window.location.href = authUrl
    return
  }

  try {
    const { data, error } = await useFetch('/api/twitch', {
      params: {
        channel: 'joypeatv',
        clientId: '3ctinlvmw032d67rfhwq9qoz1elbn4',
        accessToken: accessToken,
      },
    })

    if (error) {
      console.error('Error fetching Twitch chat:', error)
      return
    }

    console.log('Twitch chat:', data)

    return data
  }
  catch (error) {
    console.error('Error fetching Twitch chat:', error)
  }
}
