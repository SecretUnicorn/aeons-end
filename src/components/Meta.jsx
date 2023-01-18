import { title as appTitle } from "@/config";
import { Helmet } from "react-helmet-async";

const Meta = ({description, title, meta = []}) => {
  const pageTitle = `${appTitle}${title ? ' | ' + title : ''}`;


  return (
    <Helmet
      title={pageTitle}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: pageTitle,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ].concat(meta)}
    />
  );
}
export default Meta;