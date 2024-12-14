'use client';

import { useProjectForm } from '../../../hooks/genesis-form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { TAGS } from '@/constants/genesis';

export function ProjectBasicInfo() {
    const { formState, updateFormState } = useProjectForm();

    const handleTagSelection = (tag: string) => {
        const currentTags = formState.tags || [];
        if (currentTags.includes(tag)) {
            updateFormState({ tags: currentTags.filter((t) => t !== tag) });
        } else if (currentTags.length < 3) {
            updateFormState({ tags: [...currentTags, tag] });
        }
    };

    return (
        <div className="space-y-6">
            {/* Project Name Input */}
            <div className="space-y-2">
                <Label htmlFor="projectName" className="text-lg font-semibold">Project Name</Label>
                <Input
                    id="projectName"
                    value={formState.projectName}
                    onChange={(e) => updateFormState({ projectName: e.target.value })}
                    placeholder="Enter project name"
                    required
                    className="transition duration-300 ease-in-out border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-300"
                />
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
                <Textarea
                    id="description"
                    value={formState.description}
                    onChange={(e) => updateFormState({ description: e.target.value })}
                    placeholder="Describe your project"
                    required
                    className="transition duration-300 ease-in-out border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-300"
                />
            </div>

            {/* Website Input */}
            <div className="space-y-2">
                <Label htmlFor="website" className="text-lg font-semibold">Website</Label>
                <Input
                    id="website"
                    type="url"
                    value={formState.website}
                    onChange={(e) => updateFormState({ website: e.target.value })}
                    placeholder="https://yourproject.com"
                    required
                    className="transition duration-300 ease-in-out border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-300"
                />
            </div>

            {/* Tags Selection */}
            <div className="space-y-2">
                <Label htmlFor="tags" className="text-lg font-semibold">Tags (Select up to 3)</Label>
                <div className="flex flex-wrap gap-2">
                    {TAGS.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagSelection(tag)}
                            className={cn(
                                'px-4 py-2 rounded-full text-sm border transition duration-300 ease-in-out',
                                formState.tags?.includes(tag)
                                    ? 'bg-primary text-white border-primary hover:bg-primary-dark'
                                    : 'bg-background hover:bg-accent',
                                formState.tags?.length === 3 && !formState.tags?.includes(tag)
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:border-accent'
                            )}
                            disabled={formState.tags?.length === 3 && !formState.tags?.includes(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
