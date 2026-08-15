export function Stepper({steps, currentStep, onStepChange})
{
    return (
        <nav className="stepper" aria-label="Etapes de création du CV">
            <ol className="stepper-list">
                {steps.map((step, index) => {
                    return (
                    <li className="stepper-item" key={step}>
                        <button className="stepper-button" type="button" onClick={() => onStepChange(index)} aria-current={currentStep === index ? 'step' : undefined}>
                            <span className="step-number" >{index + 1}</span>
                            <span className="step-label" >{step}</span>
                        </button>
                    </li>
                    )
                })}
            </ol>
        </nav>
    );
}