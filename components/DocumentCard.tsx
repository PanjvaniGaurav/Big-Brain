import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";

const DocumentCard = ({ document }: { document: Doc<"documents"> }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {!document.description ? (
              <div
                className="flex justify-center"
              >
                <Loader2 className="animate-spin w-[15%] h-[15%]" />
              </div>
            ) : (
              document.description
            )}
          </p>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            className="flex items-center gap-2"
            variant="secondary"
          >
            <Link href={`/documents/${document._id}`}>
              <Eye className="w-4 h-4" />
              View
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DocumentCard;
