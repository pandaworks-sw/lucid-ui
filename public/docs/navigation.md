# Navigation Components

Tabs, accordions, pagination, and other navigation patterns.

## Tabs

Variants: `default` (pill-style), `line` (underline-style)

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="general">
  <TabsList variant="line">
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="general">General settings</TabsContent>
  <TabsContent value="security">Security settings</TabsContent>
</Tabs>
```

## Accordion

```tsx
import {
  Accordion, AccordionContent,
  AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Collapsible

```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>
```

## Pagination

```tsx
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>
```

## ScrollArea

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-[200px]">
  {/* Long content */}
</ScrollArea>
```

## Toggle

Sizes: `sm` (`h-8`), `default` (`h-9`), `lg` (`h-10`).

```tsx
import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>
```

Sizing — pair with the surrounding control density:

| Scenario | Size |
|----------|------|
| Inline rich-text or formatting toolbar in a `PageHeader` or modal | `default` |
| Toolbar inside a table row, filter bar, or dense card header | `sm` |
| Toolbar inside a marketing surface or full-screen editor hero | `lg` |

Toggles in a row should all share one size — never mix.

## ToggleGroup

Same `sm` / `default` / `lg` axis as `Toggle`. Match the size to the host context using the same rules.

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from "lucide-react"

<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline /></ToggleGroupItem>
</ToggleGroup>
```
