import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { project, validTypes } from '@geops/tree-lib';
import Slider from './components/Slider';
import Dropdown from './components/Dropdown';
import Autocomplete from './components/Autocomplete_comp';

function getProjection(location) {
  try {
    return project(location);
  } catch (e) {
    return e.message;
  }
}

const forestRegWithEmptyInit = ['', ...validTypes.forestEcoregion];
const heightWithEmptyInit = ['', ...validTypes.heightLevel];
const forestTypeWithEmptyInit = ['', ...validTypes.forestType];

function App() {
  const [location, setLocation] = useState({});
  const [slopeActive, setSlopeActive] = useState(false);
  const { t } = useTranslation();

  const switchSlopeActive = checkbox => {
    setLocation({ ...location, slope: 'unknown' });
    setSlopeActive(checkbox.target.checked);
  };

  const SliderDisplay = !slopeActive ? (
    <Slider
      label="Hangneigung"
      min={10}
      max={100}
      onChange={slope => setLocation({ ...location, slope })}
    />
  ) : (
    ''
  );

  return (
    <div className="container mx-auto">
      <Dropdown
        label={t('forestEcoregion.label')}
        values={forestRegWithEmptyInit.sort()}
        onChange={forestEcoregion =>
          setLocation({ ...location, forestEcoregion })
        }
      />
      <Dropdown
        label={t('heightLevel.label')}
        values={heightWithEmptyInit}
        onChange={heightLevel => setLocation({ ...location, heightLevel })}
      />
      {/* <Dropdown
        label={t('forestType.label')}
        values={forestTypeWithEmptyInit.sort()}
        onChange={forestType => setLocation({ ...location, forestType })}
      /> */}
      <Autocomplete
        label={t('forestType.label')}
        items={validTypes.forestType}
        onChange={forestType => setLocation({ ...location, forestType })}
      />
      <br />
      Hangneigung unbekannt:
      <input
        type="checkbox"
        id="myCheck"
        onClick={checkbox => switchSlopeActive(checkbox)}
      />
      {SliderDisplay}
      <p>Result: {getProjection(location)}</p>
    </div>
  );
}

export default App;
