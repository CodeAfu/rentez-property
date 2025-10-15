import React from 'react';

export default function ColorShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">shadcn/ui Color Variables</h1>
          <p className="text-muted-foreground">Visual showcase of all main color tokens</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-background text-foreground p-6 rounded-lg border-2 border-border">
            <h3 className="text-xl font-semibold mb-2">Background</h3>
            <p className="text-sm mb-3">Base page colors</p>
            <div className="text-xs font-mono opacity-75">
              <div>bg-background / text-foreground</div>
            </div>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-lg border-2 border-border">
            <h3 className="text-xl font-semibold mb-2">Card</h3>
            <p className="text-sm mb-3">Card component colors</p>
            <div className="text-xs font-mono opacity-75">
              <div>bg-card / text-card-foreground</div>
            </div>
          </div>

          <div className="bg-popover text-popover-foreground p-6 rounded-lg border-2 border-border">
            <h3 className="text-xl font-semibold mb-2">Popover</h3>
            <p className="text-sm mb-3">Popover/dropdown colors</p>
            <div className="text-xs font-mono opacity-75">
              <div>bg-popover / text-popover-foreground</div>
            </div>
          </div>

          <div className="bg-primary text-primary-foreground p-6 rounded-lg border-2 border-border">
            <h3 className="text-xl font-semibold mb-2">Primary</h3>
            <p className="text-sm mb-3">Primary action colors</p>
            <div className="text-xs font-mono opacity-75">
              <div>bg-primary / text-primary-foreground</div>
            </div>
          </div>

          <div className="bg-secondary text-secondary-foreground p-6 rounded-lg border-2 border-border">
            <h3 className="text-xl font-semibold mb-2">Secondary</h3>
            <p className="text-sm mb-3">Secondary element colors</p>
            <div className="text-xs font-mono opacity-75">
              <div>bg-secondary / text-secondary-foreground</div>
            </div>
          </div>

          <div className="bg-muted text-muted-foreground p-6 rounded-lg border-2 border-border">
            <h3 className="text-xl font-semibold mb-2">Muted</h3>
            <p className="text-sm mb-3">Muted/subdued content</p>
            <div className="text-xs font-mono opacity-75">
              <div>bg-muted / text-muted-foreground</div>
            </div>
          </div>

          <div className="bg-accent text-accent-foreground p-6 rounded-lg border-2 border-border">
            <h3 className="text-xl font-semibold mb-2">Accent</h3>
            <p className="text-sm mb-3">Accent/highlight colors</p>
            <div className="text-xs font-mono opacity-75">
              <div>bg-accent / text-accent-foreground</div>
            </div>
          </div>

          <div className="bg-destructive text-destructive-foreground p-6 rounded-lg border-2 border-border">
            <h3 className="text-xl font-semibold mb-2">Destructive</h3>
            <p className="text-sm mb-3">Destructive actions</p>
            <div className="text-xs font-mono opacity-75">
              <div>bg-destructive / text-destructive-foreground</div>
            </div>
          </div>
        </div>

        <div className="border-2 border-border rounded-lg p-6 space-y-4 bg-card text-card-foreground">
          <h3 className="text-xl font-semibold">Border Showcase</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border-2 border-border p-4 rounded text-center text-sm">
              <div className="font-mono text-xs text-muted-foreground">border</div>
            </div>
            <div className="border-4 border-border p-4 rounded text-center text-sm">
              <div className="font-mono text-xs text-muted-foreground">border-4</div>
            </div>
            <div className="border-2 border-dashed border-border p-4 rounded text-center text-sm">
              <div className="font-mono text-xs text-muted-foreground">dashed</div>
            </div>
            <div className="border-2 border-dotted border-border p-4 rounded text-center text-sm">
              <div className="font-mono text-xs text-muted-foreground">dotted</div>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Interactive Elements</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90">
              Primary Button
            </button>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:opacity-90">
              Secondary Button
            </button>
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded hover:opacity-90">
              Accent Button
            </button>
            <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded hover:opacity-90">
              Delete
            </button>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Card with Popover</h3>
          <p className="text-muted-foreground mb-6">Example of popover layering over card content</p>
          
          <div className="relative">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">This is card content underneath</p>
            </div>
            
            <div className="absolute top-8 left-8 bg-popover text-popover-foreground p-4 rounded-lg border-2 border-border shadow-lg">
              <h4 className="font-semibold mb-2">Popover Content</h4>
              <p className="text-sm">This popover floats above the card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}