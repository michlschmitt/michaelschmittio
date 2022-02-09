// import node_modules
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Link from 'next/link';

// import types
import { FixMeLater, NotionBlockType, NotionBlockTextType } from '../../types';

// import components
import Image from './Image';

// import styles
import styles from './NotionRenderer.module.css';

// define components
const CodeRenderer: React.FunctionComponent<{
  value: { caption: FixMeLater; language: string; text: NotionBlockTextType[] };
}> = ({ value }) => {
  // render html
  if (value?.caption[0]?.plain_text?.toUpperCase() === 'RENDER-HTML') {
    return <div dangerouslySetInnerHTML={{ __html: value.text[0].plain_text }} />;
  }

  // render html
  if (
    value?.caption[0]?.plain_text?.toUpperCase() === 'LOCAL-IMAGE' &&
    value?.language === 'json'
  ) {
    // get image data
    const image = JSON.parse(value.text[0].plain_text);

    // render image
    return (
      <figure>
        {image?.src && (
          <Image
            alt={image.alt}
            height={image.height}
            isRound
            layout="responsive"
            src={image.src}
            width={image.width}
          />
        )}
        {image?.alt && <figcaption>{image.alt}</figcaption>}
      </figure>
    );
  }

  // render code
  return (
    <pre>
      <code>{value.text[0].plain_text}</code>
    </pre>
  );
};

const LinkRenderer: React.FunctionComponent<{ children: React.ReactNode; url: string }> = ({
  children,
  url,
}) => {
  // interal linking
  if (url.startsWith('https://www.michaelschmitt.io')) {
    return (
      <Link href={url.replace('https://www.michaelschmitt.io', '')} passHref>
        <a>{children}</a>
      </Link>
    );
  }

  // external link
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const TextRenderer: React.FunctionComponent<{
  renderMarkup?: boolean;
  text?: NotionBlockTextType[] | null;
}> = ({ renderMarkup, text }) => {
  // no text
  if (!text) {
    return null;
  }

  // render text
  return (
    <>
      {text.map((value, index) => {
        // get annotations
        const {
          annotations: { bold, code, italic, strikethrough, underline },
          text: textContent,
        } = value;

        // split text to add line break
        const textArray = textContent?.content?.split('\n');

        // add markup
        const renderedMarkup = textArray?.map((textString, index, textStrings) => {
          // add markup
          let renderedText = <>{textString}</>;

          if (renderMarkup && bold) {
            renderedText = <strong>{renderedText}</strong>;
          }

          if (renderMarkup && code) {
            renderedText = <code>{renderedText}</code>;
          }

          if (renderMarkup && italic) {
            renderedText = <em>{renderedText}</em>;
          }

          if (renderMarkup && strikethrough) {
            renderedText = <s>{renderedText}</s>;
          }

          if (renderMarkup && underline) {
            renderedText = <u>{renderedText}</u>;
          }

          return (
            <React.Fragment key={index}>
              {renderedText}
              {index < textStrings.length - 1 && <br />}
            </React.Fragment>
          );
        });

        // render text
        return (
          <React.Fragment key={index}>
            {textContent?.link?.url ? (
              <LinkRenderer url={textContent.link.url}>{renderedMarkup}</LinkRenderer>
            ) : (
              <>{renderedMarkup}</>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

TextRenderer.defaultProps = {
  renderMarkup: true,
};

TextRenderer.propTypes = {
  renderMarkup: PropTypes.bool,
};

const BlockRenderer: React.FunctionComponent<{ block: NotionBlockType }> = ({ block }) => {
  // get type and id and retrieve value
  const { type, id } = block;
  const value = block[type as string];

  // render block based on type
  switch (type) {
    case 'paragraph':
      return (
        <p>
          <TextRenderer text={value.text} />
        </p>
      );

    case 'heading_1':
      return (
        <h1>
          <TextRenderer renderMarkup={false} text={value.text} />
        </h1>
      );

    case 'heading_2':
      return (
        <h2>
          <TextRenderer renderMarkup={false} text={value.text} />
        </h2>
      );

    case 'heading_3':
      return (
        <h3>
          <TextRenderer renderMarkup={false} text={value.text} />
        </h3>
      );

    case 'heading_4':
      return (
        <h4>
          <TextRenderer renderMarkup={false} text={value.text} />
        </h4>
      );

    case 'heading_5':
      return (
        <h5>
          <TextRenderer renderMarkup={false} text={value.text} />
        </h5>
      );

    case 'heading_6':
      return (
        <h6>
          <TextRenderer renderMarkup={false} text={value.text} />
        </h6>
      );

    case 'bulleted_list':
      return (
        <ul>
          {value.items.map((item: NotionBlockType) => (
            <BlockRenderer block={item} key={item.id} />
          ))}
        </ul>
      );

    case 'bulleted_list_item':
      return (
        <li>
          <TextRenderer text={value.text} />
        </li>
      );

    case 'numbered_list':
      return (
        <ol>
          {value.items.map((item: NotionBlockType) => (
            <BlockRenderer block={item} key={item.id} />
          ))}
        </ol>
      );

    case 'numbered_list_item':
      return (
        <li>
          <TextRenderer text={value.text} />
        </li>
      );

    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <TextRenderer text={value.text} />
          </label>
        </div>
      );

    case 'toggle':
      return (
        <details>
          <summary>
            <TextRenderer text={value.text} />
          </summary>
          {value.children?.map((block: NotionBlockType) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </details>
      );

    case 'child_page':
      return <p>{value.title}</p>;

    case 'divider':
      return <hr key={id} />;

    case 'quote':
      return <blockquote key={id}>{value.text[0].plain_text}</blockquote>;

    case 'file':
      const src_file = value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <div className={styles.file}>
            📎{' '}
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );

    case 'code':
      return <CodeRenderer value={value} />;

    default:
      throw new Error(
        `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`,
      );
  }
};

const NotionRenderer: React.FunctionComponent<{ blocks: NotionBlockType[] }> = ({ blocks }) => (
  <div className={styles.notion}>
    {blocks.map((block) => (
      <BlockRenderer key={block?.id} block={block} />
    ))}
  </div>
);

export default NotionRenderer;
