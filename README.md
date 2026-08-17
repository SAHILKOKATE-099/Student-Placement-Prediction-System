# OmniRoute

OmniRoute is a small, dependency-free routing engine for geographic points. It is designed as a clear starting point for applications that need a routing API they can extend themselves.

> This project is an early-stage library. The current implementation provides straight-line distance and duration estimates; road-network data and turn-by-turn directions are planned extensions.

## Install

```bash
npm install omniroute
```

## Usage

```js
const { Router } = require('omniroute');

const router = new Router({ mode: 'fastest' });
const route = router.findRoute(
  { lat: 40.7128, lng: -74.0060 },
  { lat: 34.0522, lng: -118.2437 }
);

console.log(route.distanceKm);      // straight-line distance in km
console.log(route.durationMinutes); // estimate based on the configured speed
```

## API

`new Router(options)` accepts:

- `mode`: `fastest`, `shortest`, or `balanced` (default: `fastest`)
- `speedKph`: estimated travel speed (default: `80`)

`router.findRoute(from, to)` accepts two objects with numeric `lat` and `lng` properties and returns the route, distance, duration estimate, and route steps.

## Development

```bash
git clone https://github.com/SAHILKOKATE-099/omniroute.git
cd omniroute
npm test
```

The project uses Node's built-in test runner, so there are no runtime or development dependencies to install.

## Project layout

```text
src/       Library source
tests/     Automated tests
docs/      Design notes and future documentation
```

## Contributing

Bug reports and focused pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the local workflow.

## License

[MIT](LICENSE)
