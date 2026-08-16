function formatMonth(value) {
  if (!value) {
    return ''
  }

  const [year, month] = value.split('-').map(Number)

  if (!year || !month) {
    return value
  }

  return new Intl.DateTimeFormat('fr-FR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1))
}

function formatPeriod(startDate, endDate) {
  const start = formatMonth(startDate) || 'Date inconnue'
  const end = formatMonth(endDate) || 'En cours'

  return `${start} — ${end}`
}

export function CVPreview({
  personalInfo,
  educations,
  experiences,
}) {
  const fullName =
    `${personalInfo.firstName} ${personalInfo.lastName}`.trim()

  return (
    <aside className="cv-preview-panel">
      <p className="cv-preview-label">Aperçu A4</p>

      <article className="cv-page">
        <header className="cv-header">
          <div>
            <p className="cv-document-label">
              Curriculum vitæ
            </p>

            <h2 className="cv-name">
              {fullName || 'Votre nom'}
            </h2>

            <p className="cv-job-title">
              {personalInfo.jobTitle || 'Poste recherché'}
            </p>
          </div>

          <address className="cv-contact">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`}>
                {personalInfo.email}
              </a>
            )}

            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone}`}>
                {personalInfo.phone}
              </a>
            )}

            {personalInfo.location && (
              <span>{personalInfo.location}</span>
            )}
          </address>
        </header>

        {personalInfo.summary && (
          <section className="cv-section">
            <h3 className="cv-section-title">Profil</h3>
            <p className="cv-profile-text">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {educations.length > 0 && (
          <section className="cv-section">
            <h3 className="cv-section-title">Formation</h3>

            <div className="cv-entry-list">
              {educations.map((education) => (
                <article
                  className="cv-entry"
                  key={education.id}
                >
                  <div className="cv-entry-heading">
                    <div>
                      <h4>
                        {education.degree ||
                          'Diplôme non renseigné'}
                      </h4>

                      <p>
                        {education.school ||
                          'Établissement non renseigné'}
                      </p>
                    </div>

                    <span>
                      {formatPeriod(
                        education.startDate,
                        education.endDate,
                      )}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="cv-section">
            <h3 className="cv-section-title">Expérience</h3>

            <div className="cv-entry-list">
              {experiences.map((experience) => (
                <article
                  className="cv-entry"
                  key={experience.id}
                >
                  <div className="cv-entry-heading">
                    <div>
                      <h4>
                        {experience.job ||
                          'Poste non renseigné'}
                      </h4>

                      <p>
                        {experience.company ||
                          'Entreprise non renseignée'}
                      </p>
                    </div>

                    <span>
                      {formatPeriod(
                        experience.startDate,
                        experience.endDate,
                      )}
                    </span>
                  </div>

                  {experience.responsibilities && (
                    <p className="cv-responsibilities">
                      {experience.responsibilities}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </aside>
  )
}