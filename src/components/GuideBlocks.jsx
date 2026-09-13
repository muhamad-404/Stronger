import GuideCallout from './GuideCallout.jsx';
import './GuideBlocks.css';

export default function GuideBlocks({ blocks }) {
  if (!blocks?.length) return null;

  return (
    <div className="guide-blocks">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === 'paragraph') {
          return (
            <p key={key} className="guide-blocks__p">
              {block.text}
            </p>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={key} className="guide-blocks__list">
              {(block.items || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === 'checklist') {
          return (
            <ul key={key} className="guide-blocks__checklist">
              {(block.items || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === 'callout') {
          return (
            <GuideCallout
              key={key}
              tone={block.tone}
              title={block.title}
              text={block.text}
            />
          );
        }

        if (block.type === 'examples') {
          return (
            <ul key={key} className="guide-blocks__examples">
              {(block.items || []).map((item) => (
                <li key={item.title || item.detail}>
                  {item.title ? (
                    <strong className="guide-blocks__example-title">
                      {item.title}
                    </strong>
                  ) : null}
                  {item.detail ? (
                    <span className="guide-blocks__example-detail">
                      {item.detail}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}
