import { getCollections } from "@/lib/actions/collection.action";
import { CollectionType } from "@/lib/actions/shared.types";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollections();
  console.log(collections)

  return (
    <div className="flex flex-col items-center gap-10 px-5 py-8">
      <p className="h1-bold mt-6">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="font-bold">No collections found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {collections.map((collection: CollectionType) => (
            <Link href={`/collections/${collection._id}`} key={collection._id}>
              <Image
                key={collection._id}
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
                className="cursor-pointer rounded-lg"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
