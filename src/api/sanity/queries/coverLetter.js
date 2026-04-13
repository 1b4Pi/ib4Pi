import { sanityClient } from "src/boot/sanity";

export const coverLetterQuery = `*[_type == "coverLetter" && slug.current == $slug]{
  _createdAt,
  _id,
  _rev,
  _type,
  _updatedAt,
  title,
  slug,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "link" => {
        reference -> {
          _id,
          _type,
          ratio,
          title,
          slug,
          clients[]->,
          disciplines[]->,
          media[] {
            ...,
            image {
              asset->
            }
          },
          roles[]->,
          studio->
        },
        "url": url
      }
    }
  }
}[]`;

export const queryCoverLetter = async (variables) => {
  try {
    const result = await sanityClient.fetch(coverLetterQuery, variables);
    return result;
  } catch (error) {
    console.log("error fetching queryApp", error);
  }
};
