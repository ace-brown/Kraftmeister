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
