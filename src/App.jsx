import { useState } from 'react'
import { Header } from './components/Header'
import { Stepper } from './components/Stepper'
import { EditorPanel } from './components/EditorPanel'
import { CVPreview } from './components/CVPreview'

const steps = ["Profil", "Formation", "Experience", "Finalisation"];

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <main>
      <h1>Créer votre CV</h1>
      <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep}/>
      <section>
        <h2>{steps[currentStep]}</h2>
        <p>Contenu de l'étape {currentStep + 1}</p>
      </section>
    </main>
  );
}

export default App
