"use client";

import SubServiceEditor from "../SubServiceEditor";

export default async function CreateSolutionPage({ params }) {
  const { serviceslug } = await params;

  console.log("slug" , serviceslug)
  return <SubServiceEditor serviceSlug={serviceslug}  />
}