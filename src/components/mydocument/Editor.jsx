import Template from "../templates/template/Template";
import "./mydocument.scss";

export default function Editor({ documentRef }) {
  return (
    <section className="document">
      <div className="document__container">
        <div className="document__page" ref={documentRef}>
          <Template />
        </div>
      </div>
    </section>
  );
}
