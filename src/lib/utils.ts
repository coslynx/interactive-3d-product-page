import * as THREE from 'three';

/**
 * Calculates the size of a 3D object's bounding box.
 *
 * @param object - The 3D object.
 * @returns A Vector3 representing the width, height, and depth of the bounding box.
 */
export const calculateBoundingBoxSize = (object: THREE.Object3D): THREE.Vector3 => {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);
  return size;
};

/**
 * Centers a 3D object at the origin (0, 0, 0) of the scene.
 *
 * @param object - The 3D object to center.
 */
export const centerObject = (object: THREE.Object3D): void => {
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  box.getCenter(center);
  object.position.sub(center);
};

/**
 * Performs linear interpolation between two numbers.
 *
 * @param start - The starting value.
 * @param end - The ending value.
 * @param alpha - The interpolation factor (0 to 1).
 * @returns The interpolated value.
 */
export const lerp = (start: number, end: number, alpha: number): number => {
  return (1 - alpha) * start + alpha * end;
};

/**
 * Clamps a number within a specified range.
 *
 * @param value - The value to clamp.
 * @param min - The minimum allowed value.
 * @param max - The maximum allowed value.
 * @returns The clamped value.
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Re-maps a number from one range to another.
 *
 * @param value - The value to remap.
 * @param inputMin - The minimum value of the input range.
 * @param inputMax - The maximum value of the input range.
 * @param outputMin - The minimum value of the output range.
 * @param outputMax - The maximum value of the output range.
 * @returns The remapped value.
 */
export const map = (
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
): number => {
  return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
};

/**
 * Converts degrees to radians.
 *
 * @param degrees - The degree value.
 * @returns the radian value
 */
export const degreesToRadians = (degrees: number): number => {
  return degrees * Math.PI / 180;
};