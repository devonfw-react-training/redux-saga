import { call, cancelled, delay, fork, put, race, select, takeEvery } from "redux-saga/effects";
import { actions } from "react-redux-toastr";
import { setName } from "./userInfo.slice";
import { RootState } from "./store";
import { create } from "./books/books.slice";

function* getNameFlow() {
  let name = localStorage.getItem("name");
  if (!name) {
    name = window.prompt("What is your name?");
    localStorage.setItem("name", name || "");
  }
  yield put(setName(name!));
}

function* greet(name: string) {
  yield put(actions.add({
    type: "info",
    title: `Welcome, ${name}`,
    message: "Here is books app, the best app in the world.",
  }));
}

function* lightCalculation() {
  yield delay(300);
  return "Done light";
}

function* heavyCalculation() {
  try {
    yield delay(500);
    console.log("Heavy");
    return "Done heavy";
  } finally {
    const isCancelled: boolean = yield cancelled();
    if (isCancelled) {
      console.log("Cancelled");
    }
  }
}

function* welcomeSaga() {
  yield call(getNameFlow);

  const name: string = yield select((s: RootState) => s.userInfo.name);
  yield fork(greet, name);
}

function* bookCreatedFlow(action: ReturnType<typeof create>) {
  yield put(actions.add({
    type: "success",
    title: `${action.payload.title} is created`,
  }));
}

export function* raceExample() {
  // Race with object
  // const result: { light: string, heavy: string } = yield race({
  //   light: call(lightCalculation),
  //   heavy: call(heavyCalculation),
  // });

  // Race with array
  const result: [string | undefined, string | undefined] = yield race([
    call(lightCalculation),
    call(heavyCalculation),
  ]);
  console.log("Result", result);
}

export function* rootSaga() {
  yield call(welcomeSaga);
  yield fork(raceExample);

  yield takeEvery(create, bookCreatedFlow);

  /***
   * Homework
   *
   * On each action with location change to our book details
   * Action type: '@@router/ON_LOCATION_CHANGED'
   * When action.payload.location.pathname.includes('/book-app/book/')
   *
   * Fork new saga and show custom toastr notification with information from current book
   * For example, show book name and authors in the notification.
   *
   * hint: for type definition you can use LocationChangeAction type
   * hint: You need to get book id from location
   */
}