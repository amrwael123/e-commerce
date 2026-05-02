import { getAllBrand } from "@/services/Brands";

export default async function BrandsPage() {
  const brands = await getAllBrand();

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Brands</h1>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {brands?.map((brand: any) => (
          <div className="border rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-lg transition">
            
            <img
              src={brand.image}
              alt={brand.name}
              className="w-24 h-24 object-contain"
            />

            <h2 className="mt-3 font-semibold text-center">
              {brand.name}
            </h2>

          </div>
        ))}
      </div>
    </div>
  );
}