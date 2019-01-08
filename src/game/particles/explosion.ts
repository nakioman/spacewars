export default (startColor: string = '#ff3300', endColor: string = '#100f0c'): any => ({
  acceleration: {
    x: 0,
    y: 0,
  },
  addAtBack: false,
  alpha: {
    end: 0,
    start: 0.74,
  },
  blendMode: 'normal',
  color: {
    end: endColor,
    start: startColor,
  },
  ease: [
    {
      cp: 0.329,
      e: 0.548,
      s: 0,
    },
    {
      cp: 0.767,
      e: 0.876,
      s: 0.548,
    },
    {
      cp: 0.985,
      e: 1,
      s: 0.876,
    },
  ],
  emitterLifetime: 0.1,
  frequency: 0.001,
  lifetime: {
    max: 1,
    min: 0.5,
  },
  maxParticles: 100,
  maxSpeed: 0,
  noRotation: false,
  pos: {
    x: 0,
    y: 0,
  },
  rotationSpeed: {
    max: 200,
    min: 0,
  },
  scale: {
    end: 1.2,
    minimumScaleMultiplier: 1,
    start: 5,
  },
  spawnType: 'point',
  speed: {
    end: 0,
    minimumSpeedMultiplier: 0.5,
    start: 700,
  },
  startRotation: {
    max: 360,
    min: 0,
  },
});
