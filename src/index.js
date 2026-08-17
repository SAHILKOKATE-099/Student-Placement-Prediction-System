'use strict';

const EARTH_RADIUS_KM = 6371;

function haversineDistance(from, to) {
  const latitude = (to.lat - from.lat) * Math.PI / 180;
  const longitude = (to.lng - from.lng) * Math.PI / 180;
  const fromLatitude = from.lat * Math.PI / 180;
  const toLatitude = to.lat * Math.PI / 180;
  const value = Math.sin(latitude / 2) ** 2
    + Math.sin(longitude / 2) ** 2 * Math.cos(fromLatitude) * Math.cos(toLatitude);
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function validatePoint(point, name) {
  if (!point || !Number.isFinite(point.lat) || !Number.isFinite(point.lng)) {
    throw new TypeError(`${name} must contain numeric lat and lng properties`);
  }
}

class Router {
  constructor(options = {}) {
    this.mode = options.mode || 'fastest';
    this.speedKph = options.speedKph || 80;
    if (!['fastest', 'shortest', 'balanced'].includes(this.mode)) {
      throw new RangeError('mode must be fastest, shortest, or balanced');
    }
  }

  findRoute(from, to) {
    validatePoint(from, 'from');
    validatePoint(to, 'to');
    const distance = haversineDistance(from, to);
    return {
      from: { ...from },
      to: { ...to },
      mode: this.mode,
      distanceKm: Number(distance.toFixed(2)),
      durationMinutes: Number((distance / this.speedKph * 60).toFixed(1)),
      steps: [{ from: { ...from }, to: { ...to } }]
    };
  }
}

module.exports = { Router, haversineDistance };
