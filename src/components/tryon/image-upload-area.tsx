'use client';

import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadAreaProps {
  label: string;
  imagePreview: string | null;
  onImageChange: (file: File, previewUrl: string) => void;
  onImageRemove: () => void;
  disabled?: boolean;
}

export function ImageUploadArea({
  label,
  imagePreview,
  onImageChange,
  onImageRemove,
  disabled = false,
}: ImageUploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageChange(file, reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageChange(file, reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageChange]
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none">{label}</label>
      
      {imagePreview ? (
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border bg-muted">
          <img
            src={imagePreview}
            alt={label}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={onImageRemove}
            disabled={disabled}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className={cn(
            "relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            disabled && "pointer-events-none opacity-50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Click or drag to upload
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
