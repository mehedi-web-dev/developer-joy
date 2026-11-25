import NotFoundView from "@/app/component/NotFoundView";

// Invalid or unpublished portfolio slugs share the branded 404 experience.
export default function ProjectNotFound() {
  return <NotFoundView />;
}
