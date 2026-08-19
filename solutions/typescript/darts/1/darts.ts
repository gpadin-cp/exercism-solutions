function distanceToScore(distance: number): number {
  if (distance < 0) throw new Error('Please use positive distances')
  if (distance <= 1) return 10;
  if (distance <= 5) return 5;
  if (distance <= 10) return 1;
  return 0;
}


/* In Cartesian Coordinates, the distance from the origin is the hypotenous of the right triangle formed by
the lines (0,0 => X,0) and (X,0 => X,Y)

Broke out distanceToScore to make it easier to refactor without having to change how we caclulate the distance.
Distance calculation could also be modularized further if needed to support different boards and cacluation of distance from origin
*/
export function score(x: number, y: number): number {
  const legs = x ** 2 + y ** 2 // don't need to take abs of coordinate because
  const distance = Math.sqrt(legs)
  return distanceToScore(distance)
}
