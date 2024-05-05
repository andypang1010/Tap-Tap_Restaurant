import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";

export default function Header({ title, pageTitle, subtitle, subtitleLink }) {
  return (
    <header className="page-title">
      <PageTitle title={pageTitle} />
      {subtitle !== undefined && subtitle !== null ? (
        <h2 className="full-title">
          <Link to={subtitleLink} className="sub-heading">
            {subtitle}
          </Link>
          <i className="bx bx-chevrons-right"></i>
          <span>{title}</span>
        </h2>
      ) : (
        <h2>{title}</h2>
      )}
    </header>
  );
}
