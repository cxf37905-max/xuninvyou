'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Eye, Image as ImageIcon, Shirt } from 'lucide-react';
import type { HistoryItem } from '@/lib/types';

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    resultImage: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="250"><rect fill="#f3f4f6" width="200" height="250"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af">Preview 1</text></svg>'),
    personImage: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#e5e7eb" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af">Person</text></svg>'),
    clothingImage: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#d1d5db" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af">Cloth</text></svg>'),
    category: 'top',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    resultImage: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="250"><rect fill="#f3f4f6" width="200" height="250"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af">Preview 2</text></svg>'),
    personImage: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#e5e7eb" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af">Person</text></svg>'),
    clothingImage: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#d1d5db" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af">Cloth</text></svg>'),
    category: 'bottom',
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    resultImage: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="250"><rect fill="#f3f4f6" width="200" height="250"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af">Preview 3</text></svg>'),
    personImage: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#e5e7eb" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af">Person</text></svg>'),
    clothingImage: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#d1d5db" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af">Cloth</text></svg>'),
    category: 'dress',
    createdAt: new Date('2024-01-13'),
  },
];

export function HistoryView() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory);

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleView = () => {
    router.push('/result');
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all history?')) {
      setHistory([]);
    }
  };

  const categoryLabel = {
    top: 'Top',
    bottom: 'Bottom',
    dress: 'Dress',
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">History</h1>
              <p className="mt-2 text-muted-foreground">
                View your past try-on results
              </p>
            </div>
            
            {history.length > 0 && (
              <Button variant="outline" onClick={handleClearAll}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>

          {history.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No History Yet</h2>
                <p className="text-muted-foreground mb-4">
                  You haven&apos;t tried any clothes yet. Start your first virtual try-on!
                </p>
                <Button onClick={() => router.push('/try-on')}>
                  Start Trying On
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {history.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-[3/4] relative bg-muted">
                    <img
                      src={item.resultImage}
                      alt="Try-on result"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Shirt className="h-4 w-4" />
                        {categoryLabel[item.category || 'top']}
                      </div>
                      <div>{formatDate(item.createdAt)}</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleView}
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
