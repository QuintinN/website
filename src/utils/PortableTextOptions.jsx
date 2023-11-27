import imageUrlBuilder from "@sanity/image-url";
import getVideoId from "get-video-id";
import YouTube from "react-youtube";
import sanityClient from "../../sanity";
import { BiLinkExternal } from "react-icons/bi";

/* A builder to be able to use images from sanity.io */
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const opts = {
  height: "450",
  width: "100%",
};

// Barebones lazy-loaded image component
const SampleImageComponent = (props) => {
  return (
    <img
      src={urlFor()
        .image(props.value.asset._ref)
        .fit("max")
        .auto("format")
        .url()}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: props.isInline ? "inline-block" : "block",

        // Avoid jumping around with aspect-ratio CSS property
      }}
    />
  );
};

// Sets the texts coming from sanity.io to apply a certain format and style
// @portabletext/react package
export const components = {
  types: {
    image: SampleImageComponent,
    youtube: (props) => {
      const { url } = props.value;
      const id = getVideoId(url);
      return <YouTube videoId={id.id} opts={opts} />;
    },
    break: (props) => {
      const { style } = props.value;
      if (style === "lineBreak") {
        return <hr className="lineBreak" />;
      }
      if (style === "lineSpacing") {
        return <br className="lineSpacing" />;
      }
      return null;
    },
    button: (props) => {
      return (
        <a
          href={props?.value?.link}
          target="_blank"
          className="inline-block my-2 portable-text-button"
        >
          <button className="flex items-center gap-2 font-semibold py-2 px-4 rounded-lg max-h-[32px] transition-all ease-in duration-300">
            {props?.value?.name}
          </button>
        </a>
      );
    },
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: ({ children }) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),

    // Ex. 2: rendering a custom `link` annotation
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          className="underline"
          rel={target === "_blank" && "noindex nofollow"}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="text-4xl">{children}</h1>,
    blockquote: ({ children }) => (
      <blockquote className="blockquote">{children}</blockquote>
    ),
    h2: ({ children }) => <h2 className="text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl">{children}</h4>,
    p: ({ children }) => console.log(children),
    // Ex. 2: rendering custom styles
    customHeading: ({ children }) => <h2 className="text-lg">{children}</h2>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="mt-xl pl-10 flex flex-col gap-3">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-lg pl-10 list-decimal flex flex-col gap-3">
        {children}
      </ol>
    ),

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <li style={{ listStyleType: "disc" }}>{children}</li>
    ),

    // Ex. 2: rendering custom list items
    checkmarks: ({ children }) => <li>✅ {children}</li>,
  },
};
