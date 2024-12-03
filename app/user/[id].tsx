import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile, ProfileData } from '../firebase/config';

const UserProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getUserProfile(id as string).then(profileData => {
                setProfile(profileData);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>No profile found.</div>;
    }

    return (
        <div>
            <h1>{profile.displayname}</h1>
            <p>Email: {profile.email}</p>
            <p>Bio: {profile.bio}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default UserProfile;