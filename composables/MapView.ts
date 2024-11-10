export interface UITileset {
  id: string;
  type: string;
  unit?: string;
}

export interface VectorTileset extends UITileset {
  type: "vector" | "point" | "line" | "icon";
  sourceLayer: string;
  icon: string | undefined;
  has_extrusion?: boolean;
  style?: string;
}

export interface RasterTileset extends UITileset {
  type: "raster";
}

export interface VectorLayerProps {
  map: mapboxgl.Map;
  tileset: VectorTileset;
  beforeId: string;
  sortKeyExpression?: mapboxgl.ExpressionSpecification;
  shouldUpdate?: boolean;
}

export const usePrepareAndUpdateLayers = async (
  layers: Layer[],
  map: mapboxgl.Map
) => {
  if (!map) return;
  const mapStyle = map.getStyle();
  if (!mapStyle) return;
  const layerIds = mapStyle.layers.map((layer) => layer.id);
  layers.forEach((layer) => {
    layer.tilesets.forEach((tileset) => {
      if (layerIds.includes(layer.id)) {
        addVectorLayer({
          map,
          tileset: tileset as VectorTileset,
          beforeId: layerIds[layerIds.indexOf(layer.id) + 1],
          shouldUpdate: true,
        });
      } else {
        addVectorLayer({
          map,
          tileset: tileset as VectorTileset,
          beforeId: layerIds[layerIds.indexOf(layer.id) + 1],
          shouldUpdate: false,
        });
      }
    });
  });
};

export const addVectorLayer = ({
  map,
  tileset,
  beforeId,
  sortKeyExpression,
  shouldUpdate = false,
}: VectorLayerProps) => {
  const { id, sourceLayer } = tileset;
  const fillLayerData: mapboxgl.FillLayerSpecification = {
    id,
    type: "fill",
    source: id,
    "source-layer": sourceLayer,
    layout: {
      "fill-sort-key": sortKeyExpression || 0,
    },
    paint: {
      "fill-opacity": 1,
    },
  };

  const hasExtrusion = tileset.has_extrusion;
  let extrusionLayer: mapboxgl.FillExtrusionLayerSpecification | undefined;

  if (hasExtrusion) {
    extrusionLayer = {
      id: `${id}-extrusion`,
      type: "fill-extrusion",
      source: id,
      "source-layer": sourceLayer,
      paint: {
        "fill-extrusion-color": "#3b3b3c",
        "fill-extrusion-height": [
          "coalesce",
          ["get", "Height (m)"],
          0,
        ] as mapboxgl.ExpressionSpecification,
        "fill-extrusion-opacity": 0.8,
      },
    };
  }
  type PaintProperty =
    | "fill-extrusion-color"
    | "fill-extrusion-height"
    | "fill-extrusion-opacity";
  type LayoutProperty = "visibility";

  if (shouldUpdate) {
    if (fillLayerData.paint) {
      for (const [key, value] of Object.entries(fillLayerData.paint) as [
        PaintProperty,
        any
      ][]) {
        map.setPaintProperty(fillLayerData.id, key, value);
      }
    }
    if (fillLayerData.layout) {
      for (const [key, value] of Object.entries(fillLayerData.layout) as [
        LayoutProperty,
        any
      ][]) {
        map.setLayoutProperty(fillLayerData.id, key, value);
      }
    }
    if (extrusionLayer?.paint) {
      for (const [key, value] of Object.entries(extrusionLayer.paint) as [
        PaintProperty,
        any
      ][]) {
        map.setPaintProperty(`${id}-extrusion`, key, value);
      }
    }
    if (extrusionLayer?.layout) {
      for (const [key, value] of Object.entries(extrusionLayer.layout) as [
        LayoutProperty,
        any
      ][]) {
        map.setLayoutProperty(`${id}-extrusion`, key, value);
      }
    }
  } else {
    map.addSource(id, { type: "vector", url: `mapbox://${id}` });
    if (extrusionLayer) map.addLayer(extrusionLayer, beforeId);
    map.addLayer(fillLayerData, beforeId);
  }
  // if (colorExpression) {
  //   map.setPaintProperty(id, 'fill-color', colorExpression)
  //   if (hasExtrusion)
  //     map.setPaintProperty(`${id}-extrusion`, 'fill-extrusion-color', colorExpression)
  // }
};
