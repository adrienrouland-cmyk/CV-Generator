export function PersonalInfoForm({personalInfo, onChange, onSubmit})
{
    return (
        <form className="profile-form" onSubmit={onSubmit}>
            <div className="form-field">
                <label htmlFor="firstName">Prénom</label>
                <input id="firstName" type="text" name="firstName" value={personalInfo.firstName} onChange={onChange} placeholder="Adrien" autoComplete="given-name"/>
            </div>
            <div className="form-field">
                <label htmlFor="lastName">Nom</label>
                <input id="lastName" type="text" name="lastName" value={personalInfo.lastName} onChange={onChange} placeholder="Devienne" autoComplete="family-name"/>
            </div>
            <div className="form-field">
                <label htmlFor="email">Adresse e-mail</label>
                <input id="email" type="email" name="email" value={personalInfo.email} onChange={onChange} placeholder="adrien@gmail.com" autoComplete="email"/>
            </div>
            <div className="form-field">
                <label htmlFor="phone">Téléphone</label>
                <input id="phone" type="tel" name="phone" value={personalInfo.phone} onChange={onChange} placeholder="06 12 34 56 78" autoComplete="tel"/>
            </div>
            <div className="form-field form-field-full">
                <label htmlFor="jobTitle">Poste recherché</label>
                <input id="jobTitle" type="text" name="jobTitle" value={personalInfo.jobTitle} onChange={onChange} placeholder="Product Manager"/>
            </div>
            <div className="form-field form-field-full">
                <label htmlFor="location">Localisation</label>
                <input id="location" type="text" name="location" value={personalInfo.location} onChange={onChange} placeholder="Paris, France" autoComplete="address-level2"/>
            </div>
            <div className="form-field form-field-full">
                <label htmlFor="summary">Résumé profesionnel</label>
                <textarea id="summary" name="summary" value={personalInfo.summary} onChange={onChange} placeholder="Présentez brièvement votre parcours, vos compétences et vos objectifs" rows="5" maxLength="400"/>
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