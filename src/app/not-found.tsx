import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col justify-center items-center gap-4 p-40">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-3xl">Page Not Found</h2>
      <div>
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </div>
      <Link href="/">
        <Button>Return Homepage</Button>
      </Link>
    </div>
  );
}
