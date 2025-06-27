import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Clock } from 'lucide-react';

/**
 * Props for the RecipeCard component.
 */
interface RecipeCardProps {
  id: string | number;
  title: string;
  imageUrl: string;
  prepTime: string; // e.g., "30 mins"
  category?: string; // e.g., "Bread", "Pastry"
}

/**
 * A custom composite card for displaying a recipe's summary.
 * Features a gentle hover animation for a pleasant user experience.
 */
const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  imageUrl,
  prepTime,
  category,
}) => {
  console.log(`RecipeCard loaded for recipe ID: ${id}`);

  return (
    <Card className="group w-full overflow-hidden rounded-lg border-stone-200 transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-200/50">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1974&auto=format&fit=crop'}
            alt={`A photo of ${title}`}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="space-y-3 p-4 bg-white">
        {category && (
          <Badge variant="secondary" className="text-sm font-medium text-amber-800 bg-amber-100 border-amber-200">
            {category}
          </Badge>
        )}
        <CardTitle className="text-lg font-serif font-semibold tracking-tight text-stone-800 line-clamp-2">
          {title}
        </CardTitle>
        <div className="flex items-center text-sm text-stone-500">
          <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>{prepTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;