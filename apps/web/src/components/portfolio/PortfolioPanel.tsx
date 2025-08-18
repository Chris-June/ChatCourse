import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePortfolioArtifacts } from '@/store/usePortfolioArtifacts';

export interface PortfolioPanelProps {
  title?: string;
  description?: string;
  onSave?: () => void;
  saveLabel?: string;
  showExport?: boolean;
  className?: string;
}

/**
 * Reusable panel for lesson artifacts.
 * - Provides Save button (via onSave)
 * - Provides Export JSON / CSV via usePortfolioArtifacts
 * - Announces actions via aria-live (WCAG 2.2 AA)
 */
export const PortfolioPanel: React.FC<PortfolioPanelProps> = ({
  title = 'Portfolio',
  description = 'Save lesson artifacts or export your collection.',
  onSave,
  saveLabel = 'Save',
  showExport = true,
  className = '',
}) => {
  const { exportJSON, exportCSV } = usePortfolioArtifacts();
  const [announcement, setAnnouncement] = useState<string>('');

  const hasSave = useMemo(() => typeof onSave === 'function', [onSave]);

  const announce = (msg: string) => {
    setAnnouncement(msg);
    // Clear after a short delay so repeated actions are announced
    window.setTimeout(() => setAnnouncement(''), 1200);
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
      announce('Saved to portfolio.');
    }
  };

  const handleExportJSON = () => {
    exportJSON();
    announce('Exported JSON.');
  };

  const handleExportCSV = () => {
    exportCSV();
    announce('Exported CSV.');
  };

  return (
    <div className={`bg-muted/30 border border-muted rounded-xl p-4 ${className}`}>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {hasSave && (
          <Button variant="secondary" onClick={handleSave} aria-label={saveLabel}>
            {saveLabel}
          </Button>
        )}
        {showExport && (
          <>
            <Button variant="outline" onClick={handleExportJSON} aria-label="Export JSON">
              Export JSON
            </Button>
            <Button variant="outline" onClick={handleExportCSV} aria-label="Export CSV">
              Export CSV
            </Button>
          </>
        )}
      </div>
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </div>
  );
};

export default PortfolioPanel;
