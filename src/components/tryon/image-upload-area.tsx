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
    <Card className="overflow-hidden">
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
          <div className="relative aspect-[3/4] bg-muted">
            <img
              src={imagePreview}
              alt={label}
              className="w-full h-full object-contain"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={handleRemove}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`aspect-[3/4] flex flex-col items-center justify-center cursor-pointer transition-colors ${
              disabled 
                ? 'bg-muted/50 cursor-not-allowed' 
                : 'bg-muted hover:bg-muted/80'
            }`}
            onClick={handleClick}
          >
            <div className={`rounded-full p-4 mb-4 ${disabled ? 'bg-muted' : 'bg-primary/10'}`}>
              {disabled ? (
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              ) : (
                <Upload className="h-8 w-8 text-primary" />
              )}
            </div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {disabled ? 'Please wait' : 'Click to upload'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
