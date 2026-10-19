import React, { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import goongjs from '@goongmaps/goong-js';
import imgMarker from '../../assets/images/marker.png';

interface LocationFormProps {
    values: {
        latitude?: string;
        longitude?: string;
        placeName?: string;
        [key: string]: any;
    };
    onChange: (values: { latitude?: string; longitude?: string; placeName?: string; [key: string]: any }) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ values, onChange }) => {
    const [expanded, setExpanded] = useState<boolean>(true);
    const [markerPosition, setMarkerPosition] = useState<{ latitude: number; longitude: number } | null>(null);
    const mapRef = useRef<InstanceType<typeof goongjs.Map> | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markerSourceId = 'marker-source';
    const markerLayerId = 'marker-layer';

    useEffect(() => {
        if (!mapContainerRef.current) return;

        goongjs.accessToken = 'L3ORzKN0cHhX4uwZng3a7AkiipVmh8iLm07zrUea';

        const map = new goongjs.Map({
            container: mapContainerRef.current,
            style: 'https://tiles.goong.io/assets/goong_map_web.json',
            center: [105.8342, 21.0278],
            zoom: 10
        });

        mapRef.current = map;

        // Load map trước khi add layer
        map.on('load', () => {
            // Tải và thêm ảnh marker vào map
            const image = new Image(27, 41);
            image.crossOrigin = 'anonymous';
            image.src = imgMarker;

            image.onload = () => {
                if (!map.hasImage('custom-marker')) {
                    map.addImage('custom-marker', image);
                }
                
                // Nếu có markerPosition ban đầu, hiển thị marker
                if (markerPosition) { 
                    const { longitude: lng, latitude: lat } = markerPosition;
                    
                    map.addSource(markerSourceId, {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [lng, lat]
                                    }
                                }
                            ]
                        }
                    });

                    map.addLayer({
                        id: markerLayerId,
                        type: 'symbol',
                        source: markerSourceId,
                        layout: {
                            'icon-image': 'custom-marker',
                            'icon-size': 1,
                            'icon-anchor': 'bottom',
                            'icon-allow-overlap': true,
                            'icon-ignore-placement': true
                        }
                    });
                    
                    map.flyTo({ center: [lng, lat], zoom: 14 });
                }
            };
        });

      map.on('click', (e: any) => {
        const { lng, lat } = e.lngLat;

        // Cập nhật state markerPosition
        setMarkerPosition({ longitude: lng, latitude: lat });

        // Cập nhật values và gọi onChange để fill input
        const newValues = {
            ...values,
            longitude: lng.toFixed(6),
            latitude: lat.toFixed(6)
        };
        onChange(newValues);

        // Xóa source/layer cũ nếu tồn tại
        if (map.getLayer(markerLayerId)) {
            map.removeLayer(markerLayerId);
        }
        if (map.getSource(markerSourceId)) {
            map.removeSource(markerSourceId);
        }

        // Add source GeoJSON
        map.addSource(markerSourceId, {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        }
                    }
                ]
            }
        });

        // Add layer symbol
        map.addLayer({
            id: markerLayerId,
            type: 'symbol',
            source: markerSourceId,
            layout: {
                'icon-image': 'custom-marker',
                'icon-size': 1,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
            }
        });
    });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    // Xử lý thay đổi input
    const handleFieldChange = (field: string, value: string) => {
        const newValues = { ...values, [field]: value };
        onChange(newValues);

        if (field === 'latitude' || field === 'longitude') {
            const lat = parseFloat(newValues.latitude || '0');
            const lng = parseFloat(newValues.longitude || '0');
            if (!isNaN(lat) && !isNaN(lng) && mapRef.current) {
                setMarkerPosition({ longitude: lng, latitude: lat });

                const map = mapRef.current;
                if (map.getLayer(markerLayerId)) {
                    map.removeLayer(markerLayerId);
                }
                if (map.getSource(markerSourceId)) {
                    map.removeSource(markerSourceId);
                }

                map.addSource(markerSourceId, {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [lng, lat]
                                }
                            }
                        ]
                    }
                });

                map.addLayer({
                    id: markerLayerId,
                    type: 'symbol',
                    source: markerSourceId,
                    layout: {
                        'icon-image': 'custom-marker',
                        'icon-size': 1,
                        'icon-anchor': 'bottom',
                        'icon-allow-overlap': true,
                        'icon-ignore-placement': true
                    }
                });
            }
        }
    };

    const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    return (
        <Accordion defaultExpanded expanded={expanded} onChange={handleChange} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                    fontWeight="bold"
                    sx={{
                        color: expanded ? '#00A64F' : '#4C4C4C',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '18px',
                        fontWeight: expanded ? 600 : 500
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="10" fill="#00A64F" />
                        <path
                            d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.0001 11H17.0001C15.0501 16.84 15.0501 23.16 17.0001 29H16.0001"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23 11C24.95 16.84 24.95 23.16 23 29"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11 24V23C16.84 24.95 23.16 24.95 29 23V24"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11 17.0001C16.84 15.0501 23.16 15.0501 29 17.0001"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>{' '}
                    NHẬP NỘI DUNG
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <label>Địa chỉ</label>
                <TextField
                    fullWidth
                    placeholder="Nhập địa chỉ của bạn"
                    size="small"
                    value={values?.placeName || ''}
                    onChange={(e) => handleFieldChange('placeName', e.target.value)}
                />
            </AccordionDetails>
            <AccordionDetails>
                <div style={containerStyle} ref={mapContainerRef}></div>
            </AccordionDetails>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <label>Kinh độ (Longitude)</label>
                        <TextField
                            fullWidth
                            placeholder="Ví dụ: 106.6297"
                            size="small"
                            type="number"
                            inputProps={{ step: 'any' }}
                            value={values?.longitude || ''}
                            onChange={(e) => handleFieldChange('longitude', e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <label>Vĩ độ (Latitude)</label>
                        <TextField
                            fullWidth
                            placeholder="Ví dụ: 10.8231"
                            size="small"
                            type="number"
                            inputProps={{ step: 'any' }}
                            value={values?.latitude || ''}
                            onChange={(e) => handleFieldChange('latitude', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default LocationForm;