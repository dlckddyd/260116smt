
import React, { useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Lazy Load Service Components
const PlaceMarketing = lazy(() => import('./services/PlaceMarketing'));
const ClipMarketing = lazy(() => import('./services/ClipMarketing'));
const YoutubeMarketing = lazy(() => import('./services/YoutubeMarketing'));
const InstagramMarketing = lazy(() => import('./services/InstagramMarketing'));
const ExperienceMarketing = lazy(() => import('./services/ExperienceMarketing'));

const ServiceDetail: React.FC = () => {
    const { type } = useParams<{ type: string }>();

    // Scroll to top on type change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    const renderService = () => {
        switch (type) {
            case 'place':
                return <PlaceMarketing />;
            case 'clip':
                return <ClipMarketing />;
            case 'youtube':
                return <YoutubeMarketing />;
            case 'instagram':
                return <InstagramMarketing />;
            case 'experience':
                return <ExperienceMarketing />;
            default:
                // Fallback: Redirect to place or show 404 behavior (showing Place for now)
                return <PlaceMarketing />;
        }
    };

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
        }>
            {renderService()}
        </Suspense>
    );
};

export default ServiceDetail;
