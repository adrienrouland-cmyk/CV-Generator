export function ExperienceForm({experiences, onChange, onAdd, onDelete, onSubmit})
{
    return (
        <form className="form-grid" onSubmit={onSubmit}>
            <div className="education-list">

                {experiences.map((experience, index) => (

                    <fieldset className="education-card" key={experience.id}>

                        <legend>Experience {index + 1}</legend>
    
                        <button className="delete-button" type="button" onClick={() => onDelete(experience.id)} aria-label={`Supprimer l'expérience ${index + 1}`}>Supprimer</button>

                        <div className="form-field form-field-full">
                            <label htmlFor={`${experience.id}-company`}>Entreprise</label>
                            <input id={`${experience.id}-company`} name="company" type="text" value={experience.company} onChange={(event) => onChange(experience.id, event)} placeholder="Vocca"/>
                        </div>

                        <div className="form-field form-field-full">
                            <label htmlFor={`${experience.id}-job`}>Job</label>
                            <input id={`${experience.id}-job`} name="job" type="text" value={experience.job} onChange={(event) => onChange(experience.id, event)} placeholder="Product Manager"/>
                        </div>

                        <div className="form-field form-field-full">
                            <label htmlFor={`${experience.id}-startDate`}>Start Date</label>
                            <input id={`${experience.id}-startDate`} name="startDate" type="month" value={experience.startDate} onChange={(event) => onChange(experience.id, event)}/>
                        </div>

                        <div className="form-field form-field-full">
                            <label htmlFor={`${experience.id}-endDate`}>End Date</label>
                            <input id={`${experience.id}-endDate`} name="endDate" type="month" value={experience.endDate} onChange={(event) => onChange(experience.id, event)}/>
                        </div>

                        <div className="form-field form-field-full">
                            <label htmlFor={`${experience.id}-responsibilities`}>Responsabilités</label>
                            <textarea id={`${experience.id}-responsibilities`} name="responsibilities" value={experience.responsibilities} onChange={(event) => onChange(experience.id, event)} placeholder="Décrivez vos missions et réalisations principales" rows="5"/>
                        </div>

                    </fieldset>

                ))}
            </div>

            <div className="education-actions form-field-full">

                <button className="secondary-button" type="button" onClick={onAdd}>+ Ajouter une expérience</button>

                <button className="primary-button" type="submit">
                    Enregistrer et continuer
                    <span aria-hidden="true">→</span>
                </button>

            </div>
        </form>
    );
}