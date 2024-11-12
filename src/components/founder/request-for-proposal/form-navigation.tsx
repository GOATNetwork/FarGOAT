'use client';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';

interface FormNavigationProps {
    step: number;
    onNext: () => void;
    onPrev: () => void;
    onSubmit: () => void;
}

export function FormNavigation({ step, onNext, onPrev, onSubmit }: FormNavigationProps) {
    return (
        <CardFooter className="flex justify-between p-4 bg-gray-100 rounded-lg shadow-md animate-fadeIn">
            {step > 1 && (
                <Button 
                    onClick={onPrev} 
                    variant="outline" 
                    className="transition-all duration-300 transform hover:bg-gray-200 hover:scale-105 flex items-center space-x-2 p-3"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span>Previous</span>
                </Button>
            )}
            {step < 3 ? (
                <Button 
                    onClick={onNext} 
                    className="ml-auto transition-all duration-300 transform hover:bg-blue-600 hover:scale-105 flex items-center space-x-2 p-3 text-white bg-blue-500 border border-transparent rounded-md"
                >
                    <span>Next</span> 
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button 
                    type="submit" 
                    onClick={onSubmit} 
                    className="ml-auto transition-all duration-300 transform hover:bg-green-600 hover:scale-105 flex items-center space-x-2 p-3 text-white bg-green-500 border border-transparent rounded-md"
                >
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Create Project</span>
                </Button>
            )}
        </CardFooter>
    );
}
