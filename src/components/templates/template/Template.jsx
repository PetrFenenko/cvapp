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
    autoResize(event.target);
  };

  const handleEntryAddition = (field) => () => {
    dispatch(addEntry(field));
  };

  const handleEntryDeletion = () => (event) => {
    dispatch(
      removeEntry({
        field: event.target.parentElement.field,
        key: event.target.parentElement,
      })
    );
  };

  useEffect(() => {
    Array.from(document.getElementsByTagName("textarea")).map((element) =>
      autoResize(element)
    );
  }, []);

  const autoResize = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
    console.log(element);
  };

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

      <div className="template__section">
        <button
          className="template__button-add"
          onClick={handleEntryAddition("technologies")}
        >
          +
        </button>
        <div className="template__section-title">
          <h2>Technologies and languages</h2>
        </div>
        <ul className="template__section-items">
          {cv.technologies.map((item, key) => (
            <li key={key} className="template__item">
              <textarea
                type="text"
                value={item}
                onChange={handleChange(`technologies.${key}`)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Experience */}

      <div className="template__section">
        <button
          className="template__button-add"
          onClick={handleEntryAddition("experience")}
        >
          +
        </button>
        <div className="template__section-title">
          <h2>WORK EXPERIENCE</h2>
          <span>4 years, 6 months</span>
        </div>
        <ul className="template__section-items">
          {cv.experience.map((item, key) => (
            <li key={key} className="template__item">
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
      </div>

      {/* Personal projects */}
      <div className="template__section">
        <button
          className="template__button-add"
          onClick={handleEntryAddition("projects")}
        >
          +
        </button>
        <div className="template__section-title">
          <h2>Personal projects</h2>
        </div>
        <ul className="template__section-items">
          {cv.projects.map((item, key) => (
            <li key={key} className="template__item">
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
      </div>

      {/* Education */}

      <div className="template__section">
        <button
          className="template__button-add"
          onClick={handleEntryAddition("education")}
        >
          +
        </button>
        <div className="template__section-title">
          <h2>Education</h2>
        </div>
        <ul className="template__section-items">
          {cv.education.map((item, key) => (
            <li key={key} field="education" className="template__item">
              <button
                className="template__button-remove"
                onClick={handleEntryDeletion()}
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
      </div>
    </div>
  );
}
