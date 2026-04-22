'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import type {
  TryOnState,
  SessionState,
  UserState,
  SubscriptionState,
  AppState,
  TryOnStatus,
  ClothingCategory,
  UserType,
  SubscriptionStatus,
} from '@/lib/types';

const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

const MAX_FREE_TRIALS = 3;

const initialTryOnState: TryOnState = {
  status: 'EMPTY',
  personImage: null,
  personPreviewUrl: null,
  clothingImage: null,
  clothingPreviewUrl: null,
  resultImage: null,
  detectedCategory: null,
  errorMessage: null,
  generationId: null,
};

const initialSessionState: SessionState = {
  userType: 'GUEST',
  sessionId: generateSessionId(),
  currentPersonImage: null,
  trialCount: 0,
  maxFreeTrials: MAX_FREE_TRIALS,
};

const initialUserState: UserState = {
  userId: null,
  email: null,
  name: null,
  avatar: null,
  subscriptionType: 'FREE',
  subscriptionExpiresAt: null,
};

const initialSubscriptionState: SubscriptionState = {
  status: 'FREE_TRIAL',
  remainingTrials: MAX_FREE_TRIALS,
  plan: 'free',
};

const initialAppState: AppState = {
  tryOn: initialTryOnState,
  session: initialSessionState,
  user: initialUserState,
  subscription: initialSubscriptionState,
};

