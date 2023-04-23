import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Volume.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { loadingActions, RootState } from '../../../redux/reduxStore';
// firebase
import { getDoc } from 'firebase/firestore';
import { getVolumeRef } from '../../../firebase/firestoreReferences';
// typescript
import { IVolume } from '../../../typescript/interfaces';
// components
import Info from './Info/Info';
import ChapterList from '../../Common/List/List';
import Chapter from './Chapter/Chapter';

const Volume: React.FC = () => {
  const [volume, setVolume] = useState<IVolume>();
  const { mangaParam, volumeParam } = useParams();

  const loading = useSelector((state: RootState) => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (mangaParam && volumeParam) {
      dispatch(loadingActions.setPageLoading(true));
      getDoc(getVolumeRef(mangaParam, volumeParam))
        .then((volumeSnap) => {
          if (volumeSnap.exists()) {
            const volume = volumeSnap.data();
            setVolume(volume as IVolume);
            dispatch(loadingActions.setPageLoading(false));
          } else {
            // error handling
            console.log('no data for this volumeId');
            dispatch(loadingActions.setPageLoading(false));
          }
        })
        .catch((error) => {
          // error handling
          console.log(error);
          dispatch(loadingActions.setPageLoading(false));
        });
    }
  }, [mangaParam, volumeParam]);

  if (loading.isPageLoading) {
    return (
      <section className="loading-error-section">
        <h2 className="general loading">loading...</h2>
      </section>
    );
  }

  if (volume) {
    return (
      <section className="page-section">
        <h1 className={classes['eng-title']}>{volume.engVolumeName}</h1>
        <h2 className={classes['jap-title']}>{volume.japVolumeName}</h2>
        <div className={classes.content}>
          <ChapterList>
            {volume.chapters.map((c) => (
              <Chapter chapter={c} key={c.chapter} />
            ))}
          </ChapterList>
          <Info volume={volume} />
        </div>
      </section>
    );
  }

  return (
    <section className="loading-error-section">
      <h2 className="general error">volume not found</h2>
    </section>
  );
};

export default Volume;
