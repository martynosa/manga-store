import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import Chapter from '../Common/Chapter/Chapter';

const Volume: React.FC = () => {
  const { volumeId } = useParams();

  const volume = useSelector((state: RootState) =>
    state.find((v) => v.volume === +volumeId!)
  );

  return (
    <>
      <h1>{volume?.engVolumeName}</h1>
      <div>
        {volume?.chapters.map((c) => (
          <>
            <Chapter />
          </>
        ))}
      </div>
    </>
  );
};

export default Volume;
