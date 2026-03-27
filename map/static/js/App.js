import React from "react"
import { createRoot } from "react-dom/client"
import RestaurantPermitMap from "./RestaurantPermitMap"

const container = document.getElementById("map")

if (container) {
  const root = createRoot(container)
  root.render(<RestaurantPermitMap />)
}