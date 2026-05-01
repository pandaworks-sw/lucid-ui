import { useState } from 'react';
import { DemoSection } from '@/showcase/component-page';
import { SearchInput } from '@/components/ui/search-input';

export default function SearchInputDemo() {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  return (
    <>
      <DemoSection
        title="Default"
        code={`import { SearchInput } from "@/components/ui/search-input"

<SearchInput onSearch={(value) => console.log(value)} />`}
      >
        <div className="max-w-sm">
          <SearchInput onSearch={(value) => setDebouncedValue(value)} />
          {debouncedValue && <p className="mt-2 text-sm text-muted-foreground">Debounced value: {debouncedValue}</p>}
        </div>
      </DemoSection>

      <DemoSection
        title="With Clear Button"
        code={`<SearchInput
  onSearch={(value) => console.log(value)}
  onClear={() => console.log("cleared")}
/>`}
      >
        <div className="max-w-sm">
          <SearchInput onSearch={(value) => setSearchValue(value)} onClear={() => setSearchValue('')} />
          {searchValue && <p className="mt-2 text-sm text-muted-foreground">Searching: {searchValue}</p>}
        </div>
      </DemoSection>

      <DemoSection title="Custom Placeholder" code={`<SearchInput placeholder="Filter employees..." />`}>
        <div className="max-w-sm">
          <SearchInput placeholder="Filter employees..." />
        </div>
      </DemoSection>

      <DemoSection title="Custom Debounce (500ms)" code={`<SearchInput debounce={500} onSearch={handleSearch} />`}>
        <div className="max-w-sm">
          <SearchInput debounce={500} onSearch={() => {}} />
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="max-w-sm">
          <SearchInput disabled placeholder="Search disabled" />
        </div>
      </DemoSection>
    </>
  );
}
