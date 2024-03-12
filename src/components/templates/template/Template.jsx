import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  addEntry,
  removeEntry,
  updateFieldValue,
} from "../../mydocument/documentSlice";

import "./template.scss";
export default function Template() {
  const cv = useSelector((state) => state.document);
  const dispatch = useDispatch();

  const handleChange = (field) => (event) => {
    dispatch(updateFieldValue({ field, value: event.target.value }));
  };

  const handleEntryAddition = (field) => () => {
    if (Object.values(cv[field]?.[cv[field].length - 1] ?? {}).includes("")) {
      console.error("Cannot add new entry because the last one is incomplete.");
      return;
    }
    dispatch(addEntry(field));
  };

  const handleEntryDeletion = (field, key) => () => {
    dispatch(removeEntry({ field, key }));
  };

  // Auto-resizing
  useEffect(() => {
    document.querySelectorAll("textarea").forEach(autoResize);
    console.log("sdfsa");
  }, [document.querySelectorAll("textarea")]);

  const autoResize = (element) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const Section = ({ title, field, children }) => (
    <div className="template__section">
      <button
        className="template__button-add"
        onClick={handleEntryAddition(field)}
      >
        +
      </button>
      <div className="template__section-title">
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="template">
      <h1 className="template__name">
        <textarea type="text" value={cv.name} onChange={handleChange(`name`)} />
      </h1>

      {/* Contacts */}

      <div className="template__section">
        <div className="template__contacts">
          {cv.contacts.map((item, key) => (
            <textarea
              type="text"
              value={item}
              onChange={handleChange(`contacts.${key}`)}
              key={key}
            />
          ))}

          <a href="https://www.linkedin.com/in/volodymyr-zatonsky-254908a3/">
            LinkedIn
          </a>
        </div>
      </div>

      {/* Skills */}

      <Section title="Technologies and languages" field="technologies">
        <ul className="template__section-items">
          {cv.technologies.map((item, key) => (
            <li key={key} className="template__item">
              <button
                className="template__button-remove"
                onClick={handleEntryDeletion("technologies", key)}
              >
                -
              </button>

              <textarea
                type="text"
                value={item}
                onChange={handleChange(`technologies.${key}`)}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* Experience */}

      <Section title="Work Experience" field="experience">
        <ul className="template__section-items">
          {cv.experience.map((item, key) => (
            <li key={key} className="template__item">
              <button
                className="template__button-remove"
                onClick={handleEntryDeletion("experience", key)}
              >
                -
              </button>

              <h2>
                <textarea
                  className="template__left-textarea"
                  type="text"
                  value={item.title}
                  onChange={handleChange(`experience.${key}.title`)}
                />

                <textarea
                  className="template__center-textarea"
                  type="text"
                  value={item.location}
                  onChange={handleChange(`experience.${key}.location`)}
                />

                <textarea
                  className="template__right-textarea"
                  type="text"
                  value={item.duration}
                  onChange={handleChange(`experience.${key}.duration`)}
                />
              </h2>

              <textarea
                type="text"
                value={item.description}
                onChange={handleChange(`experience.${key}.description`)}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* Personal projects */}

      <Section title="Personal projects" field="projects">
        <ul className="template__section-items">
          {cv.projects.map((item, key) => (
            <li key={key} className="template__item">
              <button
                className="template__button-remove"
                onClick={handleEntryDeletion("projects", key)}
              >
                -
              </button>

              <h2>
                <textarea
                  className="template__left-textarea"
                  type="text"
                  value={item.title}
                  onChange={handleChange(`projects.${key}.title`)}
                />
                <textarea
                  className="template__right-textarea"
                  type="text"
                  value={item.duration}
                  onChange={handleChange(`projects.${key}.duration`)}
                />
              </h2>

              <textarea
                value={item.description}
                onChange={handleChange(`projects.${key}.description`)}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* Education */}

      <Section title="Education" field="education">
        <ul className="template__section-items">
          {cv.education.map((item, key) => (
            <li key={key} field="education" className="template__item">
              <button
                className="template__button-remove"
                onClick={handleEntryDeletion("education", key)}
              >
                -
              </button>

              <h2>
                <textarea
                  className="template__left-textarea"
                  type="text"
                  value={item.institutionName}
                  onChange={handleChange(`education.${key}.institutionName`)}
                />

                <textarea
                  className="template__right-textarea"
                  type="text"
                  value={item.duration}
                  onChange={handleChange(`education.${key}.duration`)}
                />
              </h2>

              <textarea
                type="text"
                value={item.degree}
                onChange={handleChange(`education.${key}.degree`)}
              />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
