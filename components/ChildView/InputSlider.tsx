import { useEffect, useState } from 'react';
import "./style.scss";

const InputSlider: React.FC = () => {
    const [sliderValue, setSliderValue] = useState<number>(0);

    useEffect(() => {
        const rangeSlider = document.getElementById("rs-range-line");
        const rangeBullet = document.getElementById("rs-bullet");

        const showSliderValue = () => {
            if (rangeSlider && rangeBullet) {
                rangeBullet.innerHTML = rangeSlider.value;
                const bulletPosition = rangeSlider.value / rangeSlider.max;
                rangeBullet.style.left = `${bulletPosition * 78}px`;
            }
        };

        rangeSlider?.addEventListener("input", showSliderValue);

        // Cleanup function to remove event listener
        return () => {
            rangeSlider?.removeEventListener("input", showSliderValue);
        };
    }, []); // Empty dependency array ensures the effect runs only once

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
