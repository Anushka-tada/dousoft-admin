import ServiceEditor from "../ServiceEditor";

export default async function EditServicePage({ params }) {
const { serviceslug } = await params;

  console.log("slug" , serviceslug)

  return <ServiceEditor mode="edit" slug={serviceslug} />;
}