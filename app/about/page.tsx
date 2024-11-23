'use client';

import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
    return (
        <div className="h-full px-4 py-6 lg:px-8">
            <div className="space-y-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">About Me</h2>
                    <p className="text-sm text-muted-foreground">
                        Learn more about the creator of this website.
                    </p>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                    <p className="text-base">
                        Welcome to my website! I am passionate about music and technology, and this platform is a culmination of my interests. Here, you can explore various albums and playlists curated just for you.
                    </p>
                    <p className="text-base">
                        I have always been fascinated by how music can bring people together and evoke emotions. Through this website, I aim to share my love for music with you and help you discover new tunes that youll love.
                    </p>
                    <p className="text-base">
                        Thank you for visiting, and I hope you enjoy your time here. Feel free to reach out if you have any questions or suggestions!
                    </p>
                </div>
            </div>
        </div>
    );
}