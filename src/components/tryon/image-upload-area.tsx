'use client';

import { useState, useRef } from 'react';
import { ImagePlus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ImageUploadAreaProps {
  label: string;
  imagePreview: string | null;
  onImageChange: (file: File, previewUrl: string) => void;
  onImageRemove: () => void;
  disabled?: boolean;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageUploadArea({
  label,
  imagePreview,
  onImageChange,
  onImageRemove,
  disabled = false,
}: ImageUploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      onImageChange(file, dataUrl);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Failed to read file');
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageRemove();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Card className="overflow-hidden border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
        
        {imagePreview ? (
          <div className="relative aspect-[3/4] bg-stone-100 dark:bg-stone-800">
            <img
              src={imagePreview}
              alt={label}
              className="w-full h-full object-contain"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-stone-900/90 shadow-md hover:bg-white dark:hover:bg-stone-800"
              onClick={handleRemove}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`aspect-[3/4] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
              disabled 
                ? 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 cursor-not-allowed' 
                : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            onClick={handleClick}
          >
            <div className={`rounded-full p-5 mb-4 ${disabled ? 'bg-stone-200 dark:bg-stone-700' : 'bg-stone-900 dark:bg-stone-100'}`}>
              {disabled ? (
                <ImageIcon className="h-8 w-8 text-stone-400" />
              ) : (
                <Upload className="h-8 w-8 text-stone-50 dark:text-stone-900" />
              )}
            </div>
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{label}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {disabled ? 'Please wait' : 'Click to upload'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
