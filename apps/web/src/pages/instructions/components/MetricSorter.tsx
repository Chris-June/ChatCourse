import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BarChart2, TrendingUp, TrendingDown, GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

type Metric = {
  id: string;
  text: string;
  signal: 'high' | 'low';
};

const initialMetrics: Metric[] = [
  { id: '1', text: 'Correction Rate', signal: 'high' },
  { id: '2', text: 'User Satisfaction Score (CSAT)', signal: 'high' },
  { id: '3', text: 'Task Completion Rate', signal: 'high' },
  { id: '4', text: 'Daily Active Users (DAU)', signal: 'low' },
  { id: '5', text: 'AI Response Time (ms)', signal: 'low' },
  { id: '6', text: 'Number of API Calls', signal: 'low' },
];

const SortableItem = ({ id, text }: { id: string; text: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-card border p-3 rounded-lg flex items-center shadow-sm focus-within:ring-2 focus-within:ring-ring"
      aria-roledescription="Draggable item"
    >
      <button
        {...listeners}
        className="cursor-grab touch-none p-1 rounded outline-none focus:ring-2 focus:ring-ring"
        aria-label="Drag handle"
      >
        <GripVertical className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
      </button>
      <span className="ml-2 text-foreground">{text}</span>
    </div>
  );
};

const DropZone = ({ containerId, title, items, icon }: { containerId: string; title: string; items: Metric[]; icon: React.ReactNode }) => {
  return (
    <div id={containerId} className="bg-muted p-4 rounded-lg w-full border">
      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">{icon}{title}</h4>
      <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
        <div className="space-y-2 min-h-[100px]">
          {items.map(item => <SortableItem key={item.id} id={item.id} text={item.text} />)}
        </div>
      </SortableContext>
    </div>
  );
};

const MetricSorter: React.FC = () => {
  const [containers, setContainers] = useState<Record<string, Metric[]>>({
    unassigned: initialMetrics,
    highSignal: [],
    lowSignal: [],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const findContainer = (id: string) => {
    if (id in containers) return id;
    return Object.keys(containers).find(key => containers[key].some(item => item.id === id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainerKey = findContainer(activeId);
    const overContainerKey = findContainer(overId);

    if (!activeContainerKey || !overContainerKey) return;

    // Handle reordering within the same container
    if (activeContainerKey === overContainerKey) {
      if (activeId === overId) return; // Dropped on itself
      setContainers(prev => {
        const containerItems = prev[activeContainerKey];
        const oldIndex = containerItems.findIndex(item => item.id === activeId);
        const newIndex = containerItems.findIndex(item => item.id === overId);
        if (oldIndex === -1 || newIndex === -1) return prev; // item not found
        return {
          ...prev,
          [activeContainerKey]: arrayMove(containerItems, oldIndex, newIndex),
        };
      });
    } 
    // Handle moving to a different container
    else {
      setContainers(prev => {
        const sourceItems = prev[activeContainerKey];
        const destinationItems = prev[overContainerKey];
        
        const sourceIndex = sourceItems.findIndex(item => item.id === activeId);
        if (sourceIndex === -1) return prev; // item not found

        const itemToMove = sourceItems[sourceIndex];

        // Find where to insert in the destination
        const destinationIndex = overId in prev 
            ? destinationItems.length 
            : destinationItems.findIndex(item => item.id === overId);

        const newSourceItems = sourceItems.filter(item => item.id !== activeId);
        const newDestinationItems = [...destinationItems];
        // If overId is an item, insert before it. Otherwise, append.
        const finalDestinationIndex = destinationIndex >= 0 ? destinationIndex : newDestinationItems.length;
        newDestinationItems.splice(finalDestinationIndex, 0, itemToMove);
        
        return {
          ...prev,
          [activeContainerKey]: newSourceItems,
          [overContainerKey]: newDestinationItems,
        };
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Card className="space-y-4">
        <CardHeader>
          <CardTitle className="text-center text-base md:text-lg">Drag-and-Drop: Choose the Right Metrics</CardTitle>
          <p className="text-center text-sm text-muted-foreground" id="metric-instructions">
            For an AI email assistant, drag these metrics into the correct category.
          </p>
        </CardHeader>
        <CardContent>
        <div id="unassigned" className="p-4 bg-muted rounded-lg border" aria-describedby="metric-instructions">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center"><BarChart2 className="w-5 h-5 mr-2 text-primary" aria-hidden="true" />Metrics Pool</h4>
          <SortableContext items={containers.unassigned.map(i => i.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {containers.unassigned.map(item => <SortableItem key={item.id} id={item.id} text={item.text} />)}
            </div>
          </SortableContext>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <DropZone containerId="highSignal" title="High Signal Metrics" items={containers.highSignal} icon={<TrendingUp className="w-5 h-5 mr-2 text-green-500" aria-hidden="true" />} />
          <DropZone containerId="lowSignal" title="Low Signal / Vanity Metrics" items={containers.lowSignal} icon={<TrendingDown className="w-5 h-5 mr-2 text-red-500" aria-hidden="true" />} />
        </div>
        </CardContent>
      </Card>
    </DndContext>
  );
};

export default MetricSorter;

