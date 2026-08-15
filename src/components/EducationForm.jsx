export function EducationForm({education, onChange, onSubmit})
{
    return (
        <form className="form-grid" onSubmit={onSubmit}>
            
            <div className="form-field form-field-full">
                <label htmlFor="school">Etablissement</label>
                <input id="school" name="school" type="text" value={education.school} onChange={onChange} placeholder="ESCP Business School"/>
            </div>

            <div className="form-field form-field-full">
                <label htmlFor="degree">Diplôme ou formation</label>
                <input id="degree" name="degree" type="text" value={education.degree} onChange={onChange} placeholder="Master in Management"/>
            </div>

            <div className="form-field">
                <label htmlFor="educationStartDate">Date de début</label>
                <input id="educationStartDate" name="startDate" type="month" value={education.startDate} onChange={onChange} />
            </div>

            <div className="form-field">
                <label htmlFor="educationEndDate">Date de fin</label>
                <input id="educationEndDate" name="endDate" type="month" value={education.endDate} onChange={onChange} />
            </div>

            <div className="form-actions form-field-full">
                <button className="primary-button" type="submit">
                    Enregistrer et continuer
                    <span aria-hidden="true">→</span>
                </button>
            </div>
        </form>
    );
}