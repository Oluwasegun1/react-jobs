const jobLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`/api/jobs/${id}`);
  const data = await res.json();
  return data;
};

export default jobLoader;
