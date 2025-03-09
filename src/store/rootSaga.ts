import { all, fork } from 'redux-saga/effects';

import watchGetUser from './saga';

const rootSaga = function* (): Generator {
  yield all([
    fork(watchGetUser)
    // Other forks
  ]);
};

export default rootSaga;
