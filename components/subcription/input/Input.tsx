// "use client"
// import { useEffect, useState } from "react"
// import "./style.css"
// import { currentPointState } from "@/atoms/pointAtom"
// import { useRecoilState } from "recoil"

// const Input = () => {
//     const [rangeValue, setRangeValue] = useRecoilState(currentPointState)

//     const debounce = (func, wait) => {
//         let timeout;

//         return function (...args) {
//             const later = () => {
//                 clearTimeout(timeout);
//                 func(...args)
//             }
//             clearTimeout(timeout);
//             timeout = setTimeout(later, wait);
//         }
//     }

//     useEffect(() => {
//         const rangeSlider = document.getElementById("rs-range-line");
//         const rangeBullet = document.getElementById("rs-bullet");

//         if (rangeSlider) {
//             rangeSlider.addEventListener("input", showSliderValue, false);
//         }

//         function showSliderValue() {
//             rangeBullet.innerHTML = rangeSlider.value;
//             const bulletPosition = (rangeSlider.value / rangeSlider.max);
//             rangeBullet.style.left = (bulletPosition * 335) + "px";
//             debounce(setRangeValue(rangeSlider.value), 1000)
//         }

//         // Cleanup function to remove event listeners
//         return () => {
//             if (rangeSlider) {
//                 rangeSlider.removeEventListener("input", showSliderValue, false);
//             }
//         };
//     }, []);

//     console.log(rangeValue)
//     return (
//         <div className="container w12/12 ">
//             <div className="range-slider ">
//                 <span id="rs-bullet" className="rs-label">0</span>
//                 <input id="rs-range-line" className="rs-range" type="range" defaultValue="0" min="0" max="100" />
//             </div>
//             <div className="box-minmax">
//                 <span>0</span><span>100</span>
//             </div>
//         </div>
//     );
// }

// export default Input;