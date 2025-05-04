import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout";
import RotorCTA from "../components/RotorCTA";
import StarDivider from "../components/Star-divider";

import RotorButton from "../components/RotorButton"
import RotorBox from "../components/RotorBox"
import Lottie from "../components/Lottie";
import animationData from "../animations/rotor_anim_logo.json"
import animation1 from "../animations/rotor_anim_logo.json";
import LottieScroll from "../components/LottieScroll";
import LogoGallery from "../components/LogoGallery";
import HeroBack from "../img/hero-back.svg"

import UpwindBack from "../img/upwind-back.svg"
import Accordion from "../components/accordion";



export const RotorStartTemplate = ({ hero, challenge, solution, who, model, customers }) => {

  const heroImage = getImage(hero.image)
  const challengeImage = getImage(challenge.image)
  const solutionImage1 = getImage(solution.image1)
  const solutionImage2 = getImage(solution.image2)
  const solutionImage3 = getImage(solution.image3)
  const whoImage1 = getImage(who.image1)
  const animation = animation1


  return (
    <div>

      {/*hero section*/}
      <div style={{
        backgroundImage: `url(${HeroBack})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
      }}>
        <div className="hero-body container pb-6">
          <div className="columns is-desktop is-vcentered my-6">
            <div className="column is-half-desktop is-10-mobile is-offset-1-mobile">
              <div className="has-rainbow-parent">
                <h1 className="has-rainbow is-ultralarge is-size-1-mobile has-text-weight-bold mb-4">{hero.headline}</h1>
              </div>
              <h2 className="has-text-white is-uppercase has-text-weight-bold has-tight-spacing is-size-4 is-size-5-mobile">{hero.subtext}</h2>
            </div>
            <div className="column is-half-desktop has-text-centered level-right">
              <GatsbyImage image={heroImage} />

            </div>
          </div>
          <div className="mb-6">
            <RotorCTA buttonText="Klicka här" buttonLink="/products/" />
          </div>



        </div>
      </div>
      {/*challenge section*/}
      <div className="hero-body has-background-white">
        <div className="columns">

          <div className="column has-background-primary is-8-desktop is-offset-2-desktop is-8-tablet is-offset-2-tablet">
            <div className="columns is-flex-direction-column p-3">
              <StarDivider customClass="column is-full mb-3" />
              <div className="column is-8 is-offset-2 is-10-mobile is-offset-1-mobile">
                <h2 className="is-size-2 mb-4">{challenge.headline}</h2>
                <p dangerouslySetInnerHTML={{ __html: challenge.text }}></p>
                <div className="has-text-centered mt-6 is-rotated-right">
                  <GatsbyImage image={challengeImage} alt="flingpaket med tjänster från digitalbyrå"/>
                </div>

              </div>

              <StarDivider customClass="column is-full mt-3" />
            </div>
          </div>

        </div>
      </div>

      {/*solution section1*/}
      <div className="hero-body" style={{
        backgroundImage: `url(${UpwindBack})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
      }}>
        <div className="columns is-vcentered">

          <div className="column is-one-third-desktop is-offset-1 is-half-tablet has-background-info has-text-white my-6 is-relative ">
            <div className="p-6 has-star-right is-10-mobile is-offset-1-mobile">
              <h2 className="is-size-2 mb-4">{solution.headline1}</h2>
              <p dangerouslySetInnerHTML={{ __html: solution.text1 }}></p>
            </div>


          </div>
          <div className="column is-two-thirds has-text-centered is-full-tablet">
            <div className="is-rotated-left mb-3">
              <GatsbyImage image={solutionImage1} alt="kräm för digital marknadsföring"/>
            </div>
            <div className="pb-6">
              <GatsbyImage image={solutionImage2} alt="quickfix för snabb digital marknadsföring"/>
            </div>
          </div>


        </div>
      </div>

      {/*solution section2*/}
      <div className="hero-body has-background-white" >
        <div className="columns is-vcentered is-flex-direction-row-reverse">



          <div className="column is-half-desktop is-half-tablet has-background-info has-text-white my-6 is-relative ">
            <div className="p-6 has-whirl-right is-10-mobile is-offset-1-mobile">
              <h2 className="is-size-2 mb-4">{solution.headline1}</h2>
              <p dangerouslySetInnerHTML={{ __html: solution.text2 }}></p>
            </div>


          </div>
          <div className="column is-half has-text-centered is-full-tablet">
            <div className="is-rotated-left mb-3">
              <GatsbyImage image={solutionImage3}  alt="fjärrkontroll med digitalbyrå tjänster"/>
            </div>

          </div>


        </div>
      </div>

      {/*who section

<RotorBox headline={who.headline1} subtext={who.subtext1} text={who.text1} ref={observe}/> style={{height:`${height}px`}} */}


      <div className="has-background-info py-6">
        <StarDivider customClass="column is-full mb-6" />

        <div className="columns is-vcentered" >
         <div className="column is-half">
          <RotorBox headline={who.headline1} subtext={who.subtext1} text={who.text1}/>
          </div>
          <div className="has-text-centered is-full-tablet">
              <GatsbyImage image={whoImage1} alt="digitalbyrå tvål som passar ditt företag"/>
            </div>
        </div>

      </div>

       <div className="container">
      <h2 className="is-size-2 mt-6 mb-4 has-text-centered mx-3">{who.headline2}</h2>
    
      <div className="is-flex is-flex-wrap-wrap is-justify-content-center mb-6">
        {who.text2.map(item => (
          <div className="has-star-swipe is-size-7-mobile">
            <h3>
              {item}
            </h3>
          </div>

        ))}
      </div>
    </div> 

      {/*<Lottie autoPlay="true" hover="true"/> 
    <LottieScroll boxHeight={200} animation={animation1} mode={"s"} type = {"toggle"} frames ={[0, 95]} visibility={[0.4, 0.9]} />
*/}

<div className="py-6 has-background-info">
<LogoGallery />
</div>
      

      {/*<LottieScroll boxHeight={200} animation={animation1} mode={"scroll"} type = {"seek"} frames ={[0, 95]} visibility={[0.4, 0.9]} />*/}


    </div>
  )
}



