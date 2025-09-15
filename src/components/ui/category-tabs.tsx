import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  count: number;
  icon?: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 bg-muted/50 p-1 rounded-lg">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 relative"
          >
            <div className="flex items-center space-x-2">
              {category.icon && (
                <span className="text-lg">{category.icon}</span>
              )}
              <span className="font-medium">{category.name}</span>
              <Badge 
                variant="secondary" 
                className="ml-1 h-5 px-1.5 text-xs data-[state=active]:bg-primary-foreground data-[state=active]:text-primary"
              >
                {category.count}
              </Badge>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};