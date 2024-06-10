"use client"
import { useEffect } from "react"
import "./style.css"

const Input = () => {
    useEffect(() => {
        const rangeSlider = document.getElementById("rs-range-line");
        const rangeBullet = document.getElementById("rs-bullet");

        if (rangeSlider) {
            rangeSlider.addEventListener("input", showSliderValue, false);
        }

        function showSliderValue() {
            rangeBullet.innerHTML = rangeSlider.value;
            const bulletPosition = (rangeSlider.value / rangeSlider.max);
            rangeBullet.style.left = (bulletPosition * 320) + "px";
        }

        // Cleanup function to remove event listeners
        return () => {
            if (rangeSlider) {
                rangeSlider.removeEventListener("input", showSliderValue, false);
            }
        };
    }, []);

    return (
        <div className="container w12/12 ">
            <div className="range-slider ">
                <span id="rs-bullet" className="rs-label">0</span>
                <input id="rs-range-line" className="rs-range" type="range" defaultValue="0" min="0" max="100" />
            </div>
            <div className="box-minmax">
                <span>0</span><span>100</span>
            </div>
        </div>
    );
}

export default Input;