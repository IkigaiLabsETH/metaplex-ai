/// <reference types="next" />

import { Message } from '@/types/messages/messages-types'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { api } from '@/lib/api'
// import { encode } from 'gpt-3-encoder'
import { supabase } from '@/utils/supabaseClient'
// import { searchCuratedPlaces } from '@/utils/db/searchCuratedPlaces'

// Initialize OpenAI via OpenRouter
const baseURL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('Missing OpenRouter API key in environment variables.')
}

const openai = createOpenAI({
  baseURL,
  apiKey
})

type ExtendedMessage =
  | (Message & { id?: string; createdAt?: Date })
  | { role: 'system'; content: string }

const messages: ExtendedMessage[] = [
  {
    role: 'system',
    content: `
    You are an insightful AI travel assistant dedicated to providing personalized travel advice tailored to each user's unique preferences and past interactions.

    **Guidelines:**

    - Offer curated, detailed recommendations with personalized tips that align with the user's interests, focusing on hidden gems and authentic experiences.
    - Build on previous conversations to enhance the quality of future recommendations, ensuring tailored and relevant suggestions.

    **Communication Style:**

    - Keep it casual and conversational, like chatting with a friend.
    - Avoid bullet points and formal structures.
    - Use natural language, contractions, and colloquial expressions.
    - Focus on fluid, engaging storytelling in your recommendations.
    - Keep responses concise and informal.
    `
  }
]

export async function askQuestion(question: string, userId: string) {
  const previousMemories = await getMemories(userId)

  let prompt = question
  if (previousMemories.length > 0) {
    prompt = `User input: ${question}\nPrevious preferences: ${previousMemories.join(
      ', '
    )}`
  }

  messages.push({
    role: 'user',
    content: prompt,
    id: Date.now().toString(),
    createdAt: new Date()
  })

  // Create an instance of PersonalTravelAssistant to use its methods
  const assistant = new PersonalTravelAssistant(userId)
  const recommendations = await assistant['searchCuratedPlaces'](
    question,
    previousMemories
  )

  if (recommendations.length > 0) {
    const recommendationsText = recommendations
      .map((place: Place) => {
        const imagesText = place.images
          .slice(0, 4)
          .map((url: string) => `![${place.name}](${url})`)
          .join('\n')
        return `**${place.name}** in ${place.location} (${
          place.type
        })\nFeatures: ${place.features.join(', ')}\n${imagesText}`
      })
      .join('\n\n')

    prompt += `\nBased on your preferences, here are some recommendations:\n${recommendationsText}`
  }

  const response = await generateText({
    model: openai('o1-mini'),
    messages: messages
  })

  const answer = response.text
  messages.push({
    role: 'assistant',
    content: answer,
    id: Date.now().toString(),
    createdAt: new Date()
  })

  try {
    await storeMemory(
      [
        {
          role: 'user',
          content: question,
          id: Date.now().toString(),
          createdAt: new Date()
        },
        {
          role: 'assistant',
          content: answer,
          id: (Date.now() + 1).toString(),
          createdAt: new Date()
        }
      ],
      userId
    )
  } catch (memoryError) {
    console.error(
      'Failed to store memory, but continuing with response:',
      memoryError
    )
  }

  return answer
}

async function storeMemory(messages: Message[], userId: string) {
  try {
    const lastMessage = messages[messages.length - 1]
    await api.createMemory(lastMessage.content, userId)
    console.log('Memory stored successfully')
  } catch (error) {
    console.error('Error storing memory:', error)
  }
}

async function getMemories(userId: string): Promise<string[]> {
  try {
    console.log(`Attempting to retrieve memories for user: ${userId}`)
    const memories = await api.getMemories(userId)
    console.log(`Retrieved ${memories.length} memories for user ${userId}`)
    return memories.map(memory => memory.memory)
  } catch (error) {
    console.error('Error in getMemories:', error)
    return []
  }
}

const _MAX_TOKENS = 6000 // Leave some buffer for the response

export type AgentPersonality = 'anthony' | 'kelly' | 'james'

const agentPrompts: Record<AgentPersonality, string> = {
  anthony: `You're Anthony, a witty friend who loves boutique hotels with personality and fine dining with local flavors over generic luxury. Be brutally honest and focus on cultural immersion through food and experiences. Keep it casual and engaging, like chatting with a friend.`,
  kelly: `You're Kelly, the go-to person for high-end beach resorts with perfect waves and killer vibes. Use surfer slang when it feels right. Highlight eco-friendly luxury spots near prime surf destinations. Keep your tone casual, energetic, and all about the waves.`,
  james: `You're James, passionate about 5-star hotels and fine dining in Michelin-starred restaurants. Highlight iconic establishments and hidden gems. Keep responses concise, well-structured, yet casual and friendly, offering top-notch recommendations.`
}

export class PersonalTravelAssistant {
  private userId: string
  private messages: ExtendedMessage[]
  private currentPersonality: AgentPersonality

  constructor(userId: string, personality: AgentPersonality = 'james') {
    this.userId = userId
    this.currentPersonality = personality
    this.messages = [
      {
        role: 'system',
        content: agentPrompts[personality]
      }
    ]
  }

