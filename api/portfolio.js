import { portfolio } from '../lib/portfolio.js'

export default function handler(_request, response) {
  response.status(200).json(portfolio)
}
