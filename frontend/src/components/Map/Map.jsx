import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "../../lib/supabase";

export default function IssueMap() {
  const [issues, setIssues] = useState([]);
  const center = [23.3441, 85.3096]; // Ranchi

  useEffect(() => {
    // Fetch live issues from Supabase when the map loads
    supabase
      .from("issues")
      .select("*")
      .then(({ data }) => {
        if (data) setIssues(data);
      });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; CARTO"
      />

      {/* Loop through the database and drop a pin for every issue */}
      {issues.map((issue) => (
        <Marker key={issue.id} position={[issue.latitude, issue.longitude]}>
          <Popup>
            <strong>{issue.title}</strong>
            <br />
            Severity: {issue.severity}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