  setPersonality(personality: AgentPersonality) {
    this.currentPersonality = personality
    this.messages = [
      {
        role: 'system',
        content: agentPrompts[personality]
      }
    ]
  }

  async askQuestion(
    question: string,
    personality?: AgentPersonality
  ): Promise<string> {
    if (personality && personality !== this.currentPersonality) {
      this.setPersonality(personality)
    }

    try {
      let previousMemories: string[] = []
      try {
        previousMemories = await this.getMemories()
      } catch (memoryError) {
        console.error(
          'Failed to retrieve memories, continuing without them:',
          memoryError
        )
      }

      const curatedPlaces = await this.searchCuratedPlaces(
        question,
        previousMemories
      )

      // **Modify the prompt to heavily emphasize curated places**
      let prompt = `Hey there! So, ${question}`

      if (curatedPlaces.length > 0) {
        prompt += '\n\nBy the way, I heard about these places you might like:\n'
        curatedPlaces.forEach(place => {
          prompt += `- **${place.name}** in ${place.location}. It's known for ${
            place.features?.join(', ') || 'great vibes'
          }.\n`
        })
        prompt += '\nWhat do you think about these?'
      }

      if (previousMemories.length > 0) {
        prompt += `\n\nAlso, remember you mentioned:\n- ${previousMemories.join(
          '\n- '
        )}`
      }

      this.messages.push({
        role: 'user',
        content: prompt,
        id: Date.now().toString(),
        createdAt: new Date()
      })

      const response = await generateText({
        model: openai('o1-mini'),
        messages: this.messages,
        maxTokens: _MAX_TOKENS
      })

      const answer = response.text
      this.messages.push({
        role: 'assistant',
        content: answer,
        id: Date.now().toString(),
        createdAt: new Date()
      })

      try {
        await this.storeMemory([
          {
            role: 'user',
            content: question,
            id: Date.now().toString(),
            createdAt: new Date()
          },
          {
            role: 'assistant',
            content: answer,
            id: (Date.now() + 1).toString(),
            createdAt: new Date()
          }
        ])
      } catch (memoryError) {
        console.error(
          'Failed to store memory, but continuing with response:',
          memoryError
        )
      }

      return answer
    } catch (error) {
      console.error('Error in PersonalTravelAssistant.askQuestion:', error)
      // Provide a fallback response if an error occurs
      return "I apologize, but I'm having trouble processing your request at the moment. Please try again later or contact support if the issue persists."
    }
  }

  private async searchCuratedPlaces(
    query: string,
    memories: string[]
  ): Promise<Place[]> {
    const queryTerms = query.toLowerCase().split(/\s+/)

    // Fetch places from Supabase
    const { data: places, error } = await supabase
      .from('places')
      .select('*')
      .textSearch('name,location,features', query, {
        type: 'plain'
      })

    if (error || !places) {
      console.error('Error fetching places from Supabase:', error)
      return []
    }

    const matchingPlaces = places.map(place => {
      const queryScore = this.calculateQueryScore(place, queryTerms)
      const preferenceScore = this.calculatePreferenceScore(place, memories)
      // **Increase the weight of the queryScore (curated places)**
      const totalScore = queryScore * 0.9 + preferenceScore * 0.1
      return { ...place, relevanceScore: totalScore }
    })

    matchingPlaces.sort((a, b) => b.relevanceScore - a.relevanceScore)

    // **Optionally, increase the number of recommendations**
    return matchingPlaces.slice(0, 3)
  }

  private calculateQueryScore(place: Place, queryTerms: string[]): number {
    let score = 0
    const placeNameLower = place.name.toLowerCase()
    const placeLocationLower = place.location.toLowerCase()

    queryTerms.forEach(term => {
      const termLower = term.toLowerCase()
      if (placeNameLower.includes(termLower)) score += 5
      if (placeLocationLower.includes(termLower)) score += 5

      // Handle nearby locations
      if (isNearby(termLower, placeLocationLower)) score += 4

      // Increase score for matching features
      score +=
        place.features.filter(feature =>
          feature.toLowerCase().includes(termLower)
        ).length * 2
    })

    return score
  }

  private calculatePreferenceScore(place: Place, memories: string[]): number {
    let score = 0
    memories.forEach(memory => {
      const memoryLower = memory.toLowerCase()
      if (place.name.toLowerCase().includes(memoryLower)) score += 3
      if (place.location.toLowerCase().includes(memoryLower)) score += 2
      score += place.features.filter(feature =>
        feature.toLowerCase().includes(memoryLower)
      ).length
    })
    return score
  }

  async getMemories(): Promise<string[]> {
    return getMemories(this.userId)
  }

  private async storeMemory(messages: Message[]): Promise<void> {
    await storeMemory(messages, this.userId)
  }
}

interface Place {
  name: string
  location: string
  type: string[]
  features: string[]
  images: string[]
  relevanceScore?: number
}

function isNearby(queryLocation: string, placeLocation: string): boolean {
  const nearbyLocations: Record<string, string[]> = {
    biarritz: ['anglet', 'bayonne'],
    peniche: ['baleal', 'ferrel']
    // Add more mappings as needed
  }

  return nearbyLocations[queryLocation]?.includes(placeLocation) || false
}
