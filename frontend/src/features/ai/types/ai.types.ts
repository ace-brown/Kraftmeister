export interface VoiceToJobResponse {
  title: string;
  description: string;
  tasks: string[];
  materials: string[];
  priority: 'low' | 'medium' | 'high';
  suggestedDate: string | null;
}

export interface SuggestItemsRequest {
  jobDescription: string;
  jobType?: string;
}

export interface SuggestItemsItem {
  description: string;
  quantity: number;
  unitPrice: number;
  unit: string;
}

export interface SuggestItemsResponse {
  items: SuggestItemsItem[];
}

export interface AnalyzePhotoRequest {
  imageUrl: string;
}

export interface AnalyzePhotoResponse {
  summary: string;
  detectedIssues: string[];
  suggestedTasks: string[];
  estimatedComplexity: 'low' | 'medium' | 'high';
}

export interface AgentResponse {
  answer: string;
}

/** A single message in the agent chat history. */
export interface AgentChatMessage {
  role: 'user' | 'agent';
  content: string;
}

export interface AgentChatMessagesProps {
  messages: AgentChatMessage[];
  isPending: boolean;
}

export interface AgentChatInputProps {
  onSend: (message: string) => void;
  isPending: boolean;
}
