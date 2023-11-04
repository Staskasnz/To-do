import './OverlayColor.css'


function OverlayColor({ numberOverlayColor }) {

    return (
        <div className={`overlay overlay__color-${numberOverlayColor}`}></div>
    );
}

export default OverlayColor;
