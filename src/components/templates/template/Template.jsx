import React, { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEntry,
  removeEntry,
  updateFieldValue,
} from "../../mydocument/documentSlice";
import "./template.scss";

export default function Template() {
  const cv = useSelector((state) => state.document);
  const dispatch = useDispatch();

  const textareasRef = useRef([]);

  // Local state to hold the values of the textareas
  const [localValues, setLocalValues] = useState({});

  useEffect(() => {
    // Initialize localValues from cv on mount
    setLocalValues(cv);
  }, [cv]);

  const handleLocalChange = useCallback((field) => (event) => {
    setLocalValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  }, []);

  const handleBlur = useCallback((field) => (event) => {
    dispatch(updateFieldValue({ field, value: event.target.value }));
  }, [dispatch]);

  const handleEntryAddition = useCallback(
    (field) => () => {
      if (Object.values(cv[field]?.[cv[field].length - 1] ?? {}).includes("")) {
        console.error("Cannot add new entry because the last one is incomplete.");
        return;
      }
      dispatch(addEntry(field));
    },
    [dispatch, cv]
  );

  const handleEntryDeletion = useCallback(
    (field, key) => () => {
      dispatch(removeEntry({ field, key }));
    },
    [dispatch]
  );

  const autoResize = useCallback((element) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, []);

  useEffect(() => {
    textareasRef.current.forEach((textarea) => {
      if (textarea) autoResize(textarea);
    });
  }, [cv, autoResize, localValues]);

  const Section = useCallback(
    ({ title, field, children }) => (
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
    ),
    [handleEntryAddition]
  );

  const Textarea = useMemo(
    () =>
      ({ type, value, onChange, onBlur, className, index }) => (
        <textarea
          ref={(el) => (textareasRef.current[index] = el)}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={className}
        />
      ),
    []
  );

  return (
    <div className="template">
      <h1 className="template__name">
        <Textarea
          type="text"
          value={localValues.name || ""}
          onChange={handleLocalChange("name")}
          onBlur={handleBlur("name")}
          index="name"
        />
      </h1>

      {/* Contacts */}

      <div className="template__section">
        <div className="template__contacts">
          {cv.contacts.map((item, key) => (
            <Textarea
              type="text"
              value={localValues[`contacts.${key}`] || item}
              onChange={handleLocalChange(`contacts.${key}`)}
              onBlur={handleBlur(`contacts.${key}`)}
              key={key}
              index={`contacts.${key}`}
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

              <Textarea
                type="text"
                value={localValues[`technologies.${key}`] || item}
                onChange={handleLocalChange(`technologies.${key}`)}
                onBlur={handleBlur(`technologies.${key}`)}
                index={`technologies.${key}`}
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
                <Textarea
                  className="template__left-textarea"
                  type="text"
                  value={localValues[`experience.${key}.title`] || item.title}
                  onChange={handleLocalChange(`experience.${key}.title`)}
                  onBlur={handleBlur(`experience.${key}.title`)}
                  index={`experience.${key}.title`}
                />

                <Textarea
                  className="template__center-textarea"
                  type="text"
                  value={localValues[`experience.${key}.location`] || item.location}
                  onChange={handleLocalChange(`experience.${key}.location`)}
                  onBlur={handleBlur(`experience.${key}.location`)}
                  index={`experience.${key}.location`}
                />

                <Textarea
                  className="template__right-textarea"
                  type="text"
                  value={localValues[`experience.${key}.duration`] || item.duration}
                  onChange={handleLocalChange(`experience.${key}.duration`)}
                  onBlur={handleBlur(`experience.${key}.duration`)}
                  index={`experience.${key}.duration`}
                />
              </h2>

              <Textarea
                type="text"
                value={localValues[`experience.${key}.description`] || item.description}
                onChange={handleLocalChange(`experience.${key}.description`)}
                onBlur={handleBlur(`experience.${key}.description`)}
                index={`experience.${key}.description`}
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
                <Textarea
                  className="template__left-textarea"
                  type="text"
                  value={localValues[`projects.${key}.title`] || item.title}
                  onChange={handleLocalChange(`projects.${key}.title`)}
                  onBlur={handleBlur(`projects.${key}.title`)}
                  index={`projects.${key}.title`}
                />
                <Textarea
                  className="template__right-textarea"
                  type="text"
                  value={localValues[`projects.${key}.duration`] || item.duration}
                  onChange={handleLocalChange(`projects.${key}.duration`)}
                  onBlur={handleBlur(`projects.${key}.duration`)}
                  index={`projects.${key}.duration`}
                />
              </h2>

              <Textarea
                value={localValues[`projects.${key}.description`] || item.description}
                onChange={handleLocalChange(`projects.${key}.description`)}
                onBlur={handleBlur(`projects.${key}.description`)}
                index={`projects.${key}.description`}
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
                <Textarea
                  className="template__left-textarea"
                  type="text"
                  value={localValues[`education.${key}.institutionName`] || item.institutionName}
                  onChange={handleLocalChange(`education.${key}.institutionName`)}
                  onBlur={handleBlur(`education.${key}.institutionName`)}
                  index={`education.${key}.institutionName`}
                />

                <Textarea
                  className="template__right-textarea"
                  type="text"
                  value={localValues[`education.${key}.duration`] || item.duration}
                  onChange={handleLocalChange(`education.${key}.duration`)}
                  onBlur={handleBlur(`education.${key}.duration`)}
                  index={`education.${key}.duration`}
                />
              </h2>

              <Textarea
                type="text"
                value={localValues[`education.${key}.degree`] || item.degree}
                onChange={handleLocalChange(`education.${key}.degree`)}
                onBlur={handleBlur(`education.${key}.degree`)}
                index={`education.${key}.degree`}
              />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
