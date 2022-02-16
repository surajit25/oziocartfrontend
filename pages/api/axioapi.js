import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 40 * 60 * 1000
})

// Create `axios` instance passing the newly created `cache.adapter`
const Api = axios.create({
  adapter: cache.adapter
})

export default Api