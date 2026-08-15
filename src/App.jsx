import { useState } from 'react'
import { Header } from './components/Header'
import { Stepper } from './components/Stepper'
import { EditorPanel } from './components/EditorPanel'
import { CVPreview } from './components/CVPreview'
import { PersonalInfoForm } from './components/PersonalInfoForm'
import { EducationForm } from './components/EducationForm'
import './App.css'

const steps = ["Profil", "Formation", "Experience", "Finalisation"];
const initialPersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  jobTitle: '',
  location: '',
  summary: '',
}

const initialEducation = {
  school: '',
  degree: '',
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [completedSteps, setCompletedSteps] = useState({
    Profil:false,
    Formation:false,
    Experience:false,
    Finalisation:false,
  });
  const [education, setEducation] = useState(initialEducation);

  function handlePersonalInfoChange(event) {
    const {name, value} = event.target;

    setPersonalInfo((previousInfo) => ({
      ...previousInfo, 
      [name]: value,
    }))
  }

  function handleProfileSubmit(event) {
    event.preventDefault();

    setCompletedSteps((previousSteps) => ({
      ...previousSteps, Profil:true,
    }))

    setCurrentStep(1);
  }

  function handleEducationChange(event) {
    const {name, value} = event.target;

    setEducation((previousEducation) => ({
      ...previousEducation, [name]:value,
    }))
  }

  return (
    <main className="app">
      <header className='page-header'>
        <p className='eyebrow'>Créateur de CV</p>
        <h1>Créer votre CV</h1>
        <p>Complétez chaque étape pour construire votre CV.</p>
      </header>

      <Stepper steps={steps} currentStep={currentStep} completedSteps={completedSteps} onStepChange={setCurrentStep}/>
      
      <section className="step-content">
        <p className="eyebrow">Etape {currentStep + 1}</p>
        <h2>{steps[currentStep]}</h2>

        {currentStep === 0 ? (
          <PersonalInfoForm personalInfo={personalInfo} onChange={handlePersonalInfoChange} onSubmit={handleProfileSubmit}/>
        ) : null}

        {currentStep === 1 ? (
          <EducationForm education={education} onChange={handleEducationChange}/>
        ) : null}

        {currentStep > 1 && (
          <p>Contenu de l'étape {currentStep + 1}</p>
        )}

      </section>
    </main>
  );
}

export default App
