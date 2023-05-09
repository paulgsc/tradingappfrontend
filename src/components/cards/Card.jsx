import { Skeleton } from "./Skeleton";

export function Card({ ...props }) {
  return <div {...props} />;
}

Card.Header = function CardHeader(props) {
  return <div {...props} />;
};

Card.Content = function CardContent({ ...props }) {
  return <div {...props} />;
};

Card.Footer = function CardFooter({ ...props }) {
  return <div {...props} />;
};

Card.Title = function CardTitle({ ...props }) {
  return <h3 {...props} />;
};

Card.Description = function CardDescription({ ...props }) {
  return <p {...props} />;
};

Card.Skeleton = function CardSeleton() {
  return (
    <Card>
      <Card.Header>
        <Skeleton />
        <Skeleton className="h-4 w-4/5" />
      </Card.Header>
      <Card.Content className="h-10" />
      <Card.Footer>
        <Skeleton className="h-8 w-[120px] bg-slate-200" />
      </Card.Footer>
    </Card>
  );
};
