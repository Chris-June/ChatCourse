/**
 * @file SettingsModal.tsx
 * @description A modal component for displaying and managing user settings.
 */

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  Label,
  Textarea,
} from '@chat/ui';
import { useChatStore } from '../store/chat';
import { models, modelFamilies } from '@/lib/models';



const SettingsModal = () => {
  const { isSettingsOpen, toggleSettings, model, setModel, customInstructions, setCustomInstructions } = useChatStore();

    return (
    <Dialog open={isSettingsOpen} onOpenChange={toggleSettings}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="model-select" className="text-sm font-medium text-gray-300">
              Model
            </label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model-select" className="w-[180px] bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-gray-100 max-h-[400px]">
                {modelFamilies.map((family) => (
                  <SelectGroup key={family}>
                    <SelectLabel className="px-2 py-1.5 text-xs font-semibold text-gray-400">{family}</SelectLabel>
                    {models
                      .filter((m) => m.family === family)
                      .map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{m.name}</span>
                            <span className="text-xs text-gray-400 ml-4">
                              {m.context} | In: ${m.inputCost.toFixed(2)} Out: ${m.outputCost.toFixed(2)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-instructions" className="text-sm font-medium text-gray-300">
              Custom Instructions
            </Label>
            <Textarea
              id="custom-instructions"
              placeholder="Enter custom instructions to guide the AI's behavior..."
              value={customInstructions}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomInstructions(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus:ring-zinc-600"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={toggleSettings}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
