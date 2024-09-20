import { revalidatePath } from "next/cache";

const mem0ApiKey = process.env.MEM0_API_KEY;

if (!mem0ApiKey) {
  console.error('Missing Mem0 API key');
}

interface Memory {
  memory: string;
  id: string;
}

export const api = {
  async createMemory(query: string, userId: string) {
    if (!mem0ApiKey) {
      throw new Error('Missing Mem0 API key');
    }

    const response = await fetch("https://api.mem0.ai/v1/memories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${mem0ApiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: query }],
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create memory: ${await response.text()}`);
    }

    return response.json();
  },

  async getMemories(userId: string): Promise<Memory[]> {
    if (!mem0ApiKey) {
      throw new Error('Missing Mem0 API key');
    }

    const response = await fetch(
      `https://api.mem0.ai/v1/memories/?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${mem0ApiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get memories: ${await response.text()}`);
    }

    return response.json();
  },

  async deleteMemory(memoryId: string): Promise<boolean> {
    if (!mem0ApiKey) {
      throw new Error('Missing Mem0 API key');
    }

    const response = await fetch(
      `https://api.mem0.ai/v1/memories/${memoryId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${mem0ApiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete memory: ${await response.text()}`);
    }

    revalidatePath("/");
    return true;
  },

  async searchMemories(query: string, userId: string): Promise<string> {
    if (!mem0ApiKey) {
      throw new Error('Missing Mem0 API key');
    }

    const response = await fetch('https://api.mem0.ai/v1/memories/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${mem0ApiKey}`,
      },
      body: JSON.stringify({
        query: `What do you know about ${query}`,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to search memories: ${await response.text()}`);
    }

    const memories = await response.json() as { memory: string }[];
    return memories.map(memory => memory.memory).join('\n\n');
  },
};