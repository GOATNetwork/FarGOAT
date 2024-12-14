'use client';

import { useProjectForm } from '../../../hooks/genesis-form-context';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function ProjectLogo() {
    const { formState, updateFormState } = useProjectForm();

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            updateFormState({ logo: e.target.files[0] });
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="logo" className="text-lg font-semibold">
                    Project Logo
                </Label>
                <Input
                    id="logo"
                    type="file"
                    onChange={handleLogoChange}
                    accept="image/*"
                    required
                    className="transition duration-300 ease-in-out hover:bg-primary-100 focus:ring-2 focus:ring-primary-500"
                />
            </div>
            {formState.logo && (
                <div className="mt-4 flex justify-center items-center transition-all duration-300 ease-in-out">
                    <img
                        src={URL.createObjectURL(formState.logo)}
                        alt="Project Logo Preview"
                        className="w-32 h-32 object-contain border-2 border-gray-300 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
                    />
                </div>
            )}
        </div>
    );
}
