import { VehicleCollection } from '@/components/platform/vehicle-collection'

const BRAND_MAP={
  'bmw':'BMW','mercedes-benz':'Mercedes-Benz','audi':'Audi','porsche':'Porsche','tesla':'Tesla','range-rover':'Range Rover','land-rover':'Land Rover','toyota':'Toyota','lexus':'Lexus','nissan':'Nissan'
}

export default async function BrandPage({params}){
  const {brand}=await params
  const label=BRAND_MAP[decodeURIComponent(brand).toLowerCase()]||decodeURIComponent(brand)
  return <VehicleCollection eyebrow="Brand collection" title={`${label} inventory`} description={`Browse available ${label} vehicles across sale and rental listings with finance, comparison and service tools connected.`} filters={{brand:label}}/>
}
