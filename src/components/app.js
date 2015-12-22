/** @jsx hJSX */
import {hJSX}     from "@cycle/dom";
import switchPath from "switch-path";

const routes = {
  "/bar": 123,
  "/foo": 456
};

function app(route) {
  const {pathname} = route;
  const {value}    = switchPath(pathname, routes);

  return (
    <div>
      <div>Route Value: {value}</div>
      <div><a href="/bar">Link 1</a></div>
      <div><a href="/foo">Link 2</a></div>
    </div>
  );
}

export default app;
