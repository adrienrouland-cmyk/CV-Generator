import { useState } from 'react'
import { Header } from './components/Header'
import { Stepper } from './components/Stepper'
import { EditorPanel } from './components/EditorPanel'
import { CVPreview } from './components/CVPreview'
import { PersonalInfoForm } from './components/PersonalInfoForm'
import { EducationForm } from './components/EducationForm'
import { ExperienceForm } from './components/ExperienceForm'
import { FinalReview } from './components/FinalReview'
import './App.css'
import "./styles/print.css"

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

function createEmptyEducation() {
  return {
    id: crypto.randomUUID(),
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
  };
}

function createEmptyExperience() {
  return {
    id: crypto.randomUUID(),
    company: '',
    job: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
  };
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [completedSteps, setCompletedSteps] = useState({
    Profil:false,
    Formation:false,
    Experience:false,
    Finalisation:false,
  });
  const [educations, setEducations] = useState(() => [createEmptyEducation(),]);
  const [experiences, setExperiences] = useState(() => [createEmptyExperience(), ]);

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

  function handleEducationChange(educationId, event) {
    const {name, value} = event.target;

    setEducations((previousEducations) => previousEducations.map((education) => 
      education.id === educationId ? {
        ...education, [name]:value,
      } : education,),
    )}

    function handleAddEducation() {
      setEducations((previousEducations) => [
        ...previousEducations, createEmptyEducation(),
      ])
    }

  function handleEducationSubmit(event) {
    event.preventDefault();

    setCompletedSteps((previousSteps) => ({
      ...previousSteps, Formation:true,
    }));

    setCurrentStep(2);
  }

  function handleDeleteEducation(educationId) {
    setEducations((previousEducations) => previousEducations.filter(
      (education) => education.id !== educationId,
    ),
    )}

  function handleExperienceChange(experienceId, event) {
    const {name, value} = event.target;

    setExperiences((previousExperiences) => previousExperiences.map((experience) =>
      experience.id === experienceId ? {...experience, [name]: value} : experience));
  }

  function handleAddExperience() {
    setExperiences((previousExperiences) => [...previousExperiences, createEmptyExperience(),]);
  }

  function handleDeleteExperience(experienceId) {
    setExperiences((previousExperiences) => previousExperiences.filter((experience) => experience.id !== experienceId));
  }

  function handleExperienceSubmit(event){
    event.preventDefault();

    setCompletedSteps((previousSteps) => ({...previousSteps, Experience:true}));

    setCurrentStep(3);
  }

  function handleFinalize() {
    setCompletedSteps((previousSteps) => ({
      ...previousSteps, Finalisation:true,
    }))
  }

  function handlePrint() {
    window.print();
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
          <EducationForm educations={educations} onChange={handleEducationChange} onAdd={handleAddEducation} onDelete={handleDeleteEducation} onSubmit={handleEducationSubmit}/>
        ) : null}

        {currentStep === 2 ? (
          <ExperienceForm experiences={experiences} onChange={handleExperienceChange} onAdd={handleAddExperience} onDelete={handleDeleteExperience} onSubmit={handleExperienceSubmit}/>
        ) : null}

        {currentStep === 3 ? (
          <div className='finalization-layout'>
            <FinalReview personalInfo={personalInfo} educations={educations} experiences={experiences} isFinalized={completedSteps.Finalisation} onEdit={setCurrentStep} onFinalize={handleFinalize} onPrint={handlePrint}/>
            <CVPreview personalInfo={personalInfo} educations={educations} experiences={experiences}/>
          </div>
        ) : null}

      </section>
    </main>
  );
}

export default App
