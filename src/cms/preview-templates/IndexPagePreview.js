import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import IndexPageTemplate from "../../templates/index-page";

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();

  // Transform image assets using `getAsset` function
  const transformImageAssets = (image) => {
    if (image && image.childImageSharp) {
      return getImage(getAsset(image.childImageSharp.gatsbyImageData.src));
    }
    return null;
  };

  // Transform hero section
  const heroImage = transformImageAssets(data.hero?.image);
  const headlineImage = transformImageAssets(data.hero?.headlineimg);

  // Transform challenge section
  const challengeImage = transformImageAssets(data.challenge?.image);

  // Transform solution section
  const solutionImage1 = transformImageAssets(data.solution?.image1);
  const solutionImage2 = transformImageAssets(data.solution?.image2);
  const solutionImage3 = transformImageAssets(data.solution?.image3);

  // Transform who section
  const whoImage1 = transformImageAssets(data.who?.image1);

  // Transform customers section
  const customerImage1 = transformImageAssets(data.customers?.image1);
  const customerImage2 = transformImageAssets(data.customers?.image2);
  const bossImage1 = transformImageAssets(data.customers?.bossimage1);
  const bossImage2 = transformImageAssets(data.customers?.bossimage2);

  return (

      <IndexPageTemplate
        meta={data.meta}
        title={data.title}
        hero={{
          image: heroImage,
          headlineimg: headlineImage,
          ...data.hero,
        }}
        challenge={{
          image: challengeImage,
          ...data.challenge,
        }}
        solution={{
          image1: solutionImage1,
          image2: solutionImage2,
          image3: solutionImage3,
          ...data.solution,
        }}
        who={{
          image1: whoImage1,
          ...data.who,
        }}
        customers={{
          image1: customerImage1,
          image2: customerImage2,
          bossimage1: bossImage1,
          bossimage2: bossImage2,
          ...data.customers,
        }}
      />

  );
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default IndexPagePreview;
