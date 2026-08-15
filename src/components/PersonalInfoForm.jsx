export function PersonalInfoForm({personalInfo, onChange})
{
    return (
        <div className="profile-form">
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
        </div>
    );
}