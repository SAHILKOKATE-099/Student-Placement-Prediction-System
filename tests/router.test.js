const test = require('node:test');
const assert = require('node:assert/strict');
const { Router, haversineDistance } = require('../src');

test('calculates a route between two geographic points', () => {
  const route = new Router({ mode: 'shortest' }).findRoute(
    { lat: 40.7128, lng: -74.006 },
    { lat: 34.0522, lng: -118.2437 }
  );
  assert.equal(route.mode, 'shortest');
  assert.ok(route.distanceKm > 3900 && route.distanceKm < 4000);
  assert.ok(route.durationMinutes > 2900);
  assert.equal(route.steps.length, 1);
});

test('rejects malformed points', () => {
  assert.throws(() => new Router().findRoute({ lat: 1 }, { lat: 2, lng: 3 }), /numeric lat and lng/);
});

test('returns zero distance for the same point', () => {
  const point = { lat: 12.97, lng: 77.59 };
  assert.equal(haversineDistance(point, point), 0);
});
