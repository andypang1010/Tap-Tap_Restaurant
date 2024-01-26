import { Helmet } from "react-helmet";

export default function PageTitle({ title, description, themeColor }) {
  return (
    <Helmet>
      <title>{title}</title>
      {description !== undefined && (
        <meta name="description" content={description} />
      )}
      {themeColor !== undefined && (
        <meta name="theme-color" content={themeColor} />
      )}
    </Helmet>
  );
}
