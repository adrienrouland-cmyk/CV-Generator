export function EducationForm({education, onChange})
{
    return (
        <form className="form-grid">
            
            <div className="form-field form-field-full">
                <label htmlFor="school">Etablissement</label>
                <input id="school" name="school" type="text" value={education.school} onChange={onChange} placeholder="ESCP Business School"/>
            </div>

            <div className="form-field form-field-full">
                <label htmlFor="degree">Diplôme ou formation</label>
                <input id="degree" name="degree" type="text" value={education.degree} onChange={onChange} placeholder="Master in Management"/>
            </div>
        </form>
    );
}