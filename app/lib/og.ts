/**
 * The default social preview image, in one place.
 *
 * Next.js does NOT deep-merge `metadata.openGraph`. A page that declares its own
 * `openGraph` block replaces the root layout's entirely, so any page setting a
 * custom og:title without repeating `images` silently ships with no og:image and
 * every shared link renders as a blank card. That is exactly what happened to all
 * 14 pages here.
 *
 * So: spread `images: OG_IMAGE` into every page-level openGraph block. Pages with
 * their own artwork (blog posts) pass their own array instead.
 */
export const OG_IMAGE = [
  {
    url: "/brand/simpl-cover-1200x675.png",
    width: 1200,
    height: 675,
    alt: "Simpl, your digital presence handled",
  },
];
