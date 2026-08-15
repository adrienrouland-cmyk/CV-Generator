export function EducationForm({educations, onChange, onAdd, onSubmit})
{
    return (
        <form className="form-grid" onSubmit={onSubmit}>

            <div className="education-list">
                {educations.map((education, index) => (
                    <fieldset className="education-card" key={education.id}>
                        
                        <legend>Formation {index + 1}</legend>

                        <div className="form-field form-field-full">
                            <label htmlFor={`${education.id}-school`}>Etablissement</label>
                            <input id={`${education.id}-school`} name="school" type="text" value={educations.school} onChange={(event) => onChange(education.id, event)} placeholder="ESCP Business School"/>
                        </div>

                        <div className="form-field form-field-full">
                            <label htmlFor={`${education.id}-degree`}>Diplôme ou formation</label>
                            <input id={`${education.id}-degree`} name="degree" type="text" value={educations.degree} onChange={(event) => onChange(education.id, event)} placeholder="Master in Management"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor={`${education.id}-startDate`}>Date de début</label>
                            <input id={`${education.id}-startDate`} name="startDate" type="month" value={educations.startDate} onChange={(event) => onChange(education.id, event)} />
                        </div>

                        <div className="form-field">
                            <label htmlFor={`${education.id}-endDate`}>Date de fin</label>
                            <input id={`${education.id}-endDate`} name="endDate" type="month" value={educations.endDate} onChange={(event) => onChange(education.id, event)} />
                        </div>

                    </fieldset>
                
                ))}
            </div>

            <div className="education-actions form-field-full">

                <button className="secondary-button" type="button" onClick={onAdd}>+ Ajouter une formation</button>

                <button className="primary-button" type="submit">
                    Enregistrer et continuer
                    <span aria-hidden="true">→</span>
                </button>
            </div>
        </form>
    );
}