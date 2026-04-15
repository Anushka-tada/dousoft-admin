// "use client";
// import SolutionEditor from "../../SolutionEditor";

// export default function EditSolutionPage({ params }) {
//   return <SolutionEditor mode="edit" solutionId={params.id} />;
// }


import SolutionEditor from "../SolutionEditor";

export default async function EditSolutionPage({ params }) {
  const { slug } = await params;

  console.log("slug" , slug)

  return <SolutionEditor mode="edit" slug={slug} />;
}