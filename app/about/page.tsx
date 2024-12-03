'use client';

import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
    return (
        <div className="h-full px-4 py-6 lg:px-8">
            <div className="space-y-6">
                <div className="space-y-1">
                    <p className="text-2xl font-semibold tracking-tight">About Me</p>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                    <p className="text-base">
                    </p>
                </div>
            </div>
        </div>
    );
}