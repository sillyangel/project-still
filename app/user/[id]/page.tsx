'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserProfile, ProfileData, auth, db } from '../../firebase/config';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { allArtists } from '@/app/data/artists';
import { ArtistIcon } from '@/app/components/artist-icon';
import { Separator } from '@/components/ui/separator';

interface Artist {
  name: string;
  pictureurl: string;
}

const UserProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isFollowingUser, setIsFollowingUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [followingArtists, setFollowingArtists] = useState<Artist[]>([]);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const profileData = await getUserProfile(id as string);
                setProfile(profileData);
                setLoading(false);
            }
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setIsFollowingUser(userData.follows && profile?.id && userData.follows[profile.id] === true);

                    const follows = userData.follows || {};
                    const followedArtistNames = Object.keys(follows).filter(artist => follows[artist]);
                    const followedArtists = allArtists.filter(artist => followedArtistNames.includes(artist.name));
                    setFollowingArtists(followedArtists);
                }
            }
        };
        fetchData();
    }, [id, user]);

    const handleFollowUser = async () => {
        if (user && profile) {
          const userRef = doc(db, 'users', user.uid);
          if (isFollowingUser) {
            await setDoc(userRef, {
              follows: {
                [profile.id]: false
              }
            }, { merge: true });
            setIsFollowingUser(false);
          } else {
            await setDoc(userRef, {
              follows: {
                [profile.id]: true
              }
            }, { merge: true });
            setIsFollowingUser(true);
          }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>No profile found.</div>;
    }

    return (
        <>
        <div className="space-y-4">
            {profile && (
                <div className="relative bg-cover bg-center h-48" style={{ backgroundImage: `url(${profile.pictureurl || '/default-user.jpg'})` }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional overlay for better contrast */}
                    <div className="relative flex items-center justify-between space-x-8 p-8">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 bg-cover bg-center rounded-full"
                                    style={{ backgroundImage: `url(${profile.pictureurl || '/default-user.jpg'})`, filter: 'blur(22px)' }}
                                ></div>
                                <Image 
                                    src={profile.pictureurl || '/default-user.jpg'} 
                                    alt={profile.displayname} 
                                    width={100} 
                                    height={100}
                                    className="relative rounded-full border-4 border-white shadow-lg"
                                />
                            </div>
                            <p className="text-2xl font-semibold tracking-tight text-white">{profile.displayname}</p>
                        </div>
                        <div className="ml-auto">
                            <Button onClick={handleFollowUser}>
                                <Heart />
                                {isFollowingUser ? 'Unfollow' : 'Follow'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <div className="h-full px-4 lg:px-8">
                <div className="flex space-x-4 pb-4 pt-3">
                    <p className="text-xl">{profile.bio}</p>
                </div>
            </div>
            <div className="h-full px-4 lg:px-8">
                <div className="space-y-1">
                    <p className="text-2xl font-semibold tracking-tight">
                        Following Artists
                    </p>
                </div>
                <Separator className="my-4" />
                <ScrollArea>
                    <div className="flex space-x-4 pb-4 pt-3">
                        {followingArtists.map((artist) => (
                            <ArtistIcon
                                key={artist.name}
                                artist={artist}
                                className="w-[150px]"
                                width={150}
                                height={150}
                            />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
        </>
    );
};

export default UserProfile;