const RotorStart = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <RotorStartTemplate
        hero={frontmatter.hero}
        challenge={frontmatter.challenge}
        solution={frontmatter.solution}
        model={frontmatter.model}
        customers={frontmatter.customers}
        who={frontmatter.who}

      />
    </Layout>
  )
}
export default RotorStart


export const RotorStartQuery = graphql`
query RotorStartTemplate {
  markdownRemark(frontmatter: {templateKey: {eq: "start"}}) {
    frontmatter {
      path
      hero {
        headline
        subtext
        image {
          childImageSharp {
            gatsbyImageData(quality: 50, width: 450)
          }
        }
        cta {
          text
          buttonText
          headline
        }
      }
      challenge {
        headline
        text
        image {
          childImageSharp {
            gatsbyImageData(quality: 50, width: 250)
          }
        }
      }
      solution {
        headline1
        text1
        image1 {
          childImageSharp {
            gatsbyImageData(quality: 50, width: 200)
          }
        }
        image2 {
          childImageSharp {
            gatsbyImageData(quality: 50, width: 200)
          }
        }
        text2
        image3 {
          childImageSharp {
            gatsbyImageData(quality: 50, width: 200)
          }
        }
 

      }
      who {
        headline1
        subtext1
        text1
        headline2
        text2
        image1 {
          childImageSharp {
            gatsbyImageData(quality: 50, width: 450)
          }
        }
      }
      model {
        headline
        subtext
        image {
          childImageSharp {
            id
            gatsbyImageData(quality: 100, width: 800)
          }
        }
        ctatext
      }
      customers {
        headline
      }
    }
  }
}
`;