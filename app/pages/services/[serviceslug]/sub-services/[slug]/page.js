"use client";

import SubServiceEditor from "../SubServiceEditor";

export default async function CreateSolutionPage({ params }) {
  const { serviceslug , slug } = await params;

  console.log("slug" , serviceslug)
  return <SubServiceEditor mode="edit" serviceSlug={serviceslug} subServiceSlug={slug} />
}