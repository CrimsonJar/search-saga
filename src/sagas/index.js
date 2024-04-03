// sagas/index.js
import {
  takeLatest,
  put,
  spawn,
  debounce,
  call,
  delay,
  select,
} from "redux-saga/effects";
import { searchSkills } from "../api/index";
import {
  searchSkillsRequest,
  changeSearchField,
  searchSkillsSuccess,
  searchSkillsFailure,
} from "../slices/skills.js";


const selectSearch = (state) => state.skills.search;

function filterChangeSearchAction({ type, payload }) {
  return type === changeSearchField().type && payload.search.trim() !== "";
}

// worker
function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search));
}

// watcher
function* watchChangeSearchSaga() {
  yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga);
}

// worker
function* handleSearchSkillsSaga(action) {
  try {
    const data = yield call(searchSkills, action.payload);
    yield put(searchSkillsSuccess(data));
  } catch (e) {
    yield put(searchSkillsFailure(e.message));
  }
}

// worker
function* handleSearchSkillsFailureSaga() {
  const retryDelay = 3000;
  //  текущее значение поиска из состояния
  const currentSearch = yield select(selectSearch);
  console.error("Retry fetching skills with search:", currentSearch);
  yield delay(retryDelay);
  // повторение запроса с текущим значением поиска
  yield put(searchSkillsRequest(currentSearch));
}

// watcher
function* watchSearchSkillsSaga() {
  yield takeLatest(searchSkillsRequest().type, handleSearchSkillsSaga);
}

// watcher
function* watchSearchSkillsFailureSaga() {
  yield takeLatest(searchSkillsFailure().type, handleSearchSkillsFailureSaga);
}

export default function* rootSaga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
  yield spawn(watchSearchSkillsFailureSaga);
}
