import { sanityClient } from "src/boot/sanity";

export const appQuery = `{
  "about": *[_type == "about"] {
    _id,
    slug,
    title,
    body
  }[0],
  "cv": *[_type == "cv"] {
    ...,
  }[0],
  "page": *[_type == "page" && slug.current == "me"] {
    _id,
    _createdAt,
    _rev,
    _type,
    _updatedAt,
    title,
    slug,
    intro,
    sections[] {
      _key,
      title,
      slug,
      label,
      intro[] {
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            banner[] {
              _key,
              video,
              image {
                asset->
              },
              timecode
            },
            "url": url
          }
        }
      },
      body[] {
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            banner[] {
              _key,
              video,
              image {
                asset->
              },
              timecode
            },
            "url": url
          }
        }
      },
      project-> {
        _id,
        agency,
        company,
        freelance,
        title,
        description,
        position,
        slug,
        ratio,
        roles,
        media[] {
          ...,
          image {
            asset->
          }
        },
        videoHasSound,
        year
      },
      projectsObject {
        title,
        options,
        padding,
        projects[]-> {
          _id,
          title,
          slug,
          roles,
          clients[]->,
          disciplines[]->,
          media[] {
            ...,
            image {
              asset->
            }
          },
          videoHasSound
        }
      }
    },
    coverItems[]{
      _key,
      title,
      slug,
      svg,
      projects[]-> {
        _id,
        ...,
        clients[]->,
        disciplines[]->,
        media[] {
          ...,
          image {
            asset->
          }
        },
        roles,
        studio->,
        videoHasSound
      }
    },
    outro
  }[0]
}`;

export const queryApp = async () => {
  try {
    const result = await sanityClient.fetch(appQuery);
    return result;
  } catch (error) {
    console.log("error fetching queryApp", error);
  }
};
