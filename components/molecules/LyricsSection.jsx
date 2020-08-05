import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { StyledButtonText } from '../styles/Styles';
import LyricsLine from '../atoms/LyricsLine';

const LyricsSection = ({
  dataFavoriteItem,
  learnedSection,
  section,
  learnLine,
  learnSection,
  learnReset,
  sectionIdx,
  updateLearnedLyrics,
}) => {
  const [hideSection, setHideSection] = useState(false);
  const lyricsSectionRef = useRef();
  let learnSectionClass;
  let learnSectionButtonDisplay;

  const learnSectionButtonClass = learnSection ? '' : 'hide-section';

  if (hideSection) {
    learnSectionClass = 'active';
    learnSectionButtonDisplay = <FontAwesomeIcon icon={faMinusCircle} />;
  } else {
    learnSectionClass = '';
    learnSectionButtonDisplay = <FontAwesomeIcon icon={faPlusCircle} />;
  }

  if (!learnSection && lyricsSectionRef.current) {
    lyricsSectionRef.current.style.maxHeight = `${lyricsSectionRef.current.scrollHeight}px`;
  } else if (lyricsSectionRef.current) {
    lyricsSectionRef.current.style.maxHeight = hideSection
      ? `${lyricsSectionRef.current.scrollHeight}px`
      : '0px';
  }

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    setHideSection(false);
  }, [learnReset]);

  return (
    <div className={`lyrics-section ${learnSectionClass}`}>
      <StyledButtonText
        type='button'
        className={`section-button ${learnSectionButtonClass}`}
        onClick={() => setHideSection((prev) => !prev)}
      >
        {learnSectionButtonDisplay}
      </StyledButtonText>
      <div className='lyrics-section-content' ref={lyricsSectionRef}>
        {section.split(/\n/).map((line, idx) => (
          <LyricsLine
            key={`line-${idx}`}
            dataFavoriteItem={dataFavoriteItem}
            learnedLine={learnedSection.includes(idx)}
            line={line}
            learnLine={learnLine}
            learnReset={learnReset}
            sectionIdx={sectionIdx}
            lineIdx={idx}
            updateLearnedLyrics={updateLearnedLyrics}
          />
        ))}
      </div>
    </div>
  );
};

export default LyricsSection;
