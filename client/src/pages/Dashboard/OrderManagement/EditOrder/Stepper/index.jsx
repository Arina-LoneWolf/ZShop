import './Stepper.scss';
import React from 'react';

function Stepper({ steps, currentStep }) {
  const progressWidth = (100 / (steps.length - 1)).toFixed(5);

  return (
    <div className="stepper">
      <div className="step-progress-wrapper">
        {steps.map(step => (
          <div
            className={step.stepNumber <= currentStep ? "progress-bar active" : "progress-bar"}
            style={{ width: `${progressWidth}%` }}
          />
        ))}
      </div>

      <div className="step-point-wrapper">
        {steps.map(step => (
          <div className="step-point">
            <div className={step.stepNumber <= currentStep ? "step-number active" : "step-number"}>{step.stepNumber + 1}</div>
            <div className={step.stepNumber <= currentStep ? "step-description active" : "step-description"}>{step.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stepper;