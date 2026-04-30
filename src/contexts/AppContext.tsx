'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import type { TryOnState, TryOnStatus, ClothingCategory } from '@/lib/types';

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

type AppAction =
  | { type: 'SET_PERSON_IMAGE'; payload: { file: File; previewUrl: string } }
  | { type: 'REMOVE_PERSON_IMAGE' }
  | { type: 'SET_CLOTHING_IMAGE'; payload: { file: File; previewUrl: string } }
  | { type: 'REMOVE_CLOTHING_IMAGE' }
  | { type: 'SET_STATUS'; payload: TryOnStatus }
  | { type: 'SET_RESULT'; payload: { resultImage: string; generationId: string; category: ClothingCategory } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_RESULT' }
  | { type: 'RESET_TRYON' };

function appReducer(state: { tryOn: TryOnState }, action: AppAction): { tryOn: TryOnState } {
  switch (action.type) {
    case 'SET_PERSON_IMAGE':
      return {
        tryOn: {
          ...state.tryOn,
          personImage: action.payload.file,
          personPreviewUrl: action.payload.previewUrl,
          status: state.tryOn.clothingImage ? 'READY' : 'PERSON_READY',
        },
      };

    case 'REMOVE_PERSON_IMAGE':
      return {
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
        tryOn: {
          ...state.tryOn,
          clothingImage: action.payload.file,
          clothingPreviewUrl: action.payload.previewUrl,
          status: state.tryOn.personImage ? 'READY' : 'CLOTHING_READY',
        },
      };

    case 'REMOVE_CLOTHING_IMAGE':
      return {
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
        tryOn: {
          ...state.tryOn,
          status: action.payload,
        },
      };

    case 'SET_RESULT':
      return {
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
        tryOn: {
          ...state.tryOn,
          status: 'ERROR',
          errorMessage: action.payload,
        },
      };

    case 'CLEAR_RESULT':
      return {
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
        tryOn: initialTryOnState,
      };

    default:
      return state;
  }
}

interface AppContextType {
  state: { tryOn: TryOnState };
  setPersonImage: (file: File, previewUrl: string) => void;
  removePersonImage: () => void;
  setClothingImage: (file: File, previewUrl: string) => void;
  removeClothingImage: () => void;
  setStatus: (status: TryOnStatus) => void;
  setResult: (resultImage: string, generationId: string, category: ClothingCategory) => void;
  setError: (error: string) => void;
  clearResult: () => void;
  resetTryOn: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, { tryOn: initialTryOnState });

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

  const value: AppContextType = {
    state,
    setPersonImage,
    removePersonImage,
    setClothingImage,
    removeClothingImage,
    setStatus,
    setResult,
    setError,
    clearResult,
    resetTryOn,
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
