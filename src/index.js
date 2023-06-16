import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { addOffset, addTileLayer, getAddress, validateIp } from './helpers'
import icon from '../images/icon-location.svg'

const start = () => {
	const apiInput = document.querySelector('.search-bar__input')
	const btn = document.querySelector('button')

	const ipInfo = document.querySelector('#ip')
	const locationInfo = document.querySelector('#location')
	const timezoneInfo = document.querySelector('#timezone')
	const ispInfo = document.querySelector('#isp')

	apiInput.addEventListener('keydown', handleKey)
	btn.addEventListener('click', getData)

	// Map
	const mapArea = document.getElementById('map')
	const markerIcon = L.icon({
		iconUrl: icon,
		iconSize: [30, 40],
	})
	const map = L.map(mapArea, {
		// center: [51.505, -0.09],
		zoom: 13,
		zoomControl: false,
	})

	addTileLayer(map)

	L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map)
	// End Map
	getAddress('102.22.22.1').then(setInfo)

	// Get Data
	function getData() {
		const ip = apiInput.value.trim()
		if (validateIp(ip)) {
			getAddress(ip).then(setInfo)
		}
	}

	function handleKey(event) {
		if (event.key === 'Enter') {
			getData()
		}
	}

	// Print DOM
	function setInfo(mapData) {
		const { lat, lng, country, region, timezone } = mapData.location

		ipInfo.innerText = mapData.ip
		locationInfo.innerText = country + ' ' + region
		timezoneInfo.innerText = timezone
		ispInfo.innerText = mapData.isp

		map.setView([lat, lng])
		L.marker([lat, lng], { icon: markerIcon }).addTo(map)

		if (matchMedia('(max-width: 1023px)').matches) {
			addOffset(map)
		}
	}
}

document.addEventListener('DOMContentLoaded', start)
