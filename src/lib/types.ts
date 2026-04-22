export type TryOnStatus = 
  | 'EMPTY' 
  | 'PERSON_READY' 
  | 'CLOTHING_READY' 
  | 'READY' 
  | 'GENERATING' 
  | 'SUCCESS' 
  | 'ERROR';

export type ClothingCategory = 'top' | 'bottom' | 'dress' | null;

export type UserType = 'GUEST' | 'LOGGED_IN';

export type SubscriptionType = 'FREE' | 'MONTHLY' | 'YEARLY';

export type SubscriptionStatus = 
  | 'FREE_TRIAL' 
  | 'TRIALS_EXHAUSTED' 
  | 'SUBSCRIBED' 
  | 'FREE_USERS';

export interface TryOnState {
  status: TryOnStatus;
  personImage: File | null;
  personPreviewUrl: string | null;
  clothingImage: File | null;
  clothingPreviewUrl: string | null;
  resultImage: string | null;
  detectedCategory: ClothingCategory;
  errorMessage: string | null;
  generationId: string | null;
}

export interface SessionState {
  userType: UserType;
  sessionId: string;
  currentPersonImage: string | null;
  trialCount: number;
  maxFreeTrials: number;
}

export interface UserState {
  userId: string | null;
  email: string | null;
  name: string | null;
  avatar: string | null;
  subscriptionType: SubscriptionType;
  subscriptionExpiresAt: Date | null;
}

export interface HistoryItem {
  id: string;
  resultImage: string;
  personImage: string;
  clothingImage: string;
  category: ClothingCategory;
  createdAt: Date;
}

export interface SubscriptionState {
  status: SubscriptionStatus;
  remainingTrials: number;
  plan: 'free' | 'monthly' | 'yearly' | null;
}

export interface AppState {
  tryOn: TryOnState;
  session: SessionState;
  user: UserState;
  subscription: SubscriptionState;
}
