export function Stepper({steps, currentStep, completedSteps, onStepChange})
{
    return (
        <nav className="stepper" aria-label="Etapes de création du CV">
            <ol className="stepper-list">
                {steps.map((step, index) => {
                    
                    const previousStep = steps[index - 1];
                    const isCompleted = completedSteps[step];
                    const   isLocked = index > 0 && !completedSteps[previousStep];

                    return (
                    <li className={`stepper-item ${isCompleted ? 'stepper-item-completed' : ''}`} key={step}>
                        <button className="stepper-button" type="button" onClick={() => onStepChange(index)} aria-current={currentStep === index ? 'step' : undefined} disabled={isLocked}>
                            <span className="step-number" >{isCompleted ? '✓' : index + 1}</span>
                            <span className="step-label" >{step}</span>
                        </button>
                    </li>
                    )
                })}
            </ol>
        </nav>
    );
}