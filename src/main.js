import Cycle from "@cycle/core";
import {Observable} from "rx";
import {h, makeDOMDriver} from "@cycle/dom";
import {makeHistoryDriver, filterLinks} from "@cycle/history";
import makeTimeTravel from 'cycle-time-travel';

import app from "./components/app.js"

function main(drivers) {
  const {DOM, History} = drivers;

  const url$ = DOM
    .select("a")
    .events("click")
    .filter(filterLinks)
    .do(event => event.preventDefault())
    .map(event => event.target.pathname);

  const view$ = History
    .startWith({
      pathname: "/"
    })
    .map(route => app(route));

  let {DOM: timeTravelBar$, timeTravel} = makeTimeTravel(DOM, [
    {stream: url$, label: "Route"}
  ]);

  return {
    DOM: Observable.combineLatest(
      view$,
      timeTravelBar$,
      (view, timeTravelBar) =>
        h("#application", [
          view,
          timeTravelBar
        ])
    ),
    History: url$
  };
}

const drivers = {
  DOM: makeDOMDriver("#application"),
  History: makeHistoryDriver({
    hash: false,
    queries: true
  })
};

Cycle.run(main, drivers);
