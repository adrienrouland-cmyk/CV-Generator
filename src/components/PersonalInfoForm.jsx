export function PersonalInfoForm({personalInfo, onChange})
{
    return (
        <div className="profile-form">
            <label>Prénom
                <input type="text" name="firstName" value={personalInfo.firstName} onChange={onChange} placeholder="Adrien" />
            </label>

            <label> Nom
                <input type="text" name="lastName" value={personalInfo.lastName} onChange={onChange} placeholder="Devienne" />
            </label>
        </div>
    );
}