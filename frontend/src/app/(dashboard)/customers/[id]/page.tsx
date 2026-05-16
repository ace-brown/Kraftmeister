export default function CustomerPage({ params }: { params: { id: string } }) {
  return <div>Customer Page: {params.id}</div>;
}
