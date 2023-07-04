import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const MetaTag = ({ title, description, image, url }: Props) => {
  return (
    <Helmet>
      {url && <link rel="canonical" href={url} />}
      <meta name="description" content={description} />
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaTag;
