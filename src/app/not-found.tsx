import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="eyebrow">Missing page</p>
      <h1 className="display mt-3 text-4xl">That page is outside the frame.</h1>
      <p className="lead mt-4">
        The lesson or track you asked for is not in this guide.
      </p>
      <Link className="btn btn-primary mt-8" href="/">
        Back to Data Lens
      </Link>
    </div>
  );
}
