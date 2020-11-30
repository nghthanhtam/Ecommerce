import {
    Ball8bits,
    BallClipRotate,
    BallClipRotateMultiple,
    BallClipRotatePulse,
    BallAtom,
    BallBeat,
    BallCircus,
    BallClimbingDot,
    BallElasticDots,
    BallFall,
    BallFussion,
    BallGridBeat,
    BallGridPulse,
    BallNewtonCradle,
    BallPulse,
    BallPulseRise,
    BallPulseSync,
    BallRotate,
    BallRunningDots,
    BallScale,
    BallScaleMultiple,
    BallScalePulse,
    BallScaleRipple,
    BallScaleRippleMultiple,
    BallSpin,
    BallSpinClockWise
} from "react-pretty-loading";
import React from "react";

class Loading extends React.Component {
    render() {
        return (
            <div className="modal-wrapper">
                <BallClimbingDot loading center width="100" />
            </div>
        );
    }
}

export default Loading;