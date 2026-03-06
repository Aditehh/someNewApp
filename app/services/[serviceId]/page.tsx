import { getServiceById } from "@/lib/domain";

interface ServicePageProps {
  params: {
    serviceId: string;
  };
}

export default async function ServicePage({ params }: ServicePageProps) {

  const serviceId = Number(params.serviceId);

  const service = await getServiceById(serviceId);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div>
      <h1>{service.title}</h1>

      <p>{service.description}</p>

      <p>Price: Rs {service.price}</p>

      <p>Duration: {service.duration} minutes</p>

      <p>Provider: {service.provider.user.name}</p>

      {/* Booking form */}
    </div>
  );
}