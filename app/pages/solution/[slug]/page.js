// "use client";
// import SolutionEditor from "../../SolutionEditor";

// export default function EditSolutionPage({ params }) {
//   return <SolutionEditor mode="edit" solutionId={params.id} />;
// }

"use client";
import SolutionEditor from "../../SolutionEditor";

export default function EditSolutionPage({ params }) {
  return <SolutionEditor mode="edit" solutionId={params.slug} />;
}