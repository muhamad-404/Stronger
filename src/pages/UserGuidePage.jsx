import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import GuideCallout from '../components/GuideCallout.jsx';
import { USER_GUIDE_SECTIONS } from '../data/userGuide.js';
import './UserGuidePage.css';

function UserGuideBlocks({ blocks }) {
  return (
    <div className="user-guide__blocks">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === 'p') {
          return (
            <p key={key} className="user-guide__p">
              {block.text}
            </p>
          );
        }

        if (block.type === 'ul' || block.type === 'ol') {
          const ListTag = block.type === 'ol' ? 'ol' : 'ul';
          return (
            <ListTag key={key} className="user-guide__list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ListTag>
          );
        }

        if (block.type === 'callout') {
          return (
            <GuideCallout
              key={key}
              tone={block.tone || 'info'}
              title={block.title}
              text={block.text}
            />
          );
        }

        if (block.type === 'link') {
          return (
            <Link key={key} to={block.to} className="user-guide__jump">
              {block.label} →
            </Link>
          );
        }

        if (block.type === 'steps') {
          return (
            <ol key={key} className="user-guide__steps">
              {block.items.map((item) => (
                <li key={item.title} className="user-guide__step">
                  <h3 className="user-guide__step-title">{item.title}</h3>
                  <p className="user-guide__step-body">{item.body}</p>
                </li>
              ))}
            </ol>
          );
        }

        return null;
      })}
    </div>
  );
}

export default function UserGuidePage() {
  return (
    <div className="page user-guide-page">
      <Link to="/more" className="user-guide-page__back">
        <ArrowLeft size={18} aria-hidden />
        More
      </Link>

      <PageHeader
        title="How to use Stronger"
        subtitle="A plain-language walkthrough of every part of the app — so you know what to do and why."
      />

      <GuideCallout
        tone="info"
        title="User guide vs Guide"
        text="This page teaches you how to use Stronger’s screens. The Guide (also under More) is a library of food, training, sleep, and safety articles. Use both when you need them."
      />

      <nav className="user-guide__toc" aria-label="User guide topics">
        <h2 className="user-guide__toc-title">Jump to a topic</h2>
        <ol className="user-guide__toc-list">
          {USER_GUIDE_SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="user-guide__sections">
        {USER_GUIDE_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="user-guide__section"
            aria-labelledby={`${section.id}-heading`}
          >
            <h2 id={`${section.id}-heading`} className="user-guide__heading">
              {section.title}
            </h2>
            <p className="user-guide__summary">{section.summary}</p>
            <UserGuideBlocks blocks={section.blocks} />
          </section>
        ))}
      </div>

      <p className="user-guide__footer">
        Still unsure? Open{' '}
        <Link to="/guide">Guide</Link> for habit articles, or{' '}
        <Link to="/solver">Problem solver</Link> for help with today.
      </p>
    </div>
  );
}
