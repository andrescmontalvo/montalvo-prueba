
export const HOME_BANNER_QUERY = `#graphql
  query HomeBanner {
    metaobjects(
      type: "responsive_image"
      first: 5
    ) {
      nodes {
        id

        desktopImage: field(key: "desktop_image") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }

        mobileImage: field(key: "mobile_image") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
` as const;