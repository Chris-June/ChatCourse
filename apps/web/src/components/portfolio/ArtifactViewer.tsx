import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { usePortfolioArtifacts, Artifact } from '@/store/usePortfolioArtifacts';

export interface ArtifactViewerProps {
  module?: number;
  lesson?: number;
  title?: string;
  description?: string;
  className?: string;
  clearScope?: 'filtered' | 'all';
}

function formatDate(ts: number) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

const ArtifactCard: React.FC<{
  artifact: Artifact;
  onRemove: (id: string) => void;
}> = ({ artifact, onRemove }) => {
  return (
    <div className="flex items-start justify-between p-3 border border-border rounded-md bg-card">
      <div className="text-sm">
        <div className="font-medium text-foreground">{artifact.title}</div>
        <div className="text-xs text-muted-foreground">
          {artifact.type} • Module {artifact.module}.{artifact.lesson} • {formatDate(artifact.createdAt)}
        </div>
      </div>
      <Button size="sm" variant="ghost" onClick={() => onRemove(artifact.id)} aria-label={`Remove ${artifact.title}`}>
        Remove
      </Button>
    </div>
  );
};

const ArtifactViewer: React.FC<ArtifactViewerProps> = ({
  module,
  lesson,
  title = 'Saved Artifacts',
  description = 'Manage your saved items for this lesson.',
  className = '',
  clearScope = 'filtered',
}) => {
  const { artifacts, removeArtifact, clearArtifacts } = usePortfolioArtifacts();

  const filtered = useMemo(() => {
    return artifacts.filter((a) =>
      (module === undefined || a.module === module) &&
      (lesson === undefined || a.lesson === lesson)
    );
  }, [artifacts, module, lesson]);

  const handleClear = () => {
    if (clearScope === 'all') {
      clearArtifacts();
    } else {
      // Clear only filtered by removing each id
      filtered.forEach((a) => removeArtifact(a.id));
    }
  };

  return (
    <div className={`bg-muted/20 border border-border rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleClear} aria-label="Clear artifacts">
            {clearScope === 'all' ? 'Clear All' : 'Clear These'}
          </Button>
        </div>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No saved artifacts yet.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((a) => (
            <ArtifactCard key={a.id} artifact={a} onRemove={removeArtifact} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtifactViewer;
