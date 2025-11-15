require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    company: "Recipe Musikproduktion",
    title: "Recipe Musikproduktion – Professionellt ljud i varje detalj",
    description:
      "Recipe Musikproduktion är en professionell musikstudio på Södermalm. Vi erbjuder musikproduktion, podcastinspelning, mixning, mastering och ljuddesign för artister, företag och kreatörer som vill ha ljud som känns.",
    siteUrl: "https://www.recipemusikproduktion.se/",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      vimeo: "",
      spotify: "",
      bandcamp: "",
      apple: "",
      deezer: "",
      linkedin: "",
      youtube: "",
      tiktok: "",
    },
  },
  
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          indentedSyntax: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-analytics', // default
          anonymize: true, // default
          allowAdFeatures: false // default
        },
        googleTagManager: {
          trackingId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-tagmanager', // default
          dataLayerName: 'dataLayer', // default
        },
        facebookPixel: {
          pixelId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-facebook-pixel', // default
        },
        tikTokPixel: {
          pixelId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-tiktok-pixel', // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production', 'development']
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ['/kontakta oss/tack', 
        `/dev-404-page`,
        `/404`,`/404.html`,
        `/verktyg-digital-marknadsforing`,
        `/landing-spec/**`, 
        `/lp/**`],
        
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/rotor-tools`,
        name: "tools",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img/people`,
        name: "people",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/database`,
        name: "database",
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: "blurred",
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-decap-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: "gatsby-omni-font-loader",
      options: {
        mode: "async",
        enableListener: true,
        preconnect: ["https://use.typekit.net"],
        web: [
          {
            name: ["stratos", "stratos-lights", "span-compressed"],
            file: "https://use.typekit.net/jni5cuh.css",
          }
        ],
      }
    },
    
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        develop: true, // or false if you want only at build
        printRejected: true, // ✅ show what PurgeCSS removes
        purgeOnly: ["/sass/main.scss"], // your actual scss
        debug: true
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
    }, // must be after other CSS plugins
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
