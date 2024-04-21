"use client"
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('./DynamicMap'), {
    ssr: false
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 300;

const Map = (props) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
    return (
        <div style={{ aspectRatio: width / height }}>
            <DynamicMap {...props} />
        </div>
    )
}

export default Map