type AppAction =
  | { type: 'SET_PERSON_IMAGE'; payload: { file: File; previewUrl: string } }
  | { type: 'REMOVE_PERSON_IMAGE' }
  | { type: 'SET_CLOTHING_IMAGE'; payload: { file: File; previewUrl: string } }
  | { type: 'REMOVE_CLOTHING_IMAGE' }
  | { type: 'SET_STATUS'; payload: TryOnStatus }
  | { type: 'SET_RESULT'; payload: { resultImage: string; generationId: string; category: ClothingCategory } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_RESULT' }
  | { type: 'RESET_TRYON' }
  | { type: 'INCREMENT_TRIAL_COUNT' }
  | { type: 'SET_USER_TYPE'; payload: UserType }
  | { type: 'SET_USER'; payload: Partial<UserState> }
  | { type: 'LOGOUT' }
  | { type: 'SET_SUBSCRIPTION_STATUS'; payload: SubscriptionStatus }
  | { type: 'SET_SUBSCRIPTION_PLAN'; payload: 'free' | 'monthly' | 'yearly' }
  | { type: 'SET_REMAINING_TRIALS'; payload: number }
  | { type: 'RESET_ALL' };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PERSON_IMAGE':
      return {
        ...state,
        tryOn: {
          ...state.tryOn,
          personImage: action.payload.file,
          personPreviewUrl: action.payload.previewUrl,
          status: state.tryOn.clothingImage ? 'READY' : 'PERSON_READY',
        },
        session: {
          ...state.session,
          currentPersonImage: action.payload.previewUrl,
        },
      };

    case 'REMOVE_PERSON_IMAGE':
      return {
        ...state,
        tryOn: {
          ...state.tryOn,
          personImage: null,
          personPreviewUrl: null,
          status: state.tryOn.status === 'SUCCESS' ? 'EMPTY' : 
                  state.tryOn.clothingImage ? 'CLOTHING_READY' : 'EMPTY',
        },
      };

    case 'SET_CLOTHING_IMAGE':
      return {
        ...state,
        tryOn: {
          ...state.tryOn,
          clothingImage: action.payload.file,
          clothingPreviewUrl: action.payload.previewUrl,
          status: state.tryOn.personImage ? 'READY' : 'CLOTHING_READY',
        },
      };

    case 'REMOVE_CLOTHING_IMAGE':
      return {
        ...state,
        tryOn: {
          ...state.tryOn,
          clothingImage: null,
          clothingPreviewUrl: null,
          status: state.tryOn.status === 'SUCCESS' ? 'EMPTY' : 
                  state.tryOn.personImage ? 'PERSON_READY' : 'EMPTY',
        },
      };

    case 'SET_STATUS':
      return {
        ...state,
        tryOn: {
          ...state.tryOn,
          status: action.payload,
        },
      };

    case 'SET_RESULT':
      return {
        ...state,
        tryOn: {
          ...state.tryOn,
          status: 'SUCCESS',
          resultImage: action.payload.resultImage,
          generationId: action.payload.generationId,
          detectedCategory: action.payload.category,
          errorMessage: null,
        },
      };

    case 'SET_ERROR':
      return {
        ...state,
        tryOn: {
          ...state.tryOn,
          status: 'ERROR',
          errorMessage: action.payload,
        },
      };

    case 'CLEAR_RESULT':
      return {
        ...state,
        tryOn: {
          ...state.tryOn,
          resultImage: null,
          generationId: null,
          detectedCategory: null,
          status: state.tryOn.personImage && state.tryOn.clothingImage ? 'READY' : 
                  state.tryOn.personImage ? 'PERSON_READY' : 
                  state.tryOn.clothingImage ? 'CLOTHING_READY' : 'EMPTY',
        },
      };

    case 'RESET_TRYON':
      return {
        ...state,
        tryOn: initialTryOnState,
      };

    case 'INCREMENT_TRIAL_COUNT':
      return {
        ...state,
        session: {
          ...state.session,
          trialCount: state.session.trialCount + 1,
        },
        subscription: {
          ...state.subscription,
          remainingTrials: Math.max(0, state.subscription.remainingTrials - 1),
          status: state.session.trialCount + 1 >= MAX_FREE_TRIALS 
            ? 'TRIALS_EXHAUSTED' 
            : state.subscription.status,
        },
      };

    case 'SET_USER_TYPE':
      return {
        ...state,
        session: {
          ...state.session,
          userType: action.payload,
        },
      };

    case 'SET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case 'LOGOUT':
      return {
        ...state,
        session: {
          ...initialSessionState,
          userType: 'GUEST',
          sessionId: generateSessionId(),
        },
        user: initialUserState,
        subscription: initialSubscriptionState,
      };

    case 'SET_SUBSCRIPTION_STATUS':
      return {
        ...state,
        subscription: {
          ...state.subscription,
          status: action.payload,
        },
      };

    case 'SET_SUBSCRIPTION_PLAN':
      return {
        ...state,
        subscription: {
          ...state.subscription,
          plan: action.payload,
        },
      };

    case 'SET_REMAINING_TRIALS':
      return {
        ...state,
        subscription: {
          ...state.subscription,
          remainingTrials: action.payload,
        },
      };

    case 'RESET_ALL':
      return {
        ...initialAppState,
        session: {
          ...initialSessionState,
          sessionId: generateSessionId(),
        },
      };

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setPersonImage: (file: File, previewUrl: string) => void;
  removePersonImage: () => void;
  setClothingImage: (file: File, previewUrl: string) => void;
  removeClothingImage: () => void;
  setStatus: (status: TryOnStatus) => void;
  setResult: (resultImage: string, generationId: string, category: ClothingCategory) => void;
  setError: (error: string) => void;
  clearResult: () => void;
  resetTryOn: () => void;
  incrementTrialCount: () => void;
  setUserType: (userType: UserType) => void;
  setUser: (user: Partial<UserState>) => void;
  logout: () => void;
  canGenerate: () => boolean;
  isSubscribed: () => boolean;
  setSubscriptionStatus: (status: SubscriptionStatus) => void;
  setSubscriptionPlan: (plan: 'free' | 'monthly' | 'yearly') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const setPersonImage = useCallback((file: File, previewUrl: string) => {
    dispatch({ type: 'SET_PERSON_IMAGE', payload: { file, previewUrl } });
  }, []);

  const removePersonImage = useCallback(() => {
    dispatch({ type: 'REMOVE_PERSON_IMAGE' });
  }, []);

  const setClothingImage = useCallback((file: File, previewUrl: string) => {
    dispatch({ type: 'SET_CLOTHING_IMAGE', payload: { file, previewUrl } });
  }, []);

  const removeClothingImage = useCallback(() => {
    dispatch({ type: 'REMOVE_CLOTHING_IMAGE' });
  }, []);

  const setStatus = useCallback((status: TryOnStatus) => {
    dispatch({ type: 'SET_STATUS', payload: status });
  }, []);

  const setResult = useCallback((resultImage: string, generationId: string, category: ClothingCategory) => {
    dispatch({ type: 'SET_RESULT', payload: { resultImage, generationId, category } });
  }, []);

  const setError = useCallback((error: string) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearResult = useCallback(() => {
    dispatch({ type: 'CLEAR_RESULT' });
  }, []);

  const resetTryOn = useCallback(() => {
    dispatch({ type: 'RESET_TRYON' });
  }, []);

  const incrementTrialCount = useCallback(() => {
    dispatch({ type: 'INCREMENT_TRIAL_COUNT' });
  }, []);

  const setUserType = useCallback((userType: UserType) => {
    dispatch({ type: 'SET_USER_TYPE', payload: userType });
  }, []);

  const setUser = useCallback((user: Partial<UserState>) => {
    dispatch({ type: 'SET_USER', payload: user });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const canGenerate = useCallback(() => {
    if (state.subscription.status === 'SUBSCRIBED') {
      return state.tryOn.status === 'READY';
    }
    return state.tryOn.status === 'READY' && state.subscription.remainingTrials > 0;
  }, [state.tryOn.status, state.subscription]);

  const isSubscribed = useCallback(() => {
    return state.subscription.status === 'SUBSCRIBED';
  }, [state.subscription.status]);

  const setSubscriptionStatus = useCallback((status: SubscriptionStatus) => {
    dispatch({ type: 'SET_SUBSCRIPTION_STATUS', payload: status });
  }, []);

  const setSubscriptionPlan = useCallback((plan: 'free' | 'monthly' | 'yearly') => {
    dispatch({ type: 'SET_SUBSCRIPTION_PLAN', payload: plan });
  }, []);

  const value: AppContextType = {
    state,
    dispatch,
    setPersonImage,
    removePersonImage,
    setClothingImage,
    removeClothingImage,
    setStatus,
    setResult,
    setError,
    clearResult,
    resetTryOn,
    incrementTrialCount,
    setUserType,
    setUser,
    logout,
    canGenerate,
    isSubscribed,
    setSubscriptionStatus,
    setSubscriptionPlan,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
