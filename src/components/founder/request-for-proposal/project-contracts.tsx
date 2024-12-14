'use client';

import { useProjectForm } from '../../../hooks/genesis-form-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

export function ProjectContracts() {
    const { formState, updateFormState } = useProjectForm();

    const handleAddAbi = () => {
        updateFormState({
            abiList: [...formState.abiList, { abi: '', contractAddress: '', contractName: '' }],
        });
    };

    const handleRemoveAbi = (index: number) => {
        updateFormState({
            abiList: formState.abiList.filter((_, i) => i !== index),
        });
    };

    const handleAbiChange = (index: number, field: 'abi' | 'contractAddress' | 'contractName', value: string) => {
        const newAbiList = formState.abiList.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        updateFormState({ abiList: newAbiList });
    };

    return (
        <div className="space-y-6">
            <Label className="text-lg font-semibold">ABI and Contract Address</Label>
            {formState.abiList.map((item, index) => (
                <div key={index} className="flex gap-4 items-center transition-all duration-300 ease-in-out">
                    <Input 
                        value={item.contractName}
                        onChange={(e) => handleAbiChange(index, 'contractName', e.target.value)}
                        placeholder="Contract Name"
                        required
                        className="transition duration-300 ease-in-out border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-300"
                    />
                    <Input 
                        type="file" 
                        onChange={(e) => handleAbiChange(index, 'abi', e.target.value)} 
                        accept=".json" 
                        required 
                        className="transition duration-300 ease-in-out border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-300"
                    />
                    <Input 
                        value={item.contractAddress} 
                        onChange={(e) => handleAbiChange(index, 'contractAddress', e.target.value)} 
                        placeholder="Contract Address" 
                        required 
                        className="transition duration-300 ease-in-out border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-300"
                    />
                    <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => handleRemoveAbi(index)} 
                        disabled={formState.abiList.length === 1}
                        className="transition-transform duration-300 ease-in-out transform hover:scale-110 disabled:opacity-50"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove ABI</span>
                    </Button>
                </div>
            ))}
            <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddAbi}
                className="transition duration-300 ease-in-out hover:bg-primary hover:text-white"
            >
                <Plus className="mr-2 h-4 w-4" /> Add Another ABI
            </Button>
        </div>
    );
}
