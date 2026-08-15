export function Stepper({steps, currentStep, onStepChange})
{
    return (
        <nav aria-label="Etapes de création du CV">
            <ol>
                {steps.map((step, index) => {
                    return (
                    <li key={step}>
                        <button type="button" onClick={() => onStepChange(index)} aria-current={currentStep === index ? 'step' : undefined}>
                            <span>{index + 1}</span>
                            <span>{step}</span>
                        </button>
                    </li>
                    )
                })}
            </ol>
        </nav>
    );
}