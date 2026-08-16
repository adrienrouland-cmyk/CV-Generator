function displayValue(value)
{
    return value || "Non renseigné";
}

function displayPeriod(startDate, endDate)
{
    const start = startDate || "Date inconnue";
    const end = endDate || "En cours";

    return `${start} - ${end}`;
}

export function FinalReview({personalInfo, educations, experiences, isFinalized, onEdit, onFinalize})
{
    return (
        <div className="final-review">
            <section className="review-section">

                <div className="review-heading">
                    <div>
                        <p className="eyebrow">Informations générales</p>
                        <h3>{`${displayValue(personalInfo.firstName)} ${displayValue(personalInfo.lastName)}`}</h3>
                    </div>
                    <button className="secondary-button" type="button" onClick={() => onEdit(0)}>Modifier</button>
                </div>

                <div className="review-details">
                    <p>
                        <strong>Poste : </strong> {` ${displayValue(personalInfo.jobTitle)}`}
                    </p>

                    <p>
                        <strong>E-mail : </strong> {` ${displayValue(personalInfo.email)}`}
                    </p>

                    <p>
                        <strong>Téléphone : </strong> {` ${displayValue(personalInfo.phone)}`}
                    </p>

                    <p>
                        <strong>Localisation : </strong> {` ${displayValue(personalInfo.location)}`}
                    </p>

                    <p className="review-summary">
                        <strong>Résumé : </strong> {` ${displayValue(personalInfo.summary)}`}
                    </p>
                </div>
            </section>

            <section className="review-section">

                <div className="review-heading">
                    <div>
                        <p className="eyebrow">Parcours académique</p>
                        <h3>Formations</h3>
                    </div>

                    <button className="secondary-button" type="button" onClick={() => onEdit(1)}>Modifier</button>
                </div>

                <div className="review-list">
                    {educations.length === 0 ? (
                        <p className="empty-message">Aucune formation renseignée.</p>
                    ) : educations.map((education) => (
                        <article className="review-entry" key={education.id}>
                            <h4>{displayValue(education.degree)}</h4>
                            <p>{displayValue(education.school)}</p>
                            <span>{displayPeriod(education.startDate, education.endDate)}</span>
                        </article>
                    ))}
                </div>
            </section>

            <section className="review-section">
                <div className="review-heading">
                <div>
                    <p className="eyebrow">Parcours professionnel</p>
                    <h3>Expériences</h3>
                </div>

                <button
                    className="secondary-button"
                    type="button"
                    onClick={() => onEdit(2)}
                >
                    Modifier
                </button>
                </div>

                <div className="review-list">
                {experiences.length === 0 ? (
                    <p className="empty-message">
                    Aucune expérience renseignée.
                    </p>
                ) : (
                    experiences.map((experience) => (
                    <article
                        className="review-entry"
                        key={experience.id}
                    >
                        <h4>{displayValue(experience.job)}</h4>
                        <p>{displayValue(experience.company)}</p>

                        <span>
                        {displayPeriod(
                            experience.startDate,
                            experience.endDate,
                        )}
                        </span>

                        <p className="review-description">
                        {displayValue(experience.responsibilities)}
                        </p>
                    </article>
                    ))
                )}
                </div>
            </section>

            <div className="final-review-actions">
                {isFinalized && (
                    <p className="finalized-message">✓ Votre CV est prêt.</p>
                )}

                <button className="primary-button" type="button" onClick={onFinalize} disabled={isFinalized}>
                    {isFinalized ? "CV finalisé" : "Finaliser mon CV"}
                </button>
            </div>

        </div>
    );
}