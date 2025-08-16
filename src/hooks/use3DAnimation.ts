import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

interface AnimationConfig {
  clip: THREE.AnimationClip;
  loop?: THREE.AnimationLoopStyles;
  crossFadeDuration?: number;
  weight?: number;
}

interface AnimationOptions {
  loop?: THREE.AnimationLoopStyles;
  clampWhenFinished?: boolean;
}

interface TimelineVars {
  duration?: number;
  ease?: string;
  [key: string]: any;
}

interface Use3DAnimationProps {
  model: THREE.Object3D | null;
  animations?: AnimationConfig[];
}

/**
 * Custom hook for managing and synchronizing Three.js animations, providing a centralized interface for animation control and state management.
 * @param {Use3DAnimationProps} props - Configuration options for the hook, including models and animation details.
 * @returns {{ startAnimation: (name: string) => void; pauseAnimation: (name: string) => void; stopAnimation: (name: string) => void; seekAnimation: (name: string, time: number) => void; setAnimationWeight: (name: string, weight: number) => void; crossfadeAnimation: (from: string, to: string, duration: number) => void;  updateAnimationOptions: (name: string, options: AnimationOptions) => void;}} An object containing animation controls.
 */
export const use3DAnimation = ({ model, animations }: Use3DAnimationProps) => {
  const { scene } = useThree();
  const { isDarkMode } = useTheme();
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const animationActions = useRef<{[key: string]: THREE.AnimationAction}>({});
  const gsapTimelines = useRef<{[key: string]: gsap.core.Timeline}>({});

  /**
   * Initializes the animation mixer and sets up animation actions.
   */
  const initializeAnimations = useCallback(() => {
    if (!model) return;

    mixer.current = new THREE.AnimationMixer(model);
    animations?.forEach(animConfig => {
      const { clip, loop = THREE.LoopRepeat, crossFadeDuration = 0.5, weight = 1 } = animConfig;
      const action = mixer.current!.clipAction(clip);
      action.loop = loop;
      action.weight = weight;
      action.play(); 
      animationActions.current[clip.name] = action;
    });

    return () => {
      mixer.current?.stopAllAction();
    };
  }, [model, animations]);

  useEffect(() => {
    const cleanup = initializeAnimations();
    return cleanup;
  }, [initializeAnimations]);

  /**
   * Starts a specific animation.
   * @param {string} name - The name of the animation to start.
   */
  const startAnimation = useCallback((name: string) => {
    if (!animationActions.current[name]) {
      console.warn(`Animation "${name}" not found.`);
      return;
    }
    animationActions.current[name].play();
  }, []);

  /**
   * Pauses a specific animation.
   * @param {string} name - The name of the animation to pause.
   */
  const pauseAnimation = useCallback((name: string) => {
    if (!animationActions.current[name]) {
      console.warn(`Animation "${name}" not found.`);
      return;
    }
    animationActions.current[name].pause();
  }, []);

  /**
   * Stops a specific animation.
   * @param {string} name - The name of the animation to stop.
   */
  const stopAnimation = useCallback((name: string) => {
    if (!animationActions.current[name]) {
      console.warn(`Animation "${name}" not found.`);
      return;
    }
    animationActions.current[name].stop();
  }, []);

  /**
   * Seeks to a specific time in an animation.
   * @param {string} name - The name of the animation.
   * @param {number} time - The time to seek to (in seconds).
   */
  const seekAnimation = useCallback((name: string, time: number) => {
    if (!animationActions.current[name]) {
      console.warn(`Animation "${name}" not found.`);
      return;
    }
    animationActions.current[name].time = time;
  }, []);

  /**
   * Sets the weight (intensity) of an animation.
   * @param {string} name - The name of the animation.
   * @param {number} weight - The weight to set (0 to 1).
   */
  const setAnimationWeight = useCallback((name: string, weight: number) => {
    if (!animationActions.current[name]) {
      console.warn(`Animation "${name}" not found.`);
      return;
    }
    animationActions.current[name].weight = weight;
  }, []);

  /**
   * Crossfades from one animation to another.
   * @param {string} from - The name of the animation to fade from.
   * @param {string} to - The name of the animation to fade to.
   * @param {number} duration - The duration of the crossfade (in seconds).
   */
  const crossfadeAnimation = useCallback((from: string, to: string, duration: number) => {
    const fromAction = animationActions.current[from];
    const toAction = animationActions.current[to];

    if (!fromAction || !toAction) {
      console.warn(`Crossfade failed: Animation(s) not found.`);
      return;
    }

    toAction.reset().play();
    fromAction.crossFadeTo(toAction, duration, true);
  }, []);

  /**
   * Updates animation options like loop mode and clampWhenFinished.
   * @param {string} name - The name of the animation.
   * @param {AnimationOptions} options - Options to apply to the animation
   */
  const updateAnimationOptions = useCallback((name: string, options: AnimationOptions) => {
    if (!animationActions.current[name]) {
      console.warn(`Animation "${name}" not found.`);
      return;
    }

    const action = animationActions.current[name];
    if (options.loop !== undefined) {
      action.loop = options.loop;
    }
    if (options.clampWhenFinished !== undefined) {
      action.clampWhenFinished = options.clampWhenFinished;
    }
  }, []);

  /**
   * Creates and manages a GSAP timeline for more complex animations.
   * @param {string} timelineName - The unique name for the timeline.
   * @param {(timeline: gsap.core.Timeline) => void} timelineCallback - A callback function that defines the timeline.
   */
  const createTimeline = useCallback((timelineName: string, timelineCallback: (timeline: gsap.core.Timeline) => void) => {
    if (gsapTimelines.current[timelineName]) {
      console.warn(`Timeline "${timelineName}" already exists. Overwriting.`);
    }

    const timeline = gsap.timeline();
    timelineCallback(timeline);
    gsapTimelines.current[timelineName] = timeline;

    return () => {
      timeline.kill();
      delete gsapTimelines.current[timelineName];
    };
  }, []);

  useFrame((clockState, delta) => {
    mixer.current?.update(delta);
  });

  return {
    startAnimation,
    pauseAnimation,
    stopAnimation,
    seekAnimation,
    setAnimationWeight,
    crossfadeAnimation,
    updateAnimationOptions,
    createTimeline
  };
};