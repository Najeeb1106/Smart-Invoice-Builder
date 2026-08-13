import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../common/Input';

export interface TemplateSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TemplateSearch: React.FC<TemplateSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div style={{ maxWidth: '360px', width: '100%' }}>
      <Input
        placeholder="Search templates..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        leftIcon={<Search size={18} />}
        aria-label="Search templates"
      />
    </div>
  );
};
