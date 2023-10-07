type NotFoundProps = {
  notFound: boolean;
};

export function NotFound(props: NotFoundProps) {
  return props.notFound ? (
    <div className="web-view-body-not-found">
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
  ) : null;
}
