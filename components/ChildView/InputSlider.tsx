import { useEffect, useState } from 'react';
import "./style.scss";
import { useSession } from 'next-auth/react';

const InputSlider: React.FC = () => {
    const [sliderValue, setSliderValue] = useState<number>(0);


    useEffect(() => {
        const rangeSlider = document.getElementById("rs-range-line");
        const rangeBullet = document.getElementById("rs-bullet");

        const showSliderValue = () => {
            if (rangeSlider && rangeBullet) {
                //@ts-ignore
                rangeBullet.innerHTML = rangeSlider.value;
                //@ts-ignore
                const bulletPosition = rangeSlider.value / rangeSlider.max;
                rangeBullet.style.left = `${bulletPosition * 78}px`;
            }
        };
        rangeSlider?.addEventListener("input", showSliderValue);
        // Cleanup function to remove event listener
        return () => {
            rangeSlider?.removeEventListener("input", showSliderValue);
        };
    }, []);

    const { data: session } = useSession()

    useEffect(() => {
        if (session?.user?.image) {
            document.documentElement.style.setProperty('--session-image', `url(https://res.cloudinary.com/du5poiq3l/image/upload/v1712149065/rqmbrjnkdfiomjvl17xb.png)`);
        } else {
            document.documentElement.style.setProperty('--session-image', 'none');
        }
    }, [session?.user?.image])

    return (
        <div className="container">
            <div className="range-slider">
                <input
                    id="rs-range-line"
                    className="rs-range"
                    type="range"
                    value={sliderValue}
                    min={0}
                    max={100}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                />
            </div>
        </div>
    );
};

export default InputSlider;
