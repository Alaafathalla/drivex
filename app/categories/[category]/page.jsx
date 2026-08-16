import { VehicleCollection } from '@/components/platform/vehicle-collection'

const MAP={
  suv:{label:'SUVs',bodyType:'SUV'}, sedan:{label:'Sedans',bodyType:'Sedan'}, electric:{label:'Electric vehicles',fuelType:'Electric'}, sports:{label:'Sports cars',bodyType:'Coupe'}, luxury:{label:'Luxury cars',minPrice:50000}, '7-seater':{label:'7-seat vehicles',seats:7},
}

export default async function CategoryPage({params}){
  const {category}=await params
  const item=MAP[category]||{label:category.replaceAll('-',' ')}
  const {label,...filters}=item
  return <VehicleCollection eyebrow="Body style & category" title={label} description={`Explore ${label.toLowerCase()} across verified sale and rental listings, then compare specs, pricing and ownership options.`} filters={filters}/>
}
