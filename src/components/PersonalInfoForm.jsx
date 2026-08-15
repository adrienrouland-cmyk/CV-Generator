export function PersonalInfoForm({personalInfo, onChange})
{
    return (
        <div className="profile-form">
            <div className="form-field">
                <label htmlFor="firstName">Prénom</label>
                <input id="firstName" type="text" name="firstName" value={personalInfo.firstName} onChange={onChange} placeholder="Adrien" autoComplete="given-name"/>

                <label htmlFor="lastName">Nom</label>
                <input id="lastName" type="text" name="lastName" value={personalInfo.lastName} onChange={onChange} placeholder="Devienne" autoComplete="family-name"/>
            </div>
        </div>
    );
}