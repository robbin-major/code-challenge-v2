import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import RAW_COMMUNITY_AREAS from "../../../data/raw/community-areas.geojson"

function YearSelect({ year, setYear }) {
  return (
    <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
      <option value={2026}>2026</option>
      <option value={2025}>2025</option>
      <option value={2024}>2024</option>
      <option value={2023}>2023</option>
    </select>
  )
}


export default function RestaurantPermitMap() {
  const communityAreaColors = ["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"]

  const [currentYearData, setCurrentYearData] = useState([])

  const [year, setYear] = useState(2026)

  const yearlyDataEndpoint = `/map-data/?year=${year}`



  useEffect(() => {
  fetch(yearlyDataEndpoint)
    .then((res) => res.json())
    .then((data) => {
      
      setCurrentYearData(data)
    })
}, [yearlyDataEndpoint])

  const totalPermits = currentYearData.reduce((sum, area) => {
    return sum + area.num_permits
  }, 0)

  const maxNumPermits =
    currentYearData.length > 0
      ? Math.max(...currentYearData.map((area) => area.num_permits))
      : 0

  function getColor(percentageOfPermits) {
    if (percentageOfPermits === 0) {
      return communityAreaColors[0]
    } else if (percentageOfPermits <= 0.25) {
      return communityAreaColors[0]
    } else if (percentageOfPermits <= 0.5) {
      return communityAreaColors[1]
    } else if (percentageOfPermits <= 0.75) {
      return communityAreaColors[2]
    }
    return communityAreaColors[3]
  }

function setAreaInteraction(feature, layer) {

  const matchingArea = currentYearData.find(
    (area) => area.name === feature.properties.community
  )

  const permitCount = matchingArea ? matchingArea.num_permits : 0

  const percentageOfPermits =
    maxNumPermits > 0 ? permitCount / maxNumPermits : 0

  layer.on("mouseover", () => {
    layer.bindPopup(
      `<strong>${feature.properties.community}</strong><br/>Permits: ${permitCount}`
    )
    layer.openPopup()
  })

  
  layer.setStyle({
    fillColor: getColor(percentageOfPermits),
    fillOpacity: 0.7,
    color: "#333",
    weight: 1,
  })
}
   

 return (
  <>
    <YearSelect year={year} setYear={setYear} />

    <MapContainer
      center={[41.8781, -87.6298]}
      zoom={10}
      style={{ height: "700px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />

      <GeoJSON
        key={year}
        data={RAW_COMMUNITY_AREAS}
        onEachFeature={setAreaInteraction}
/>

    </MapContainer>
  </>
)
}