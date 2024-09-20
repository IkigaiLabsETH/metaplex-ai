export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

// If you need a type for the curated places, you can add it here:
export interface CuratedPlace {
  name: string;
  location: string;
  type: string;
  features: string[];
  images: string[];
}
