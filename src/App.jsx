import { useState } from 'react'
import { Header } from './components/Header'
import { Stepper } from './components/Stepper'
import { EditorPanel } from './components/EditorPanel'
import { CVPreview } from './components/CVPreview'
import './App.css'

const steps = ["Profil", "Formation", "Experience", "Finalisation"];

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <main className="app">
      <header className='page-header'>
        <p className='eyebrow'>Créateur de CV</p>
        <h1>Créer votre CV</h1>
        <p>Complétez chaque étape pour construire votre CV.</p>
      </header>

      <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep}/>
      
      <section className="step-content">
        <p className="eyebrow">Etape {currentStep + 1}</p>
        <h2>{steps[currentStep]}</h2>
        <p>Contenu de l'étape {currentStep + 1}</p>
      </section>
    </main>
  );
}

export default App
